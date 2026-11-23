<template>
  <figure class="pool-sim" aria-labelledby="pool-sim-title">
    <figcaption class="sim-heading">
      <span class="sim-kicker">Interactive model · Connection multiplexing</span>
      <strong id="pool-sim-title">How PgBouncer absorbs bursts with a bounded pool</strong>
      <span>
        Switch load states or step transactions forward to watch client sockets reuse a fixed set of PostgreSQL backend processes.
      </span>
    </figcaption>

    <div class="scenario-controls" role="group" aria-label="Traffic scenario">
      <button
        v-for="scenario in scenarios"
        :key="scenario.id"
        type="button"
        :aria-pressed="activeScenarioId === scenario.id"
        :class="{ 'is-active': activeScenarioId === scenario.id }"
        @click="loadScenario(scenario.id)"
      >
        {{ scenario.label }}
      </button>
    </div>

    <div class="sim-summary" aria-live="polite" aria-atomic="true">
      <div class="sim-summary__head">
        <span class="sim-summary__eyebrow">{{ activeScenario.eyebrow }}</span>
        <span class="sim-summary__badge" :class="`is-${healthState}`">{{ healthLabel }}</span>
      </div>
      <strong>{{ statusHeadline }}</strong>
      <p>{{ statusDetail }}</p>
    </div>

    <div v-if="!isDirect" class="sim-actions" role="group" aria-label="Simulation controls">
      <button
        type="button"
        class="sim-btn sim-btn--primary"
        :disabled="activeServerCount === 0"
        @click="stepTransaction"
      >
        Complete 1 transaction →
      </button>
      <button
        type="button"
        class="sim-btn"
        :disabled="idleClients.length === 0"
        @click="enqueueQuery"
      >
        + Send query
      </button>
      <button
        type="button"
        class="sim-btn sim-btn--ghost"
        @click="loadScenario(activeScenarioId)"
      >
        Reset
      </button>
      <span class="sim-counter">Tx completed: {{ completedTx }}</span>
    </div>

    <div class="sim-stage" :class="{ 'is-direct': isDirect }">
      <section class="sim-col" aria-label="Application client connections">
        <header class="sim-col__head">
          <span>Application clients</span>
          <small>{{ clients.length }} TCP sockets</small>
        </header>
        <div class="client-grid">
          <div
            v-for="client in clients"
            :key="client.id"
            class="client-chip"
            :class="`is-${client.state}`"
          >
            <span class="client-chip__id">{{ client.label }}</span>
            <span class="client-chip__meta">
              <template v-if="client.state === 'active'">→ {{ client.serverId }}</template>
              <template v-else-if="client.state === 'waiting'">Q#{{ queuePosition(client.id) }}</template>
              <template v-else>idle</template>
            </span>
          </div>
        </div>
        <div class="sim-legend" aria-hidden="true">
          <span><i class="dot is-active" /> Active</span>
          <span v-if="!isDirect"><i class="dot is-waiting" /> Waiting</span>
          <span><i class="dot is-idle" /> Idle</span>
        </div>
      </section>

      <section class="sim-col sim-col--middle" aria-label="PgBouncer pool and queue">
        <header class="sim-col__head">
          <span>{{ isDirect ? "No pooler" : "PgBouncer" }}</span>
          <small>{{ isDirect ? "1:1 direct" : "libevent · epoll" }}</small>
        </header>

        <template v-if="isDirect">
          <div class="direct-box">
            <strong>Direct TCP to PostgreSQL</strong>
            <p>
              Every application socket forks and holds its own backend process in PostgreSQL, even while the client sits idle between requests.
            </p>
            <div class="direct-metric">
              <span>Estimated backend RAM</span>
              <strong>~{{ clients.length * 8 }} MB</strong>
            </div>
          </div>
        </template>

        <template v-else>
          <div class="pool-key">
            <span>Pool key</span>
            <code>(billing, api_rw)</code>
          </div>

          <div class="queue-box">
            <div class="queue-box__head">
              <span>waiting_client_list</span>
              <small>{{ waitingQueue.length }} queued</small>
            </div>
            <div v-if="waitingQueue.length" class="queue-list">
              <span
                v-for="(clientId, index) in waitingQueue"
                :key="clientId"
                class="queue-pill"
                :class="{ 'is-next': index === 0 }"
              >
                {{ clientLabel(clientId) }}
                <small v-if="index === 0">next</small>
              </span>
            </div>
            <p v-else class="queue-empty">Queue empty — new transactions acquire a server immediately.</p>
          </div>
        </template>
      </section>

      <section class="sim-col" aria-label="PostgreSQL backend processes">
        <header class="sim-col__head">
          <span>PostgreSQL</span>
          <small>{{ servers.length }} backend {{ servers.length === 1 ? "process" : "processes" }}</small>
        </header>

        <div class="server-list" :class="{ 'is-dense': isDirect }">
          <div
            v-for="server in servers"
            :key="server.id"
            class="server-slot"
            :class="server.clientId ? 'is-busy' : 'is-idle'"
          >
            <span class="server-slot__name">{{ server.id }}</span>
            <span class="server-slot__owner">
              {{ server.clientId ? `serving ${clientLabel(server.clientId)}` : "idle in pool" }}
            </span>
          </div>
        </div>
      </section>
    </div>

    <div class="show-pools" role="region" aria-label="Simulated SHOW POOLS output">
      <div class="show-pools__bar">
        <code>{{ isDirect ? "pg_stat_activity (direct)" : "SHOW POOLS;" }}</code>
        <span>{{ isDirect ? "default_pool_size: n/a" : `default_pool_size = ${POOL_SIZE}` }}</span>
      </div>
      <div class="show-pools__metrics">
        <div>
          <span>cl_active</span>
          <strong>{{ activeClientCount }}</strong>
        </div>
        <div>
          <span>cl_waiting</span>
          <strong :class="{ 'is-warn': waitingQueue.length > 0 }">{{ waitingQueue.length }}</strong>
        </div>
        <div>
          <span>sv_active</span>
          <strong>{{ activeServerCount }}</strong>
        </div>
        <div>
          <span>sv_idle</span>
          <strong>{{ idleServerCount }}</strong>
        </div>
        <div>
          <span>maxwait</span>
          <strong :class="{ 'is-warn': maxWaitMs > 0 }">{{ maxWaitMs }} ms</strong>
        </div>
      </div>
    </div>

    <div class="sim-note">
      <span aria-hidden="true">↳</span>
      Scaled down to 12 client sockets and 4 PostgreSQL backends so every state transition stays visible. Production OLTP clusters apply the same fan-in ratio across thousands of app sockets and dozens of server slots.
    </div>
  </figure>
