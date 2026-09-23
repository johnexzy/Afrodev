import { serverQueryContent } from "#content/server";
import { projects } from "~/data/work";

export default defineEventHandler(async (event) => {
  const blogSite = useRuntimeConfig(event).public.blogSite;
  const articles = await serverQueryContent(event)
    .where({ draft: false })
    .only(["_path"])
    .find();
  const articlePaths = articles
    .map((article) => article._path)
    .filter((path): path is string => Boolean(path));
  const routes = blogSite
    ? ["/", ...articlePaths]
    : [
        "/",
        "/portfolio",
        "/about",
        ...projects.map((project) => `/work/${project.slug}`),
      ];
  return [...new Set(routes)].map((loc) => ({ loc }));
});
