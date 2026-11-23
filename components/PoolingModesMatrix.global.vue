<template>
  <figure class="modes-matrix" aria-labelledby="pooling-modes-title">
    <figcaption class="modes-heading">
      <span class="modes-kicker">Pooling mode trade-offs</span>
      <strong id="pooling-modes-title">When PgBouncer holds vs. releases a PostgreSQL connection</strong>
      <span>
        Select a mode to inspect server connection lifetime and which PostgreSQL features stay safe to use.
      </span>
    </figcaption>

    <div class="mode-tabs" role="group" aria-label="PgBouncer pooling mode">
      <button
        v-for="mode in modes"
        :key="mode.id"
        type="button"
        :aria-pressed="selectedModeId === mode.id"
        :class="{ 'is-active': selectedModeId === mode.id }"
        @click="selectedModeId = mode.id"
      >
        {{ mode.label }}
      </button>
    </div>

    <div class="mode-overview" aria-live="polite" aria-atomic="true">
      <div class="mode-overview__top">
        <strong>{{ selectedMode.title }}</strong>
        <span class="mode-pill">Multiplexing: {{ selectedMode.multiplexing }}</span>
      </div>
      <p>{{ selectedMode.summary }}</p>

      <div class="timeline" aria-label="Server connection occupancy across a client lifecycle">
        <div
          v-for="phase in selectedMode.phases"
          :key="phase.label"
          class="timeline-step"
          :class="phase.held ? 'is-held' : 'is-free'"
        >
          <span class="timeline-step__label">{{ phase.label }}</span>
          <small>{{ phase.held ? "PG held" : "PG returned" }}</small>
        </div>
      </div>
    </div>

    <div class="compat-grid">
      <div
        v-for="feature in selectedMode.features"
        :key="feature.name"
        class="compat-card"
      >
        <div class="compat-card__head">
          <span>{{ feature.name }}</span>
          <strong :class="`status-${feature.status}`">{{ statusLabel(feature.status) }}</strong>
        </div>
        <p>{{ feature.note }}</p>
      </div>
    </div>

    <div class="mode-recommendation">
      <span aria-hidden="true">↳</span>
      <span><strong>Best fit:</strong> {{ selectedMode.bestFit }}</span>
    </div>

    <details class="mode-table">
      <summary>Compare all three modes side by side</summary>
      <div class="mode-table__scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Session</th>
              <th scope="col">Transaction</th>
              <th scope="col">Statement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Connection returned</th>
              <td>On client disconnect</td>
              <td>After COMMIT / ROLLBACK</td>
              <td>After each statement</td>
            </tr>
            <tr>
              <th scope="row">Multi-statement transactions</th>
              <td>Yes</td>
              <td>Yes</td>
              <td>No</td>
            </tr>
            <tr>
              <th scope="row">Protocol prepared statements</th>
              <td>Yes</td>
              <td>PgBouncer 1.21+</td>
              <td>No</td>
            </tr>
            <tr>
              <th scope="row">SET / TEMP tables / LISTEN</th>
              <td>Yes</td>
              <td>SET LOCAL / ON COMMIT DROP only</td>
              <td>No</td>
            </tr>
            <tr>
              <th scope="row">Fan-in efficiency</th>
              <td>Low</td>
              <td>High</td>
              <td>Highest</td>
            </tr>
          </tbody>
        </table>
      </div>
    </details>
  </figure>
</template>

<script setup lang="ts">
type ModeId = "session" | "transaction" | "statement";
type CompatStatus = "yes" | "caveat" | "no";

interface ModeSpec {
  id: ModeId;
  label: string;
  title: string;
  multiplexing: string;
  summary: string;
  bestFit: string;
  phases: Array<{ label: string; held: boolean }>;
  features: Array<{ name: string; status: CompatStatus; note: string }>;
}