</template>

<script setup lang="ts">
type ScenarioId = "normal" | "burst" | "saturated" | "direct";
type ClientState = "active" | "waiting" | "idle";

interface SimClient {
  id: number;
  label: string;
  state: ClientState;
  serverId: string | null;
}

interface SimServer {
  id: string;
  clientId: number | null;
}

const CLIENT_COUNT = 12;
const POOL_SIZE = 4;

const scenarios = [
  {
    id: "normal" as const,
    label: "Normal load",
    eyebrow: "Transaction pooling · Headroom available",
    initialBusy: 3,
  },
  {
    id: "burst" as const,
    label: "Traffic burst",
    eyebrow: "Transaction pooling · Bounded queueing",
    initialBusy: 8,
  },
  {
    id: "saturated" as const,
    label: "Pool saturated",
    eyebrow: "Transaction pooling · Queue pressure",
    initialBusy: 12,
  },
  {
    id: "direct" as const,
    label: "Direct Postgres",
    eyebrow: "No pooler · Process per connection",
    initialBusy: 5,
  },
];

const activeScenarioId = ref<ScenarioId>("burst");
const clients = ref<SimClient[]>([]);
const servers = ref<SimServer[]>([]);
const waitingQueue = ref<number[]>([]);
const completedTx = ref(0);
const nextReleaseIndex = ref(0);

