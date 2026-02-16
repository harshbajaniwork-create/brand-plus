import type { Route } from "./+types/home";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HomeView } from "@/modules/home/ui/view/home-view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Archo - Architecture & Interior Design" },
    { name: "description", content: "Creating innovative architectural solutions and stunning interior designs that inspire and transform spaces." },
  ];
}

export default function Home() {
  return (
    <>
      <Navigation />
      <HomeView />
      <Footer />
    </>
  );
}
