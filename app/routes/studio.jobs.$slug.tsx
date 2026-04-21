import { useParams } from "react-router";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { LoaderWrapper } from "@/components/loader";
import { jobs } from "@/modules/studio/data/jobs-data";
import JobDetailPage from "@/modules/studio/ui/components/job-detail-page";
import { useLanguage } from "@/lib/i18n/context";

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
  const { t } = useLanguage();
  const job = jobs.find((j) => j.slug === slug);

  if (!job) {
    return (
      <>
        <Navigation forceTheme="light" />
        <div className="relative w-full bg-white min-h-screen flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-6 tracking-tight">
            {t("studio.jobs.detail.notFound")}
          </h1>
          <a
            href="/studio"
            className="underline underline-offset-4 text-black/70 hover:text-black transition-colors"
          >
            {t("studio.jobs.detail.backToStudio")}
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
        <LoaderWrapper>
          <JobDetailPage job={job} />
        </LoaderWrapper>
      </main>
      <Footer />
    </>
  );
}
