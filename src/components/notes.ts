import type { NoteEntry } from "../types";

type NotesSectionProps = {
  repoOwner: string;
  repoName: string;
  branch: string;
  notesFolder: string;
  fallback: NoteEntry[];
};

export function renderNotesSection({
  repoOwner,
  repoName,
  branch,
  notesFolder,
  fallback
}: NotesSectionProps): string {
  const fallbackEncoded = encodeURIComponent(JSON.stringify(fallback));
  const repoLink =
    repoOwner && repoName
      ? `https://github.com/${repoOwner}/${repoName}/tree/${branch}/${notesFolder}`
      : "#";

  const placeholderCards = fallback
    .slice(0, 3)
    .map(
      (note) => `
        <article class="rounded-2xl border border-white/5 bg-white/5 p-6 space-y-3">
          <p class="text-xs uppercase tracking-[0.3em] text-slate-400">${new Date(note.published).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          })}</p>
          <h3 class="text-xl font-semibold text-white">${note.title}</h3>
          <p class="text-sm text-slate-300">${note.summary}</p>
          <div class="flex flex-wrap gap-2">
            ${(note.tags ?? [])
              .map((tag) => `<span class="pill !text-[0.6rem] tracking-[0.3em]">${tag}</span>`)
              .join("")}
          </div>
          ${
            note.slug
              ? `<button type="button" data-note-link="${note.slug}" class="text-sm font-semibold text-cyan-300 hover:text-cyan-100">
                  Read note →
                </button>`
              : `<a href="${note.link}" target="_blank" rel="noopener noreferrer" class="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
                  Read note →
                </a>`
          }
        </article>
      `
    )
    .join("");

  return `
    <section
      id="notes"
      data-section
      class="scroll-mt-24 space-y-8"
      data-notes-repo-owner="${repoOwner}"
      data-notes-repo-name="${repoName}"
      data-notes-branch="${branch}"
      data-notes-folder="${notesFolder}"
      data-notes-fallback="${fallbackEncoded}"
      data-notes-initial-count="3"
    >
      <div class="section-heading">
        <span class="section-eyebrow">Field Notes</span>
        <h2 class="section-title">Articles, snippets, and late-night thoughts.</h2>
        <p class="text-sm text-slate-300">
          Powered by a public JSON feed (GitHub gist or headless CMS). Update the feed and the site refreshes automatically—no redeploy needed.
        </p>
      </div>
      <div
        class="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-slate-950 via-slate-900/70 to-slate-950 p-6 sm:p-8"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-slate-300">Latest notes sync live from <span class="text-cyan-300">GitHub · ${notesFolder || "notes"}</span>.</p>
          <a
            href="${repoLink}"
            target="_blank"
            rel="noopener noreferrer"
            class="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            Open repo
          </a>
        </div>
        <div class="mt-6 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div class="space-y-4" data-notes-list-wrapper>
            <div class="grid gap-4" data-notes-list>
              ${placeholderCards}
            </div>
            <div class="flex items-center justify-center" data-notes-load-more-wrapper>
              <button
                type="button"
                data-notes-load-more
                class="rounded-full border border-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:border-cyan-300 hover:text-cyan-100"
              >
                Show older notes
              </button>
            </div>
          </div>
          <div class="hidden flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6" data-notes-detail>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                data-note-back
                class="w-max rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 hover:border-cyan-300 hover:text-cyan-200"
              >
                ← Back to all posts
              </button>
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  data-note-expand
                  class="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 hover:border-cyan-300 hover:text-cyan-200"
                >
                  Maximize
                </button>
                <button
                  type="button"
                  data-note-collapse
                  class="hidden rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70 hover:border-cyan-300 hover:text-cyan-200"
                >
                  Restore
                </button>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-400" data-note-date>Loading...</p>
                <h3 class="mt-2 text-2xl font-semibold text-white" data-note-title></h3>
                <div class="mt-3 flex flex-wrap gap-2" data-note-tags></div>
              </div>
              <div class="rounded-2xl border border-white/5 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-200 whitespace-pre-wrap max-h-[420px] overflow-y-auto" data-note-content>
                Select any article to read it here.
              </div>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200"
                data-note-source
              >
                View raw on GitHub →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

