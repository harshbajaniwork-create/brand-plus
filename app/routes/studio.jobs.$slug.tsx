import { useParams } from "react-router";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { jobs } from "@/modules/studio/data/jobs-data";
import JobDetailPage from "@/modules/studio/ui/components/job-detail-page";

export function meta({ params }: { params: { slug: string } }) {
  const job = jobs.find((j) => j.slug === params.slug);
  return [
    { title: `brand+ | ${job?.title ?? "Job Offer"}` },
    {
      name: "description",
      content: job?.description ?? "Job details at brand+",
    },
  ];
}

export default function JobDetail() {
  const { slug } = useParams();
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <>
        <Navigation forceTheme="light" />
        <div className="relative w-full bg-white min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">Position not found</h1>
          <a href="/studio" className="underline underline-offset-4 text-black/70 hover:text-black transition-colors">
            Back to Studio
          </a>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation forceTheme="light" />
      <main>
        <JobDetailPage job={job} />
      </main>
      <Footer />
    </>
  );
}
