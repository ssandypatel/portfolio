import type { Experience } from "../types";

export function renderExperienceSection(experiences: Experience[]): string {
  const experienceMarkup = experiences
    .map(
      (experience) => `
        <article class="glass-panel space-y-8 md:space-y-10 animate-section" data-animate>
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-sm uppercase tracking-[0.4em] text-cyan-300">${experience.role}</p>
              <h3 class="mt-2 text-3xl font-semibold text-white">${experience.company}</h3>
              <p class="text-sm text-slate-400">${experience.location} · ${experience.period}</p>
            </div>
            <span class="pill">${experience.focus}</span>
          </div>
          <p class="text-base text-slate-200 leading-relaxed">${experience.summary}</p>
          <div class="space-y-6">
            ${experience.initiatives
              .map(
                (initiative) => `
                  <div class="rounded-2xl border border-white/5 bg-white/5 p-6 tilt-card" data-tilt>
                    <div class="flex flex-wrap items-center justify-between gap-3">
                      <h4 class="text-xl font-semibold text-white">${initiative.title}</h4>
                      <span class="text-sm text-slate-300">Impact Focus</span>
                    </div>
                    <p class="mt-2 text-slate-300">${initiative.summary}</p>
                    <ul class="mt-4 space-y-2 text-sm leading-relaxed text-slate-200">
                      ${initiative.highlights
                        .map(
                          (point) => `
                            <li class="flex gap-2">
                              <span class="text-cyan-300">•</span>
                              <span>${point}</span>
                            </li>
                          `
                        )
                        .join("")}
                    </ul>
                    <div class="mt-5 flex flex-wrap gap-2">
                      ${initiative.stack
                        .map((tech) => `<span class="pill !text-[0.6rem] tracking-[0.3em]">${tech}</span>`)
                        .join("")}
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");

  return `
    <section id="experience" data-section class="scroll-mt-24 space-y-8">
      <div class="section-heading">
        <span class="section-eyebrow">Experience</span>
        <h2 class="section-title">Impacting products across clouds and AI-powered workflows.</h2>
      </div>
      <div class="space-y-8">
        ${experienceMarkup}
      </div>
    </section>
  `;
}

