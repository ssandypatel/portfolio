import type { Project } from "../types";

export function renderProjectsSection(projects: Project[]): string {
  const projectMarkup = projects
    .map(
      (project) => `
        <article class="glass-panel overflow-hidden p-0 animate-section" data-animate>
          <div class="relative h-56 w-full overflow-hidden">
            <img
              src="${project.cover}"
              alt="${project.title}"
              class="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <span class="absolute left-4 top-4 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white">
              ${project.period}
            </span>
          </div>
          <div class="space-y-4 p-6 sm:p-8">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="text-2xl font-semibold text-white">${project.title}</h3>
              <p class="text-sm text-cyan-300">${project.metrics}</p>
            </div>
            <p class="text-base text-slate-200">${project.description}</p>
            <ul class="space-y-2 text-sm leading-relaxed text-slate-200">
              ${project.highlights
                .map((item) => `<li class="flex gap-2"><span class="text-pink-300">›</span><span>${item}</span></li>`)
                .join("")}
            </ul>
            <div class="flex flex-wrap gap-2">
              ${project.stack
                .map((tech) => `<span class="pill !text-[0.6rem] tracking-[0.3em]">${tech}</span>`)
                .join("")}
            </div>
          </div>
        </article>
      `
    )
    .join("");

  return `
    <section id="projects" data-section class="scroll-mt-24 space-y-8">
      <div class="section-heading">
        <span class="section-eyebrow">Projects</span>
        <h2 class="section-title">Product experiments that move AI ideas into real interfaces.</h2>
      </div>
      <div class="grid gap-8 lg:grid-cols-2">
        ${projectMarkup}
      </div>
    </section>
  `;
}

