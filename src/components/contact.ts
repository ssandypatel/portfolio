import type { ContactChannel } from "../types";

export function renderContactSection(contactChannels: ContactChannel[]): string {
  const channelsMarkup = contactChannels
    .map(
      (channel) => `
        <a
          href="${channel.href}"
          class="rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-left transition hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-400/10"
          target="${channel.href.startsWith("http") ? "_blank" : "_self"}"
          rel="${channel.href.startsWith("http") ? "noopener noreferrer" : ""}"
        >
          <p class="text-xs uppercase tracking-[0.3em] text-slate-400">${channel.label}</p>
          <p class="mt-1 break-words text-lg font-semibold text-white">${channel.value}</p>
        </a>
      `
    )
    .join("");

  return `
    <section id="contact" data-section class="scroll-mt-24 space-y-8">
      <div class="section-heading">
        <span class="section-eyebrow">Contact</span>
        <h2 class="section-title">Let’s collaborate on cloud, AI, or impactful experiences.</h2>
      </div>
      <div class="glass-panel grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div class="space-y-6">
          <p class="text-lg text-slate-200">
            Whether it's architecting multi-cloud systems, prototyping ML workflows, or mentoring teams, I'm excited to help ideas become products.
          </p>
          <div class="grid gap-4 sm:grid-cols-2">
            ${channelsMarkup}
          </div>
          <div class="flex flex-wrap gap-3">
            <a
              href="mailto:sandeep.patel@iitgn.ac.in"
              class="rounded-full bg-gradient-to-r from-cyan-400 to-pink-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-glow transition hover:shadow-glow/70"
            >
              Send a note
            </a>
            <a
              href="https://github.com/ssandypatel"
              target="_blank"
              rel="noopener noreferrer"
              class="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-300"
            >
              GitHub profile
            </a>
          </div>
        </div>
        <div class="rounded-2xl border border-white/10 bg-slate-900/60 px-6 py-8 shadow-inner sm:p-8">
          <p class="text-sm uppercase tracking-[0.4em] text-cyan-300">Say hello</p>
          <h3 class="mt-2 text-2xl font-semibold text-white">Share a bit about your idea or team.</h3>
          <form data-contact-form class="mt-6 space-y-5">
            <div class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300" for="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                placeholder="Jane Doe"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300" for="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300" for="contact-company">Organization (optional)</label>
              <input
                id="contact-company"
                name="company"
                type="text"
                placeholder="Product Studio / IITGN"
                class="w-full rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300" for="contact-message">How can I help?</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows="4"
                placeholder="Tell me about the problem, timeline, or stack..."
                class="w-full rounded-2xl border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40"
              ></textarea>
            </div>
            <div class="space-y-3">
              <button
                type="submit"
                class="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-pink-400 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:shadow-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              >
                Send message
              </button>
              <p data-contact-feedback class="text-sm text-slate-300"></p>
            </div>
          </form>
        </div>
      </div>
    </section>
  `;
}

