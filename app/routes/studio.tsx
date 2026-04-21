import type { Route } from "./+types/home";
import { StudioView } from "@/modules/studio/ui/view/studio-view";
import { LoaderWrapper } from "@/components/loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Studio | brand+" },
    {
      name: "description",
      content:
        "brand+ is a Berlin-based branding studio dedicated to building bold, enduring identities.",
    },
  ];
}

export default function Studio() {
  return (
    <>
      <LoaderWrapper>
        <StudioView />
      </LoaderWrapper>
    </>
  );
}
