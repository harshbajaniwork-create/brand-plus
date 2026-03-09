import type { Route } from "./+types/works";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { lazy, Suspense } from "react";
import Loader from "@/components/loader";

// Lazy load works components
const WorksPage = lazy(() =>
  import("@/modules/works/ui/works-page").then((module) => ({
    default: module.default,
  })),
);

export function meta({}: Route.MetaArgs) {
  return [
    { title: "brand+ | Work" },
    {
      name: "description",
      content: "Explore our portfolio of architecture and design projects.",
    },
  ];
}

export default function Works() {
  return (
    <>
      <Navigation forceTheme="light" />
      <div className="relative w-full bg-white">
        <main>
          <Suspense fallback={<Loader />}>
            <WorksPage />
          </Suspense>
        </main>
      </div>
      <Footer />
    </>
  );
}