const activeScenario = computed(
  () => scenarios.find((s) => s.id === activeScenarioId.value) ?? scenarios[1],
);
const isDirect = computed(() => activeScenarioId.value === "direct");

function clientLabel(id: number) {
  return `C${String(id).padStart(2, "0")}`;
}

function loadScenario(id: ScenarioId) {
  activeScenarioId.value = id;
  completedTx.value = 0;
  nextReleaseIndex.value = 0;

  const scenario = scenarios.find((s) => s.id === id) ?? scenarios[1];
  const serverTotal = id === "direct" ? CLIENT_COUNT : POOL_SIZE;

  const nextServers: SimServer[] = Array.from({ length: serverTotal }, (_, i) => ({
    id: `PG-${i + 1}`,
    clientId: null,
  }));

  const nextClients: SimClient[] = Array.from({ length: CLIENT_COUNT }, (_, i) => ({
    id: i + 1,
    label: clientLabel(i + 1),
    state: "idle",
    serverId: null,
  }));

  const nextQueue: number[] = [];

  if (id === "direct") {
    nextClients.forEach((client, index) => {
      const server = nextServers[index];
      client.serverId = server.id;
      if (index < scenario.initialBusy) {
        client.state = "active";
        server.clientId = client.id;
      } else {
        client.state = "idle";
      }
    });
  } else {
    for (let i = 0; i < scenario.initialBusy; i++) {
      const client = nextClients[i];
      if (i < serverTotal) {
        client.state = "active";
        client.serverId = nextServers[i].id;
        nextServers[i].clientId = client.id;
      } else {
        client.state = "waiting";
        nextQueue.push(client.id);
      }
    }
  }

  servers.value = nextServers;
  clients.value = nextClients;
  waitingQueue.value = nextQueue;
}

function stepTransaction() {
  if (isDirect.value) return;

  const busyIndices = servers.value
    .map((server, idx) => (server.clientId !== null ? idx : -1))
    .filter((idx) => idx !== -1);

  if (busyIndices.length === 0) return;

  const chosenIdx =
    busyIndices.find((idx) => idx >= nextReleaseIndex.value) ?? busyIndices[0];
  nextReleaseIndex.value = (chosenIdx + 1) % servers.value.length;

  const server = servers.value[chosenIdx];
  const finishingClient = clients.value.find((c) => c.id === server.clientId);
  if (finishingClient) {
    finishingClient.state = "idle";
    finishingClient.serverId = null;
  }

  completedTx.value += 1;

  const nextWaitingId = waitingQueue.value.shift();
  if (nextWaitingId !== undefined) {
    const promoted = clients.value.find((c) => c.id === nextWaitingId);
    if (promoted) {
      promoted.state = "active";
      promoted.serverId = server.id;
      server.clientId = promoted.id;
    }
  } else {
    server.clientId = null;
  }
}

function enqueueQuery() {
  if (isDirect.value) return;

  const idleClient = clients.value.find((c) => c.state === "idle");
  if (!idleClient) return;

  const freeServer = servers.value.find((s) => s.clientId === null);
  if (freeServer) {
    idleClient.state = "active";
    idleClient.serverId = freeServer.id;
    freeServer.clientId = idleClient.id;
  } else {
    idleClient.state = "waiting";
    waitingQueue.value.push(idleClient.id);
  }
}

function queuePosition(clientId: number) {
  return waitingQueue.value.indexOf(clientId) + 1;
}

