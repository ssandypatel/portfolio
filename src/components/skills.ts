import type { SkillGroup } from "../types";

export function renderSkillsSection(skillGroups: SkillGroup[]): string {
  const skillsMarkup = skillGroups
    .map(
      (group) => `
        <article class="glass-panel space-y-4 animate-section" data-animate>
          <div class="flex items-center justify-between gap-3">
            <h3 class="text-xl font-semibold text-white">${group.title}</h3>
            <span class="text-sm text-slate-400">${group.level}%</span>
          </div>
          <p class="text-sm text-slate-300">${group.detail}</p>
          <div class="h-2 rounded-full bg-white/10">
            <div class="h-full rounded-full bg-gradient-to-r from-cyan-400 to-pink-400" style="width: ${group.level}%"></div>
          </div>
          <ul class="space-y-2 text-sm text-slate-200">
            ${group.items
              .map((item) => `<li class="flex gap-2"><span class="text-cyan-300">•</span><span>${item}</span></li>`)
              .join("")}
          </ul>
        </article>
      `
    )
    .join("");

  return `
    <section id="skills" data-section class="scroll-mt-24 space-y-8">
      <div class="section-heading">
        <span class="section-eyebrow">Skills & Tech</span>
        <h2 class="section-title">Tools I use to go from a brief to pixel-perfect, scalable products.</h2>
      </div>
      <div class="grid gap-6 lg:grid-cols-2">
        ${skillsMarkup}
      </div>
    </section>
  `;
}

