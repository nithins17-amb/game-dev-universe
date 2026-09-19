import { createFileRoute } from "@tanstack/react-router";
import { WorkshopExperience } from "@/components/WorkshopExperience";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Game Development Workshop | Madras Engineering College" },
      { name: "description", content: "One Day Workshop on Game Development organized by the Department of Artificial Intelligence and Data Science, Madras Engineering College." },
      { property: "og:title", content: "Game Development Workshop | Madras Engineering College" },
      { property: "og:description", content: "Design, develop and play at Madras Engineering College on 25 September 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return <WorkshopExperience />;
}