const activeClientCount = computed(
  () => clients.value.filter((c) => c.state === "active").length,
);
const idleClients = computed(() =>
  clients.value.filter((c) => c.state === "idle"),
);
const activeServerCount = computed(
  () => servers.value.filter((s) => s.clientId !== null).length,
);
const idleServerCount = computed(
  () => servers.value.filter((s) => s.clientId === null).length,
);

const maxWaitMs = computed(() => {
  if (isDirect.value || waitingQueue.value.length === 0) return 0;
  // Illustrative 25 ms average transaction duration across POOL_SIZE servers
  return Math.ceil(waitingQueue.value.length / POOL_SIZE) * 25;
});

const healthState = computed(() => {
  if (isDirect.value) return "warn";
  if (waitingQueue.value.length >= POOL_SIZE * 2) return "danger";
  if (waitingQueue.value.length > 0) return "warn";
  return "ok";
});

const healthLabel = computed(() => {
  if (isDirect.value) return "High memory overhead";
  if (waitingQueue.value.length >= POOL_SIZE * 2) return "Queue growing";
  if (waitingQueue.value.length > 0) return "Queueing smoothly";
  return "Healthy headroom";
});

const statusHeadline = computed(() => {
  if (isDirect.value) {
    return `${clients.value.length} backend processes open for ${activeClientCount.value} active queries`;
  }
  if (waitingQueue.value.length === 0) {
    return `${activeServerCount.value} of ${POOL_SIZE} server slots busy · 0 clients waiting`;
  }
  return `${POOL_SIZE} server slots full · ${waitingQueue.value.length} ${waitingQueue.value.length === 1 ? "client" : "clients"} queued in memory`;
});

const statusDetail = computed(() => {
  if (isDirect.value) {
    return "Even idle clients occupy full PostgreSQL processes, consuming private RAM and inflating connection snapshots.";
  }
  if (waitingQueue.value.length === 0) {
    return "Every incoming transaction acquires an idle PostgreSQL connection immediately with zero queue wait.";
  }
  return `Excess clients keep their TCP sockets open in waiting_client_list. Step a transaction to watch ${clientLabel(waitingQueue.value[0])} inherit the freed backend.`;
});

loadScenario("burst");
</script>

<style scoped>
.pool-sim {
  display: grid;
  gap: 1rem;
  margin: 1.75rem 0;
  padding: 1.2rem;
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--background) 86%, var(--surface));
}

.sim-heading {
  display: grid;
  gap: 0.28rem;
}

.sim-kicker {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.68rem;
  letter-spacing: 0.045em;
  text-transform: uppercase;
}

.sim-heading strong {
  color: var(--foreground);
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: -0.025em;
}

.sim-heading > span:last-child,
.sim-note {
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.55;
}

.scenario-controls {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.35rem;
  padding: 0.25rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.7rem;
  background: var(--surface);
}

.scenario-controls button {
  min-height: 40px;
  padding: 0.4rem 0.5rem;
  border: 0;
  border-radius: 0.5rem;
  color: var(--muted);
  background: transparent;
  font-family: var(--mono);
  font-size: 0.74rem;
  font-weight: 500;
  transition:
    color 150ms ease,
    background-color 150ms ease,
    transform 150ms var(--ease-out);
}

.scenario-controls button.is-active {
  color: var(--foreground);
  background: var(--card);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.scenario-controls button:focus-visible,
.sim-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.sim-summary {
  display: grid;
  gap: 0.3rem;
  padding: 0.9rem 1rem;
  border-left: 3px solid var(--accent);
  border-radius: 0 0.65rem 0.65rem 0;
  background: var(--surface);
}

.sim-summary__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
}

.sim-summary__eyebrow {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.72rem;
}

.sim-summary__badge {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-family: var(--mono);
  font-size: 0.68rem;
  font-weight: 500;
}

.sim-summary__badge.is-ok {
  color: #15803d;
  background: rgba(34, 197, 94, 0.14);
}

