import type { Route } from "./+types/works";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import WorksPage from "@/modules/works/ui/works-page";

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
          <WorksPage />
        </main>
      </div>
      <Footer />
    </>
  );
}
