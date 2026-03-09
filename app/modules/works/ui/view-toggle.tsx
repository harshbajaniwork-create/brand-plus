import { StickyPill } from "@/components/sticky-pill";

interface ViewToggleProps {
  viewMode: "grid" | "list";
  onChangeView: (mode: "grid" | "list") => void;
}

export default function ViewToggle({
  viewMode,
  onChangeView,
}: ViewToggleProps) {
  return (
    <StickyPill className="p-0">
      <button
        onClick={() => onChangeView("grid")}
        className={`px-5 py-3 flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
          viewMode === "grid" ? "text-white" : "text-white/50"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="2" fill="currentColor" />
          <circle cx="11" cy="3" r="2" fill="currentColor" />
          <circle cx="3" cy="11" r="2" fill="currentColor" />
          <circle cx="11" cy="11" r="2" fill="currentColor" />
        </svg>
        Grid view
      </button>

      {/* Small divider between buttons */}
      <div className="w-px h-4 bg-white/10" />

      <button
        onClick={() => onChangeView("list")}
        className={`px-5 py-3 flex items-center gap-2 transition-colors duration-200 cursor-pointer ${
          viewMode === "list" ? "text-white" : "text-white/50"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0" y="3" width="14" height="2" rx="1" fill="currentColor" />
          <rect x="0" y="9" width="14" height="2" rx="1" fill="currentColor" />
        </svg>
        List view
      </button>
    </StickyPill>
  );
}
