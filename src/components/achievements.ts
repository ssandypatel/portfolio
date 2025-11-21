import type { Achievement } from "../types";

export function renderAchievementsSection(achievements: Achievement[]): string {
  const achievementsMarkup = achievements
    .map(
      (achievement) => `
        <li class="relative pl-6">
          <span class="absolute left-0 top-2 h-2 w-2 rounded-full bg-cyan-300"></span>
          <div class="flex flex-wrap items-center justify-between gap-2">
            <p class="text-base font-semibold text-white">${achievement.title}</p>
            <span class="text-xs uppercase tracking-[0.3em] text-slate-400">${achievement.date}</span>
          </div>
          <p class="text-sm text-slate-300">${achievement.detail}</p>
        </li>
      `
    )
    .join("");

  return `
    <section id="achievements" data-section class="scroll-mt-24 space-y-8">
      <div class="section-heading">
        <span class="section-eyebrow">Highlights</span>
        <h2 class="section-title">Leadership, certifications, and community footprints.</h2>
      </div>
      <div class="glass-panel">
        <ol class="space-y-4">
          ${achievementsMarkup}
        </ol>
      </div>
    </section>
  `;
}

