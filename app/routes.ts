import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("works", "routes/works.tsx"),
  route("works/:slug", "routes/works.$slug.tsx"),
  route("process", "routes/process.tsx"),
  route("studio", "routes/studio.tsx"),
  route("contact", "routes/contact.tsx"),
] satisfies RouteConfig;