.sim-summary__badge.is-warn {
  color: #c2410c;
  background: rgba(255, 77, 0, 0.12);
}

.sim-summary__badge.is-danger {
  color: #b91c1c;
  background: rgba(239, 68, 68, 0.14);
}

:global(.dark) .sim-summary__badge.is-ok {
  color: #4ade80;
}

:global(.dark) .sim-summary__badge.is-warn {
  color: #fb923c;
}

:global(.dark) .sim-summary__badge.is-danger {
  color: #f87171;
}

.sim-summary strong {
  color: var(--foreground);
  font-size: 0.98rem;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.sim-summary p {
  margin: 0;
  color: var(--muted);
  font-size: 0.8rem;
  line-height: 1.5;
}

.sim-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
}

.sim-btn {
  min-height: 36px;
  padding: 0.4rem 0.85rem;
  border: 1px solid var(--border);
  border-radius: 0.55rem;
  background: var(--card);
  color: var(--foreground);
  font-family: var(--mono);
  font-size: 0.75rem;
  font-weight: 500;
  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    opacity 150ms ease;
}

.sim-btn--primary {
  border-color: var(--accent);
  background: var(--accent);
  color: #ffffff;
}

.sim-btn--ghost {
  background: transparent;
  color: var(--muted);
}

.sim-btn:disabled {
  opacity: 0.42;
  cursor: not-allowed;
}

.sim-counter {
  margin-left: auto;
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.72rem;
}

.sim-stage {
  display: grid;
  grid-template-columns: 1.15fr 1fr 0.95fr;
  gap: 0.85rem;
}

.sim-col {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  padding: 0.85rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  background: var(--card);
  min-width: 0;
}

.sim-col__head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.4rem;
  padding-bottom: 0.55rem;
  border-bottom: 1px solid var(--border-subtle);
}

.sim-col__head span {
  color: var(--foreground);
  font-size: 0.82rem;
  font-weight: 600;
}

.sim-col__head small {
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.68rem;
}

.client-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.4rem;
}

.client-chip {
  display: grid;
  gap: 0.1rem;
  padding: 0.4rem 0.45rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.45rem;
  background: var(--surface);
  font-family: var(--mono);
  transition:
    border-color 150ms ease,
    background-color 150ms ease;
}

.client-chip__id {
  color: var(--foreground);
  font-size: 0.72rem;
  font-weight: 600;
}

.client-chip__meta {
  color: var(--faint);
  font-size: 0.64rem;
}

.client-chip.is-active {
  border-color: rgba(34, 197, 94, 0.45);
  background: rgba(34, 197, 94, 0.1);
}

.client-chip.is-active .client-chip__meta {
  color: #15803d;
}

:global(.dark) .client-chip.is-active .client-chip__meta {
  color: #4ade80;
}

.client-chip.is-waiting {
  border-color: rgba(255, 77, 0, 0.45);
  background: var(--accent-soft);
}

.client-chip.is-waiting .client-chip__meta {
  color: var(--accent);
}

.sim-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: auto;
  padding-top: 0.4rem;
  color: var(--faint);
  font-family: var(--mono);
  font-size: 0.66rem;
}

.sim-legend span {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--faint);
}

.dot.is-active {
  background: #22c55e;
}

.dot.is-waiting {
  background: var(--accent);
}

.pool-key {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 0.45rem 0.6rem;
  border-radius: 0.45rem;
  background: var(--surface);
  font-size: 0.72rem;
}

.pool-key span {
  color: var(--faint);
}

.pool-key code {
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--foreground);
  font-family: var(--mono);
  font-size: 0.7rem;
}

.queue-box {
  display: grid;
  gap: 0.5rem;
  flex: 1;
  padding: 0.65rem;
  border: 1px dashed var(--border);
  border-radius: 0.55rem;
  background: var(--surface);
  align-content: start;
}

.queue-box__head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--mono);
  font-size: 0.68rem;
}