const modes: ModeSpec[] = [
  {
    id: "session",
    label: "Session",
    title: "Session pooling (pool_mode = session)",
    multiplexing: "Low",
    summary:
      "A PostgreSQL backend stays pinned to the client from connect until disconnect. Idle clients still occupy server connections, so fan-in only helps when clients connect briefly and drop.",
    bestFit:
      "Schema migrations, admin consoles, or dedicated workers that rely on LISTEN/NOTIFY, session-level advisory locks, or long-lived temporary tables.",
    phases: [
      { label: "Tx 1 (Stmt A–B)", held: true },
      { label: "Client idle", held: true },
      { label: "Tx 2 (Stmt C)", held: true },
      { label: "Disconnect", held: false },
    ],
    features: [
      {
        name: "Multi-statement transactions",
        status: "yes",
        note: "Full BEGIN / COMMIT / ROLLBACK semantics work identically to direct PostgreSQL.",
      },
      {
        name: "Prepared statements",
        status: "yes",
        note: "Both SQL PREPARE and protocol-level prepared statements remain bound to the same backend.",
      },
      {
        name: "SET & TEMP tables",
        status: "yes",
        note: "Session parameters and temporary tables persist for the entire client session.",
      },
      {
        name: "LISTEN / NOTIFY & advisory locks",
        status: "yes",
        note: "Notifications and session-scoped locks stay attached to the pinned backend.",
      },
    ],
  },
  {
    id: "transaction",
    label: "Transaction",
    title: "Transaction pooling (pool_mode = transaction)",
    multiplexing: "High",
    summary:
      "A server connection is assigned only while a transaction is active. As soon as COMMIT or ROLLBACK finishes, the backend returns to the pool for another waiting client.",
    bestFit:
      "Default choice for high-concurrency OLTP web APIs, microservices, and serverless workloads where most sockets are idle between short transactions.",
    phases: [
      { label: "Tx 1 (Stmt A–B)", held: true },
      { label: "Client idle", held: false },
      { label: "Tx 2 (Stmt C)", held: true },
      { label: "Client idle", held: false },
    ],
    features: [
      {
        name: "Multi-statement transactions",
        status: "yes",
        note: "All statements inside a single BEGIN ... COMMIT block execute on the same PostgreSQL backend.",
      },
      {
        name: "Prepared statements",
        status: "caveat",
        note: "Supported for protocol-level statements in PgBouncer 1.21+ when max_prepared_statements > 0. SQL PREPARE still breaks.",
      },
      {
        name: "SET & TEMP tables",
        status: "caveat",
        note: "Use SET LOCAL and CREATE TEMP TABLE ... ON COMMIT DROP so state never leaks across clients.",
      },
      {
        name: "LISTEN / NOTIFY & advisory locks",
        status: "no",
        note: "LISTEN breaks across pooled backends; use pg_advisory_xact_lock() instead of session-level advisory locks.",
      },
    ],
  },
  {
    id: "statement",
    label: "Statement",
    title: "Statement pooling (pool_mode = statement)",
    multiplexing: "Highest",
    summary:
      "The PostgreSQL backend is returned to the pool after every individual SQL statement finishes. Multi-statement transactions are rejected.",
    bestFit:
      "Narrow, autocommit-only workloads such as read-heavy lookup services or stateless analytics gateways.",
    phases: [
      { label: "Stmt A", held: true },
      { label: "Between stmts", held: false },
      { label: "Stmt B", held: true },
      { label: "Client idle", held: false },
    ],
    features: [
      {
        name: "Multi-statement transactions",
        status: "no",
        note: "Explicit BEGIN / COMMIT blocks are disallowed because consecutive statements may land on different backends.",
      },
      {
        name: "Prepared statements",
        status: "no",
        note: "Server-side prepared plans cannot safely survive across statement boundaries.",
      },
      {
        name: "SET & TEMP tables",
        status: "no",
        note: "Any session or transaction state is lost immediately after a single statement completes.",
      },
      {
        name: "LISTEN / NOTIFY & advisory locks",
        status: "no",
        note: "Incompatible with statement-level connection rotation.",
      },
    ],
  },
];

const selectedModeId = ref<ModeId>("transaction");
const selectedMode = computed(
  () => modes.find((m) => m.id === selectedModeId.value) ?? modes[1],
);

function statusLabel(status: CompatStatus) {
  if (status === "yes") return "Safe";
  if (status === "caveat") return "Caveat";
  return "Avoid";
}
</script>

<style scoped>
.modes-matrix {
  display: grid;
  gap: 1rem;
  margin: 1.75rem 0;
  padding: 1.2rem;
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--background) 86%, var(--surface));
}

.modes-heading {
  display: grid;
  gap: 0.28rem;
}

