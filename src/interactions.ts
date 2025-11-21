export function initInteractions(rotatingPhrases: string[]): void {
  initTypedHeadline(rotatingPhrases);
  setupScrollSpy();
  setupRevealAnimations();
  setupTiltCards();
  setupScrollProgress();
  setupSmoothScroll();
  setupContactForm();
  setupNotesFeed();
}

function initTypedHeadline(phrases: string[]) {
  const target = document.querySelector<HTMLElement>("[data-typed-phrase]");
  if (!target) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const type = () => {
    const currentPhrase = phrases[phraseIndex % phrases.length];
    const nextChars = isDeleting
      ? currentPhrase.substring(0, charIndex - 1)
      : currentPhrase.substring(0, charIndex + 1);

    target.textContent = nextChars;

    if (!isDeleting && nextChars === currentPhrase) {
      isDeleting = true;
      window.setTimeout(type, 1600);
      return;
    }

    if (isDeleting && nextChars === "") {
      isDeleting = false;
      phraseIndex += 1;
    }

    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

    const delay = isDeleting ? 40 : 90;
    window.setTimeout(type, delay);
  };

  type();
}

function setupScrollSpy() {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]")
  );
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>("section[data-section]")
  );

  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((link) => {
            if (link.dataset.navLink === entry.target.id) {
              link.classList.add("text-white");
              link.classList.add("bg-white/10");
            } else {
              link.classList.remove("text-white");
              link.classList.remove("bg-white/10");
            }
          });
        }
      });
    },
    {
      threshold: 0.4
    }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupRevealAnimations() {
  const revealables = document.querySelectorAll<HTMLElement>("[data-animate]");
  if (!revealables.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    revealables.forEach((element) => element.classList.add("animate-section--visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-section--visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealables.forEach((element) => observer.observe(element));
}

function setupTiltCards() {
  const cards = document.querySelectorAll<HTMLElement>("[data-tilt]");
  cards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;

      card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.dataset.tiltActive = "true";
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
      card.dataset.tiltActive = "false";
    });
  });
}

function setupScrollProgress() {
  const progress = document.querySelector<HTMLElement>("#scroll-progress");
  if (!progress) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progressValue = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = `${progressValue}%`;
  };

  window.addEventListener("scroll", update, { passive: true });
  update();
}

function setupSmoothScroll() {
  const triggers = document.querySelectorAll<HTMLElement>("[data-scroll-target], nav a[href^='#']");
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      const targetSelector =
        trigger instanceof HTMLAnchorElement
          ? trigger.getAttribute("href")
          : trigger.getAttribute("data-scroll-target");

      if (!targetSelector || !targetSelector.startsWith("#")) return;

      const section = document.querySelector<HTMLElement>(targetSelector);
      if (!section) return;

      event.preventDefault();
      const headerOffset = 120;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: sectionTop - headerOffset,
        behavior: "smooth"
      });
    });
  });
}

function setupContactForm() {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form) return;
  const feedback = form.querySelector<HTMLElement>("[data-contact-feedback]");
  if (!feedback) return;

  let timeoutId: number | null = null;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const message = (formData.get("message") as string)?.trim();

    if (!name || !email || !message) {
      feedback.textContent = "Please fill in your name, email, and message.";
      feedback.classList.remove("text-cyan-300");
      feedback.classList.add("text-pink-300");
      return;
    }

    feedback.textContent = "Sending...";
    feedback.classList.remove("text-pink-300");
    feedback.classList.add("text-cyan-300");

    if (timeoutId) {
      window.clearTimeout(timeoutId);
    }

    timeoutId = window.setTimeout(() => {
      feedback.textContent = "Thanks for reaching out! I’ll get back to you soon.";
      form.reset();
    }, 900);
  });
}

