export function renderFooter(): string {
  return `
    <footer class="border-t border-white/5 bg-slate-950/80">
      <div class="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>© ${new Date().getFullYear()} Sandeep Patel. Crafted with Vite + Tailwind.</p>
        <p>Open for full-time software engineering & ML opportunities.</p>
      </div>
    </footer>
  `;
}

