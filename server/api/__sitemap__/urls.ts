import { serverQueryContent } from "#content/server";
import { projects } from "~/data/work";

export default defineEventHandler(async (event) => {
  const articles = await serverQueryContent(event)
    .where({ draft: false })
    .only(["_path"])
    .find();
  const routes = [
    "/",
    "/portfolio",
    "/blog",
    "/about",
    ...projects.map((project) => `/work/${project.slug}`),
    ...articles
      .map((article) => article._path)
      .filter((path): path is string => Boolean(path)),
  ];
  return [...new Set(routes)].map((loc) => ({ loc }));
});
