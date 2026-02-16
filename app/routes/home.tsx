import type { Route } from "./+types/home";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HomeView } from "@/modules/home/ui/view/home-view";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "brand + | Innovative Branding & Design" },
    { name: "description", content: "Creating innovative branding solutions and design services that inspire and transform businesses." },
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
