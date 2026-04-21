import type { Route } from "./+types/home";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProcessView } from "@/modules/process/ui/view/process-view";
import { LoaderWrapper } from "@/components/loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Process | brand+" },
    {
      name: "description",
      content:
        "Discover how brand+ shapes identities through a rigorous, thoughtful creative process.",
    },
  ];
}

export default function Process() {
  return (
    <>
      {/* Force light theme — no dark hero on this page */}
      <Navigation forceTheme="light" />
      <LoaderWrapper>
        <ProcessView />
      </LoaderWrapper>
      <Footer />
    </>
  );
}