.modes-kicker {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.modes-heading strong {
  color: var(--foreground);
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.modes-heading > span:last-child {
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.55;
}

.mode-tabs {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.35rem;
  padding: 0.25rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.7rem;
  background: var(--surface);
}

.mode-tabs button {
  min-height: 40px;
  padding: 0.4rem 0.5rem;
  border: 0;
  border-radius: 0.5rem;
  color: var(--muted);
  background: transparent;
  font-family: var(--mono);
  font-size: 0.76rem;
  font-weight: 500;
  transition:
    color 150ms ease,
    background-color 150ms ease;
}

.mode-tabs button.is-active {
  color: var(--foreground);
  background: var(--card);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.mode-tabs button:focus-visible,
.mode-table summary:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.mode-overview {
  display: grid;
  gap: 0.75rem;
  padding: 0.95rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-subtle);
  background: var(--card);
}

.mode-overview__top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.mode-overview__top strong {
  color: var(--foreground);
  font-size: 0.94rem;
  font-weight: 600;
}

.mode-pill {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-family: var(--mono);
  font-size: 0.7rem;
  font-weight: 500;
}

.mode-overview p {
  margin: 0;
  color: var(--muted);
  font-size: 0.82rem;
  line-height: 1.55;
}

.timeline {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.45rem;
}

.timeline-step {
  display: grid;
  gap: 0.15rem;
  padding: 0.55rem 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border-subtle);
  font-family: var(--mono);
}

.timeline-step__label {
  color: var(--foreground);
  font-size: 0.7rem;
  font-weight: 500;
}

.timeline-step small {
  font-size: 0.64rem;
}

.timeline-step.is-held {
  border-color: rgba(255, 77, 0, 0.4);
  background: var(--accent-soft);
}

.timeline-step.is-held small {
  color: var(--accent);
}

.timeline-step.is-free {
  border-color: rgba(34, 197, 94, 0.35);
  background: rgba(34, 197, 94, 0.08);
}

.timeline-step.is-free small {
  color: #15803d;
}

:global(.dark) .timeline-step.is-free small {
  color: #4ade80;
}

.compat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.compat-card {
  display: grid;
  gap: 0.35rem;
  padding: 0.8rem 0.9rem;
  border-radius: 0.7rem;
  border: 1px solid var(--border-subtle);
  background: var(--card);
}

.compat-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.compat-card__head span {
  color: var(--foreground);
  font-size: 0.82rem;
  font-weight: 600;
}

.compat-card__head strong {
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 0.66rem;
  font-weight: 600;
}

.status-yes {
  color: #15803d;
  background: rgba(34, 197, 94, 0.14);
}

.status-caveat {
  color: #c2410c;
  background: rgba(255, 77, 0, 0.12);
}

.status-no {
  color: #b91c1c;
  background: rgba(239, 68, 68, 0.14);
}

:global(.dark) .status-yes {
  color: #4ade80;
}

:global(.dark) .status-caveat {
  color: #fb923c;
}

:global(.dark) .status-no {
  color: #f87171;
}

.compat-card p {
  margin: 0;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.5;
}

.mode-recommendation {
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.55;
}

.mode-recommendation > span:first-child {
  color: var(--accent);
  font-family: var(--mono);
}

.mode-recommendation strong {
  color: var(--foreground);
}

.mode-table {
  color: var(--faint);
  font-size: 0.78rem;
}

.mode-table summary {
  width: fit-content;
  min-height: 36px;
  padding-block: 0.45rem;
  cursor: pointer;
  font-family: var(--mono);
}

.mode-table__scroll {
  margin-top: 0.6rem;
  overflow-x: auto;
}

.mode-table table {
  width: 100%;
  margin: 0;
  border-collapse: collapse;
  font-size: 0.76rem;
}

.mode-table th,
.mode-table td {
  padding: 0.45rem 0.55rem;
  border-bottom: 1px solid var(--border-subtle);
  text-align: left;
  min-width: 90px;
}

.mode-table th {
  color: var(--foreground);
  font-weight: 600;
}

@media (hover: hover) and (pointer: fine) {
  .mode-tabs button:not(.is-active):hover {
    color: var(--foreground);
    background: var(--surface-hover);
  }
}

@media (max-width: 680px) {
  .modes-matrix {
    padding: 0.95rem;
  }
  .timeline {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .compat-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .mode-tabs button {
    transition-duration: 0ms;
  }
}
</style>
