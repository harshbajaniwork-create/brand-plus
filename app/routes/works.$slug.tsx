import { useParams } from "react-router";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { lazy, Suspense } from "react";
import { projects } from "@/modules/works/data/works-data";
import Loader from "@/components/loader";

// Lazy load project detail components
const ProjectDetailPage = lazy(() =>
  import("@/modules/works/ui/project-detail-page").then((module) => ({
    default: module.default,
  })),
);

export function meta({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  return [
    { title: `brand+ | ${project?.name ?? "Project"}` },
    {
      name: "description",
      content: project?.description ?? "Project details",
    },
  ];
}

export default function WorkDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <>
        <Navigation />
        <div className="relative w-full bg-white min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-normal">Project not found</h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation forceTheme="light" />
      <div className="relative w-full bg-white">
        <main>
          <Suspense fallback={<Loader />}>
            <ProjectDetailPage project={project} />
          </Suspense>
        </main>
      </div>
      <Footer />
    </>
  );
}
