import type { Route } from "./+types/home";
import { Navigation } from "@/components/navigation";
import { ContactView } from "@/modules/contact/ui/view/contact-view";
import { LoaderWrapper } from "@/components/loader";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact | brand+" },
    {
      name: "description",
      content:
        "Get in touch with brand+ — a Berlin-based branding & identity studio.",
    },
  ];
}

export default function Contact() {
  return (
    <>
      <Navigation />
      <LoaderWrapper>
        <ContactView />
      </LoaderWrapper>
    </>
  );
}
