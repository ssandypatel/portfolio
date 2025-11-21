import type { HeroStat } from "../types";

type HeroSectionProps = {
  heroHighlights: string[];
  heroStats: HeroStat[];
  rotatingPhrases: string[];
  profilePicture: string;
};

export function renderHeroSection({
  heroHighlights,
  heroStats,
  rotatingPhrases,
  profilePicture
}: HeroSectionProps): string {
  const statsMarkup = heroStats
    .map(
      (stat) => `
        <div class="rounded-2xl border border-white/5 bg-white/5 p-4 text-center">
          <p class="text-3xl font-semibold text-white">${stat.value}</p>
          <p class="mt-1 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">${stat.label}</p>
          <p class="mt-1 text-sm text-slate-300">${stat.detail}</p>
        </div>
      `
    )
    .join("");

  const highlightsMarkup = heroHighlights
    .map(
      (item) => `
        <li class="flex items-start gap-3 text-sm text-slate-300">
          <span class="mt-1 h-2 w-2 rounded-full bg-cyan-300"></span>
          <span>${item}</span>
        </li>
      `
    )
    .join("");

  return `
    <section id="home" data-section class="scroll-mt-24">
      <div class="animate-section rounded-[2rem] border border-white/5 bg-gradient-to-br from-slate-950 via-slate-900/70 to-slate-950 shadow-card"
        data-animate>
        <div class="relative overflow-hidden rounded-[2rem]">
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%)] opacity-70"></div>
          <div class="relative grid gap-10 px-6 py-10 md:px-10 lg:grid-cols-2 lg:items-center">
            <div class="space-y-8">
              <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.4em] text-cyan-300">
                <span class="h-2 w-2 rounded-full bg-cyan-300"></span>
                Currently @ Searce
              </div>
              <div class="space-y-4">
                <h1 class="text-[2.4rem] font-semibold leading-tight text-white sm:text-[2.9rem] lg:text-[3.1rem]">
                  Building reliable cloud & AI experiences as a <br>
                  <span class="text-cyan-300">
                    <span data-typed-phrase>${rotatingPhrases[0]}</span>_
                  </span>
                </h1>
                <br>
                <p class="text-base text-slate-200 sm:text-lg">
                  I craft multi-cloud architectures, ML workflows, and product-ready interfaces that scale from prototype to production—keeping the
                  human experience front and center.
                </p>
              </div>
              <div class="flex flex-wrap gap-3">
                <a
                  href="/Sandeep_Patel_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:shadow-glow/70"
                >
                  Download Résumé
                </a>
                <button
                  data-scroll-target="#projects"
                  class="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300 hover:text-cyan-100"
                >
                  See case studies
                </button>
                <button
                  data-scroll-target="#contact"
                  class="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-pink-300 hover:text-pink-200"
                >
                  Contact me
                </button>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-2xl border border-white/5 bg-white/5 p-5">
                  <p class="text-xs font-semibold uppercase tracking-[0.4em] text-pink-300">Focus</p>
                  <ul class="mt-3 space-y-2 text-sm text-slate-200">
                    ${highlightsMarkup}
                  </ul>
                </div>
                <div class="rounded-2xl border border-white/5 bg-white/5 p-5">
                  <p class="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">Stats</p>
                  <div class="mt-4 grid gap-3">
                    ${statsMarkup}
                  </div>
                </div>
              </div>
            </div>
            <div class="relative mx-auto flex w-full max-w-sm flex-col items-center gap-5">
              <div class="w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl">
                <img
                  src="${profilePicture}"
                  alt="Portrait of Sandeep Patel"
                  class="h-[360px] w-full object-cover object-top"
                />
                <div class="p-5">
                  <p class="text-xs uppercase tracking-[0.4em] text-slate-400">Product mindset</p>
                  <p class="mt-2 text-lg font-semibold text-white">Engineering simple flows for deeply technical systems.</p>
                </div>
              </div>
              <div class="grid w-full gap-3 sm:grid-cols-2">
                <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <p class="text-xs uppercase tracking-[0.3em] text-cyan-300">Core Stack</p>
                  <p class="mt-2">Go · Python · TypeScript · Django · React · Flutter</p>
                </div>
                <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                  <p class="text-xs uppercase tracking-[0.3em] text-pink-300">Cloud & Ops</p>
                  <p class="mt-2">GCP (Run, Batch, Pub/Sub) · AWS (SNS) · Docker · CI/CD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

