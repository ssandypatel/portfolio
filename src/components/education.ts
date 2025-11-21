import type { Education } from "../types";

export function renderEducationSection(education: Education[]): string {
  const educationMarkup = education
    .map(
      (item) => `
        <div class="rounded-2xl border border-white/5 bg-white/5 p-6 animate-section" data-animate>
          <p class="text-sm uppercase tracking-[0.4em] text-slate-300">${item.timeline}</p>
          <h3 class="mt-3 text-xl font-semibold text-white">${item.school}</h3>
          <p class="text-sm text-cyan-200">${item.credential}</p>
          <p class="mt-3 text-sm text-slate-300">${item.detail}</p>
        </div>
      `
    )
    .join("");

  return `
    <section id="education" data-section class="scroll-mt-24 space-y-8">
      <div class="section-heading">
        <span class="section-eyebrow">Education</span>
        <h2 class="section-title">Strong foundations in engineering, ML, and applied research.</h2>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        ${educationMarkup}
      </div>
    </section>
  `;
}

