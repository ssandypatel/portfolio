import type { NavLink } from "../types";

export function renderHeader(navLinks: NavLink[]): string {
  const navigation = navLinks
    .map(
      (link) => `
        <a
          href="#${link.id}"
          data-nav-link="${link.id}"
          class="rounded-full px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
        >
          ${link.label}
        </a>
      `
    )
    .join("");

  return `
    <header class="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div class="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <a href="#home" class="flex items-center gap-3">
            <span class="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-lg font-semibold text-cyan-300">SP</span>
            <div>
              <p class="text-lg font-semibold tracking-tight text-white">Sandeep Patel</p>
              <p class="text-[0.65rem] uppercase tracking-[0.4em] text-slate-400">Software Engineer</p>
            </div>
          </a>
          <div class="hidden sm:flex items-center gap-3">
            <a
              class="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-white"
              href="/Sandeep_Patel_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé
            </a>
            <button
              class="rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-5 py-2 text-sm font-semibold text-slate-900 shadow-glow transition hover:shadow-glow/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              data-scroll-target="#contact"
            >
              Let’s build
            </button>
          </div>
        </div>
        <nav class="flex items-center gap-1 overflow-x-auto rounded-2xl border border-white/5 bg-white/5 p-2">
          ${navigation}
        </nav>
        <div class="flex sm:hidden gap-3">
          <a
            class="flex-1 rounded-full border border-white/10 px-4 py-2 text-center text-sm font-semibold text-slate-200"
            href="/Sandeep_Patel_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Résumé
          </a>
          <button
            class="flex-1 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 px-4 py-2 text-sm font-semibold text-slate-900"
            data-scroll-target="#contact"
          >
            Contact
          </button>
        </div>
      </div>
      <div class="h-1 w-full bg-white/5">
        <div id="scroll-progress" class="h-full w-0 rounded-r-full bg-gradient-to-r from-cyan-400 via-sky-400 to-pink-400 transition-[width] duration-200"></div>
      </div>
    </header>
  `;
}

