import "./style.css";

import {
  achievements,
  contactChannels,
  education,
  experiences,
  heroHighlights,
  heroStats,
  profilePicture,
  navLinks,
  notesConfig,
  projects,
  rotatingPhrases,
  skillGroups
} from "./data";
import { renderHeader } from "./components/header";
import { renderHeroSection } from "./components/hero";
import { renderExperienceSection } from "./components/experience";
import { renderProjectsSection } from "./components/projects";
import { renderEducationSection } from "./components/education";
import { renderSkillsSection } from "./components/skills";
import { renderAchievementsSection } from "./components/achievements";
import { renderContactSection } from "./components/contact";
import { renderFooter } from "./components/footer";
import { renderNotesSection } from "./components/notes";
import { initInteractions } from "./interactions";

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("Unable to find #app container.");
}

const template = `
  <div class="relative isolate min-h-screen overflow-hidden bg-slate-950 text-slate-100">
    <div class="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.15),_transparent_55%)]"></div>
    ${renderHeader(navLinks)}
    <main class="relative mx-auto flex max-w-6xl flex-col gap-24 px-6 pb-24 pt-32">
      ${renderHeroSection({ heroHighlights, heroStats, rotatingPhrases, profilePicture })}
      ${renderExperienceSection(experiences)}
      ${renderProjectsSection(projects)}
      ${renderEducationSection(education)}
      ${renderSkillsSection(skillGroups)}
      ${renderAchievementsSection(achievements)}
      ${renderNotesSection(notesConfig)}
      ${renderContactSection(contactChannels)}
    </main>
    ${renderFooter()}
  </div>
`;

app.innerHTML = template;
initInteractions(rotatingPhrases);
