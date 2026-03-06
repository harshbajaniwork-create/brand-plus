import type { Route } from "./+types/home";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { HomeView } from "@/modules/home/ui/view/home-view";
import { LoadingScreen } from "@/modules/home/ui/components/loading-screen";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "brand + | Innovative Branding & Design" },
    {
      name: "description",
      content:
        "Creating innovative branding solutions and design services that inspire and transform businesses.",
    },
  ];
}

export default function Home() {
  return (
    <>
      {/* Loading screen — runs animation on mount, then disappears */}
      <LoadingScreen />

      {/* Sticky navigation */}
      <Navigation />

      {/* Main page content */}
      <div data-page-view>
        <HomeView />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
