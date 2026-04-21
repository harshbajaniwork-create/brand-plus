import type { Job } from "@/modules/studio/data/jobs-data";
import { Link } from "react-router";
import { useLanguage } from "@/lib/i18n/context";

export default function JobDetailPage({ job }: { job: Job }) {
  const { t } = useLanguage();

  // Get localized job data with fallback to original job data
  const localizedJob =
    (t(`studio.jobs.detail.jobs.${job.slug}`, {
      returnObjects: true,
    }) as {
      title: string;
      type: string;
      description: string;
      responsibilities: string[];
      requirements: string[];
    }) || job;

  // Ensure arrays exist
  const responsibilities =
    localizedJob.responsibilities || job.responsibilities;
  const requirements = localizedJob.requirements || job.requirements;

  return (
    <div className="relative bg-white text-black min-h-screen">
      <div className="grid-w pt-32 pb-24 md:pt-48 md:pb-32">
        {/* Left Column: Title & Apply */}
        <div className="col-span-full md:col-span-4 flex flex-col items-start mb-16 md:mb-0">
          <Link
            to="/studio"
            className="group flex items-center gap-3 body-14 text-black/50 hover:text-black transition-colors mb-12 uppercase tracking-widest"
          >
            <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all">
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M13 8H3M3 8L8 3M3 8L8 13" />
              </svg>
            </div>
            {t("studio.jobs.detail.backToStudio")}
          </Link>

          <h1 className="text-4xl md:text-5xl lg:text-[64px] font-bold  mb-6">
            {localizedJob.title || job.title}
          </h1>
          <p className="body-16 lg:body-18 text-black/50 mb-12">
            {localizedJob.type || job.type}
          </p>

          <a
            href={`mailto:home@brandplus.berlin?subject=Application for ${encodeURIComponent(localizedJob.title || job.title)}`}
            className="inline-flex items-center justify-center bg-black text-white px-8 py-5 rounded-full body-16 font-medium hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {t("studio.jobs.detail.applyForRole")}
          </a>
        </div>

        {/* Right Column: Description & Details */}
        <div className="col-span-full md:col-start-6 md:col-end-12 xl:col-end-11 flex flex-col gap-16 md:pt-4">
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {t("studio.jobs.detail.aboutRole")}
            </h2>
            <p className="body-16 md:body-18 leading-[1.6] text-black/70">
              {localizedJob.description || job.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">
              {t("studio.jobs.detail.responsibilities")}
            </h2>
            <ul className="list-disc pl-5 body-16 md:body-18 leading-[1.6] text-black/70 space-y-3 marker:text-black/30">
              {responsibilities.map((resp, i) => (
                <li key={i}>{resp}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">
              {t("studio.jobs.detail.requirements")}
            </h2>
            <ul className="list-disc pl-5 body-16 md:body-18 leading-[1.6] text-black/70 space-y-3 marker:text-black/30">
              {requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