.queue-box__head span {
  color: var(--foreground);
  font-weight: 500;
}

.queue-box__head small {
  color: var(--accent);
}

.queue-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.queue-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid rgba(255, 77, 0, 0.3);
  border-radius: 0.4rem;
  background: var(--card);
  color: var(--foreground);
  font-family: var(--mono);
  font-size: 0.7rem;
}

.queue-pill.is-next {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.queue-pill small {
  color: var(--accent);
  font-size: 0.6rem;
  text-transform: uppercase;
}

.queue-empty {
  margin: 0;
  color: var(--faint);
  font-size: 0.74rem;
  line-height: 1.45;
}

.direct-box {
  display: grid;
  gap: 0.55rem;
  padding: 0.7rem;
  border-radius: 0.55rem;
  background: var(--surface);
  font-size: 0.76rem;
}

.direct-box strong {
  color: var(--foreground);
  font-weight: 600;
}

.direct-box p {
  margin: 0;
  color: var(--muted);
  line-height: 1.5;
}

.direct-metric {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-subtle);
  font-family: var(--mono);
  font-size: 0.72rem;
}

.direct-metric span {
  color: var(--faint);
}

.direct-metric strong {
  color: var(--accent);
}

.server-list {
  display: grid;
  gap: 0.45rem;
}

.server-list.is-dense {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.32rem;
}

.server-slot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid var(--border-subtle);
  border-radius: 0.45rem;
  background: var(--surface);
  font-family: var(--mono);
  font-size: 0.7rem;
}

.server-list.is-dense .server-slot {
  padding: 0.32rem 0.42rem;
  font-size: 0.64rem;
}

.server-slot__name {
  color: var(--foreground);
  font-weight: 600;
}

.server-slot__owner {
  color: var(--faint);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.server-slot.is-busy {
  border-color: rgba(34, 197, 94, 0.42);
  background: rgba(34, 197, 94, 0.08);
}

.server-slot.is-busy .server-slot__owner {
  color: #15803d;
}

:global(.dark) .server-slot.is-busy .server-slot__owner {
  color: #4ade80;
}

.show-pools {
  display: grid;
  gap: 0.6rem;
  padding: 0.8rem 0.95rem;
  border: 1px solid var(--code-border);
  border-radius: 0.7rem;
  background: var(--code);
  font-family: var(--mono);
}

.show-pools__bar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: var(--faint);
}

.show-pools__bar code {
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--foreground);
  font-size: 0.74rem;
}

.show-pools__metrics {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.5rem;
}

.show-pools__metrics > div {
  display: grid;
  gap: 0.15rem;
  padding: 0.45rem 0.55rem;
  border-radius: 0.45rem;
  background: var(--card);
  border: 1px solid var(--border-subtle);
}

.show-pools__metrics span {
  color: var(--faint);
  font-size: 0.65rem;
}

.show-pools__metrics strong {
  color: var(--foreground);
  font-size: 0.88rem;
  font-weight: 600;
}

.show-pools__metrics strong.is-warn {
  color: var(--accent);
}

.sim-note {
  display: flex;
  gap: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-subtle);
}

.sim-note span {
  color: var(--accent);
  font-family: var(--mono);
}

@media (hover: hover) and (pointer: fine) {
  .scenario-controls button:not(.is-active):hover {
    color: var(--foreground);
    background: var(--surface-hover);
  }
  .sim-btn:not(:disabled):hover {
    border-color: var(--foreground);
  }
  .sim-btn--primary:not(:disabled):hover {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }
}

@media (max-width: 760px) {
  .pool-sim {
    padding: 0.95rem;
  }
  .scenario-controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .sim-stage {
    grid-template-columns: 1fr;
  }
  .show-pools__metrics {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .sim-counter {
    margin-left: 0;
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scenario-controls button,
  .sim-btn,
  .client-chip {
    transition-duration: 0ms;
  }
}
</style>