function setupNotesFeed() {
  const notesSection = document.querySelector<HTMLElement>("[data-notes-fallback]");
  if (!notesSection) return;

  const listContainer = notesSection.querySelector<HTMLElement>("[data-notes-list]");
  const detailContainer = notesSection.querySelector<HTMLElement>("[data-notes-detail]");
  const loadMoreWrapper = notesSection.querySelector<HTMLElement>("[data-notes-load-more-wrapper]");
  const loadMoreButton = notesSection.querySelector<HTMLButtonElement>("[data-notes-load-more]");
  if (!listContainer || !detailContainer) return;

  const detailTitle = detailContainer.querySelector<HTMLElement>("[data-note-title]");
  const detailDate = detailContainer.querySelector<HTMLElement>("[data-note-date]");
  const detailTags = detailContainer.querySelector<HTMLElement>("[data-note-tags]");
  const detailContent = detailContainer.querySelector<HTMLElement>("[data-note-content]");
  const detailSource = detailContainer.querySelector<HTMLAnchorElement>("[data-note-source]");
  const backButton = detailContainer.querySelector<HTMLElement>("[data-note-back]");
  const expandButton = detailContainer.querySelector<HTMLElement>("[data-note-expand]");
  const collapseButton = detailContainer.querySelector<HTMLElement>("[data-note-collapse]");

  const repoOwner = notesSection.getAttribute("data-notes-repo-owner") ?? "";
  const repoName = notesSection.getAttribute("data-notes-repo-name") ?? "";
  const branch = notesSection.getAttribute("data-notes-branch") ?? "main";
  const notesFolder = notesSection.getAttribute("data-notes-folder") ?? "notes";
  const fallbackEncoded = notesSection.getAttribute("data-notes-fallback") ?? "";
  const initialCountAttr = notesSection.getAttribute("data-notes-initial-count");
  const initialVisibleCount = initialCountAttr ? Math.max(1, Number(initialCountAttr)) : 3;
  const hasRepoConfig = Boolean(repoOwner && repoName);
  const folderPath = notesFolder.replace(/^\/|\/$/g, "");

  type RawNote = {
    title?: string;
    summary?: string;
    published?: string;
    slug?: string;
    link?: string;
    tags?: string[];
    contentPath?: string;
    body?: string;
  };

  type NormalizedNote = RawNote & { slug: string; title: string };

  let fallback: unknown = [];
  try {
    fallback = JSON.parse(decodeURIComponent(fallbackEncoded));
  } catch {
    // ignore parse errors
  }

  const slugCounts = new Map<string, number>();
  const noteContentCache = new Map<string, string>();
  let notesDataset: NormalizedNote[] = [];
  let visibleCount = initialVisibleCount;
  let isExpanded = false;
  let nightlySyncHandle: number | null = null;

  const ensureUniqueSlug = (slug: string): string => {
    const base = slug || `note-${Date.now()}`;
    const current = slugCounts.get(base) ?? 0;
    slugCounts.set(base, current + 1);
    return current === 0 ? base : `${base}-${current}`;
  };

  const normalizeNotes = (notes: RawNote[]): NormalizedNote[] =>
    notes
      .map((note, index) => {
        const baseTitle =
          typeof note.title === "string" && note.title.trim().length
            ? note.title.trim()
            : `Note ${index + 1}`;
        const slug = ensureUniqueSlug(note.slug ?? slugify(baseTitle));
        return {
          ...note,
          title: baseTitle,
          slug
        };
      })
      .filter((note) => Boolean(note.slug));

  const parseNoteFile = (content: string): RawNote => {
    const [metaSection, ...bodyParts] = content.split(/\r?\n---\r?\n/);
    const headerLines = metaSection.split(/\r?\n/);
    const parsed: RawNote = {};

    headerLines.forEach((line) => {
      const trimmed = line.trim();
      if (trimmed.toLowerCase().startsWith("title:")) {
        parsed.title = trimmed.slice(6).trim();
      } else if (trimmed.toLowerCase().startsWith("tags:")) {
        parsed.tags = trimmed
          .slice(5)
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean);
      } else if (trimmed.toLowerCase().startsWith("summary:")) {
        parsed.summary = trimmed.slice(8).trim();
      }
    });

    const body = bodyParts.length ? bodyParts.join("\n---\n").trim() : metaSection.trim();
    parsed.body = body;
    return parsed;
  };

  const fetchNotesFromGithub = async (): Promise<RawNote[]> => {
    if (!hasRepoConfig) {
      throw new Error("Repository not configured");
    }

    const apiBase = `https://api.github.com/repos/${repoOwner}/${repoName}`;
    const encodedFolder = folderPath ? encodeURIComponent(folderPath) : "";
    const contentsUrl = folderPath
      ? `${apiBase}/contents/${encodedFolder}?ref=${branch}`
      : `${apiBase}/contents?ref=${branch}`;

    const contentsResponse = await fetch(contentsUrl, { cache: "no-store" });
    if (!contentsResponse.ok) {
      throw new Error("Unable to locate notes folder");
    }

    const files = (await contentsResponse.json()) as Array<{
      name: string;
      path: string;
      type: string;
    }>;

    const txtFiles = files.filter(
      (file) => file.type === "file" && file.name.toLowerCase().endsWith(".txt")
    );

    const entries = await Promise.all(
      txtFiles.map(async (file) => {
        const filePath = file.path ?? (folderPath ? `${folderPath}/${file.name}` : file.name);
        const rawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branch}/${filePath}`;
        const [noteContent, commitInfo] = await Promise.all([
          fetch(rawUrl, { cache: "no-store" }).then((res) => {
            if (!res.ok) {
              throw new Error(`Unable to read ${file.name}`);
            }
            return res.text();
          }),
          fetch(`${apiBase}/commits?path=${encodeURIComponent(filePath)}&per_page=1`, {
            cache: "no-store"
          })
            .then((res) => (res.ok ? res.json() : []))
            .catch(() => [])
        ]);

        const parsed = parseNoteFile(noteContent);
        const published =
          (Array.isArray(commitInfo) && commitInfo[0]?.commit?.author?.date) ||
          new Date().toISOString();

        return {
          title: parsed.title ?? file.name.replace(/\.txt$/i, ""),
          summary: parsed.summary,
          tags: parsed.tags,
          slug: parsed.slug,
          link: rawUrl,
          contentPath: filePath,
          body: parsed.body,
          published
        };
      })
    );

    return entries.sort(
      (a, b) =>
        new Date(b.published ?? 0).getTime() - new Date(a.published ?? 0).getTime()
    );
  };

  const renderNotesList = () => {
    if (!notesDataset.length) {
      listContainer.innerHTML = `
        <div class="rounded-2xl border border-white/5 bg-white/5 p-6 text-sm text-slate-300">
          Nothing here yet. Drop .txt files into your GitHub \`${notesFolder}\` folder to see them auto-sync.
        </div>
      `;
      loadMoreWrapper?.classList.add("hidden");
      return;
    }

    const notesToShow = notesDataset.slice(0, visibleCount);

    listContainer.innerHTML = notesToShow
      .map((note) => {
        const published = note.published
          ? new Date(note.published).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
          : "";
        const tags = Array.isArray(note.tags)
          ? note.tags
              .map(
                (tag: string) =>
                  `<span class="pill !text-[0.6rem] tracking-[0.3em]">${tag}</span>`
              )
              .join("")
          : "";
        const summary =
          note.summary ??
          (note.body ? `${note.body.split(/\s+/).slice(0, 24).join(" ")}…` : "");
        return `
          <article class="rounded-2xl border border-white/5 bg-white/5 p-6 space-y-3">
            <p class="text-xs uppercase tracking-[0.3em] text-slate-400">${published}</p>
            <h3 class="text-xl font-semibold text-white">${note.title ?? "Untitled note"}</h3>
            <p class="text-sm text-slate-300">${summary}</p>
            <div class="flex flex-wrap gap-2">${tags}</div>
            <button type="button" data-note-link="${note.slug}" class="text-sm font-semibold text-cyan-300 hover:text-cyan-100">
              Read note →
            </button>
          </article>
        `;
      })
      .join("");

    listContainer.querySelectorAll<HTMLButtonElement>("[data-note-link]").forEach((button) => {
      button.addEventListener("click", () => {
        const slug = button.getAttribute("data-note-link");
        if (!slug) return;
        window.location.hash = `note/${slug}`;
      });
    });

    if (loadMoreWrapper && loadMoreButton) {
      loadMoreWrapper.classList.remove("hidden");
      if (visibleCount >= notesDataset.length) {
        loadMoreButton.disabled = true;
        loadMoreButton.textContent = "All notes visible";
        loadMoreButton.classList.add("opacity-50", "cursor-not-allowed");
      } else {
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = "Show older notes";
        loadMoreButton.classList.remove("opacity-50", "cursor-not-allowed");
      }
    }
  };

  const collapseDetail = (options: { preserveScroll?: boolean } = {}) => {
    isExpanded = false;
    listContainer.classList.remove("hidden");
    detailContainer.classList.remove("lg:col-span-2", "w-full", "min-h-[500px]", "max-w-none");
    expandButton?.classList.remove("hidden");
    collapseButton?.classList.add("hidden");
    if (!options.preserveScroll) {
      detailContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const expandDetail = () => {
    if (isExpanded) return;
    isExpanded = true;
    listContainer.classList.add("hidden");
    detailContainer.classList.add("lg:col-span-2", "w-full", "min-h-[500px]", "max-w-none");
    expandButton?.classList.add("hidden");
    collapseButton?.classList.remove("hidden");
    detailContainer.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showDetail = () => {
    detailContainer.classList.remove("hidden");
    detailContainer.classList.add("flex");
    if (!isExpanded) {
      collapseDetail({ preserveScroll: true });
    }
  };

  const hideDetail = () => {
    collapseDetail({ preserveScroll: true });
    detailContainer.classList.add("hidden");
    detailContainer.classList.remove("flex");
    detailTitle && (detailTitle.textContent = "");
    detailDate && (detailDate.textContent = "");
    detailTags && (detailTags.innerHTML = "");
    if (detailContent) {
      detailContent.textContent = "Select any article to read it here.";
    }
  };

  const applyHashState = () => {
    const slug = getSlugFromHash();
    if (slug) {
      openNote(slug, { scrollIntoView: false });
    } else {
      hideDetail();
    }
  };

  const openNote = (slug: string, options: { scrollIntoView?: boolean } = {}) => {
    const note = notesDataset.find((entry) => entry.slug === slug);
    if (!note || !detailContent) return;

    showDetail();

    if (options.scrollIntoView !== false) {
      detailContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (detailTitle) detailTitle.textContent = note.title ?? "Untitled note";
    if (detailDate) {
      detailDate.textContent = note.published
        ? new Date(note.published).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          })
        : "";
    }

    if (detailTags) {
      detailTags.innerHTML = Array.isArray(note.tags)
        ? note.tags
            .map((tag) => `<span class="pill !text-[0.6rem] tracking-[0.3em]">${tag}</span>`)
            .join("")
        : "";
    }

    if (note.link && detailSource) {
      detailSource.href = note.link;
    }

    if (note.body) {
      noteContentCache.set(slug, note.body);
    }

    if (noteContentCache.has(slug)) {
      detailContent.textContent = noteContentCache.get(slug) ?? "";
      return;
    }

    if (!note.link) {
      detailContent.textContent =
        "Unable to locate article content. Ensure each note has a `.txt` file in your GitHub repo.";
      return;
    }

    detailContent.textContent = "Loading article...";

    fetch(note.link, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to fetch note");
        }
        return response.text();
      })
      .then((markdown) => {
        noteContentCache.set(slug, markdown);
        detailContent.textContent = markdown;
      })
      .catch(() => {
        detailContent.textContent = "Unable to load this article right now. Try again later.";
      });
  };

  const getSlugFromHash = (): string | null => {
    const hash = window.location.hash;
    const match = hash.match(/^#note\/(.+)$/);
    return match ? decodeURIComponent(match[1]) : null;
  };

  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.hash = "notes";
    });
  }

  expandButton?.addEventListener("click", () => {
    expandDetail();
  });

  collapseButton?.addEventListener("click", () => {
    collapseDetail();
  });

  const hydrate = (notes: RawNote[]) => {
    slugCounts.clear();
    notesDataset = normalizeNotes(notes);
    notesDataset.forEach((note) => {
      if (note.body) {
        noteContentCache.set(note.slug, note.body);
      }
    });
    visibleCount = initialVisibleCount;
    renderNotesList();
    applyHashState();
  };

  const useFallback = () => {
    if (Array.isArray(fallback) && fallback.length) {
      hydrate(fallback as RawNote[]);
    } else {
      notesDataset = [];
      renderNotesList();
    }
  };

  const refreshFromRepo = (): Promise<void> => {
    if (!hasRepoConfig) {
      useFallback();
      return Promise.resolve();
    }
    return fetchNotesFromGithub()
      .then((notes) => {
        hydrate(notes);
      })
      .catch((error) => {
        console.error("Unable to sync notes from GitHub:", error);
        useFallback();
      });
  };

  const scheduleNextSync = () => {
    if (!hasRepoConfig) return;
    if (nightlySyncHandle) {
      window.clearTimeout(nightlySyncHandle);
    }
    const now = new Date();
    const next = new Date(now);
    next.setHours(24, 0, 0, 0);
    const delay = next.getTime() - now.getTime();
    nightlySyncHandle = window.setTimeout(() => {
      refreshFromRepo().finally(scheduleNextSync);
    }, delay);
  };

  if (hasRepoConfig) {
    refreshFromRepo().finally(scheduleNextSync);
  } else {
    useFallback();
  }

  window.addEventListener("hashchange", () => {
    const slug = getSlugFromHash();
    if (slug) {
      openNote(slug, { scrollIntoView: false });
    } else {
      hideDetail();
    }
  });

  loadMoreButton?.addEventListener("click", () => {
    if (!notesDataset.length) return;
    visibleCount = Math.min(notesDataset.length, visibleCount + initialVisibleCount);
    renderNotesList();
  });
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "") || `note-${Date.now()}`;
}

