export const readingTags = ["technical", "less-technical"] as const;

export const tagLabels: Record<string, string> = {
  technical: "Technical",
  "less-technical": "Less technical",
  ai: "AI",
  blockchain: "Blockchain",
  career: "Career",
  design: "Design",
  engineering: "Engineering",
  product: "Product",
  startups: "Startups",
  systems: "Systems",
  web: "Web",
};

export const isReadingTag = (tag: string) =>
  readingTags.some((readingTag) => readingTag === tag);

export const tagLabel = (tag: string) => tagLabels[tag] || tag;
