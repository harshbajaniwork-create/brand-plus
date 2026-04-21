"use client";

import { useState, useMemo } from "react";
import {
  projects,
  getLocalizedCategories,
} from "@/modules/works/data/works-data";
import WorksHeader from "./works-header";
import FiltersDrawer from "./filters-drawer";
import WorksGridView from "./works-grid-view";
import WorksListView from "./works-list-view";
import ViewToggle from "./view-toggle";
import { useLanguage } from "@/lib/i18n/context";

export default function WorksPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const categories = getLocalizedCategories(t);
  const activeCategory = categories.find((c) => c.key === activeFilter);
  const displayCount = filteredProjects.length;
  const displayLabel = activeCategory?.label ?? t("works.allWork");

  const handleFilterSelect = (key: string) => {
    setActiveFilter(key);
    setDrawerOpen(false);
  };

  return (
    <section className="relative min-h-screen pt-32 pb-40">
      {/* Header: Title + Filters button */}
      <WorksHeader
        label={displayLabel}
        count={displayCount}
        drawerOpen={drawerOpen}
        onToggleDrawer={() => setDrawerOpen((o) => !o)}
      />

      {/* Filters drawer */}
      <FiltersDrawer
        open={drawerOpen}
        activeFilter={activeFilter}
        onSelect={handleFilterSelect}
      />

      {/* Content */}
      <div className="px-(--margin) mt-8">
        {viewMode === "grid" ? (
          <WorksGridView projects={filteredProjects} />
        ) : (
          <WorksListView projects={filteredProjects} />
        )}
      </div>

      {/* Sticky bottom toggle */}
      <ViewToggle viewMode={viewMode} onChangeView={setViewMode} />
    </section>
  );
}
