import type {
  Achievement,
  ContactChannel,
  Education,
  Experience,
  HeroStat,
  NavLink,
  NoteEntry,
  Project,
  SkillGroup
} from "./types";

export const navLinks: NavLink[] = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Highlights" },
  { id: "notes", label: "Notes" },
  { id: "contact", label: "Contact" }
];

export const heroHighlights: string[] = [
  "Cloud-native software engineer building resilient, multi-cloud services.",
  "Bridging AI research with production systems for healthcare and ML ops.",
  "Community-first leader who loves mentoring and architecting clean solutions."
];

export const rotatingPhrases: string[] = [
  "Cloud/AI Engineer",
  "Full-stack Engineer",
  "AI/ML Practitioner",
];

export const heroStats: HeroStat[] = [
  { value: "12+", label: "Cloud deployments", detail: "Cloud Run · Batch · Pub/Sub" },
  { value: "4", label: "AI/ML platforms", detail: "Longformer · LSTM · NLP" },
  { value: "3+", label: "Leadership roles", detail: "IITGN communities & events" }
];

export const profilePicture: string = "/myprofilephoto.jpeg";

export const experiences: Experience[] = [
  {
    company: "Searce Inc.",
    role: "Software Engineer",
    period: "Jul 2024 – Present",
    location: "Bengaluru, India",
    focus: "Cloud & AI Platforms",
    summary:
      "Owning end-to-end delivery for multi-cloud microservices and AI-enabled healthcare platforms. I collaborate with distributed teams to refactor critical workloads, modernize infrastructure, and ship impactful features.",
    initiatives: [
      {
        title: "Netcore Migration Program",
        summary: "Led the migration of prebuilt Go and Python services to a cloud-agnostic foundation that scales across AWS and GCP.",
        highlights: [
          "Refactored microservices into interface-driven modules to unlock runtime cloud selection and boost reliability.",
          "Engineered a multi-cloud release strategy leveraging Cloud Run, Cloud Batch, Pub/Sub, and AWS equivalents, improving deployment flexibility.",
          "Embedded performance-first observability that reduced regression debugging time by 35%."
        ],
        stack: ["Go", "Python", "Cloud Run", "Cloud Batch", "Pub/Sub", "AWS"]
      },
      {
        title: "Medical Imaging Platform · NOVAI",
        summary: "Designed a full-stack diagnostic workflow that fuses Django services with NOVAI's AI engine for DICOM intelligence.",
        highlights: [
          "Implemented secure authentication, REST APIs, and storage pipelines backed by Django, MySQL, and Google Cloud Storage.",
          "Integrated AWS SNS for real-time AI inference triggers on medical imagery, enabling instant clinician feedback.",
          "Containerized and deployed the solution on Cloud Run for cost-efficient elasticity and simplified ops."
        ],
        stack: ["Django", "MySQL", "Google Cloud Storage", "AWS SNS", "Docker"]
      }
    ]
  }
];

export const projects: Project[] = [
  {
    title: "Dataset Generation & AI-Text Detection",
    period: "Jan – May 2024",
    description:
      "Research-heavy system that produces synthetic corpora from 24k prompts, trains a Longformer model, and exposes a web experience for PDF/ZIP evaluations.",
    highlights: [
      "Automated response generation using multiple LLMs, yielding a balanced dataset for classification.",
      "Fine-tuned Longformer to discriminate AI vs human paragraphs with actionable confidence scoring.",
      "Built an upload pipeline that normalizes PDFs & archives before streaming inference results back to users.",
      "Designed explainable unigram, bigram, trigram, and quadgram language models to benchmark classical NLP against LLM signals."
    ],
    stack: ["Python", "Longformer", "FastAPI", "PostgreSQL", "TailwindCSS"],
    metrics: "Detected AI text across 15K+ documents with >92% F1 score.",
    cover: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Classical Language Modeling Suite",
    period: "2024",
    description:
      "Lightweight NLP toolkit that complements AI-text detection by training n-gram models for authorship analysis, content scoring, and dataset QA.",
    highlights: [
      "Implemented unigram through quadgram models with add-k smoothing and perplexity scoring to analyze stylistic drift.",
      "Automated dataset cleansing and token statistics so researchers can rapidly compare AI vs human phrasing.",
      "Packaged the toolkit with reusable notebooks and dashboards to inform downstream classifiers."
    ],
    stack: ["Python", "NLTK", "NumPy", "Pandas", "Matplotlib"],
    metrics: "Enabled rapid diagnostics across 24K+ generated samples.",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "State of Health Estimation · Li-ion Batteries",
    period: "Aug – Dec 2023",
    description:
      "ML workflow that consumes NASA battery datasets, models voltage behavior, and predicts SoH through interpretable regressors and LSTMs.",
    highlights: [
      "Curated and labeled NASA reference-discharge datasets to capture nuanced degradation patterns.",
      "Experimented with multi-model regression and temporal LSTM approaches to minimize MSE.",
      "Visualized voltage trends to help researchers understand drift and lifecycle implications."
    ],
    stack: ["Python", "TensorFlow", "Pandas", "Matplotlib", "Docker"],
    metrics: "Achieved <3% MSE variance across unseen discharge cycles.",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
  }
];

export const education: Education[] = [
  {
    school: "Indian Institute of Technology, Gandhinagar",
    credential: "B.Tech in Electrical Engineering · Minor in CSE",
    timeline: "2020 – May 2024",
    detail: "CPI 7.7 · Focus on ML, NLP, Data Structures, Probability, and Computer Architecture."
  },
  {
    school: "Lohia Jagdev Inter College, Nuaon, Kaimur",
    credential: "Senior Secondary · BSEB Board",
    timeline: "2017 – 2019",
    detail: "District topper with 90.6%."
  },
  {
    school: "Children’s Garden School, Bhabua",
    credential: "Secondary School · CBSE Board",
    timeline: "2016 – 2017",
    detail: "CGPA 10 with focus on science & mathematics."
  }
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming & AI",
    detail: "Python (scikit-learn, TensorFlow, PyTorch, NLTK, NumPy, Pandas, Matplotlib, OpenCV, Seaborn), JavaScript/TypeScript, Golang, C/C++, Dart",
    level: 92,
    items: ["ML + NLP systems", "Data visualization", "Algorithm design"]
  },
  {
    title: "Web & App Engineering",
    detail: "Node.js, Django, Flask, React, Flutter, Express, HTML/CSS/Tailwind, MySQL, MongoDB",
    level: 88,
    items: ["Full-stack architecture", "API & auth design", "Cross-platform apps"]
  },
  {
    title: "Cloud & DevOps",
    detail: "Google Cloud (Cloud Run, Cloud Batch, Pub/Sub, Storage), AWS (SNS, S3), Docker, Kubernetes, GitHub/GitLab, CI/CD",
    level: 85,
    items: ["Multi-cloud releases", "Observability", "Containerization"]
  },
  {
    title: "Coursework & Foundations",
    detail: "Machine Learning, NLP, Data Structures & Algorithms, Probability, Linear Algebra, Computer Architecture, Discrete Mathematics",
    level: 80,
    items: ["Research collaboration", "Academic rigor", "Mentorship"]
  }
];

export const achievements: Achievement[] = [
  {
    title: "Google Cloud Digital Leader",
    detail: "Earned certification validating core GCP architecture and governance knowledge.",
    date: "2024"
  },
  {
    title: "District Topper · Kaimur, Bihar",
    detail: "Secured 1st position in Senior Secondary Examination (BSEB - 2019).",
    date: "2019"
  },
  {
    title: "Technical Development · Green Club IITGN",
    detail: "Built sustainability-focused web tools and mentored junior contributors.",
    date: "2022 – 2024"
  },
  {
    title: "Sports & Social Impact Leader",
    detail: "Coordinated CCL-2022, Hallabol-2023, and volunteered at Sanjeevani medical camp.",
    date: "Ongoing"
  }
];

export const contactChannels: ContactChannel[] = [
  {
    label: "Email",
    value: "sandeep.patel@iitgn.ac.in",
    href: "mailto:sandeep.patel@iitgn.ac.in"
  },
  {
    label: "Phone",
    value: "+91 73806 32939",
    href: "tel:+917380632939"
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sandeep-patel-508503203",
    href: "https://www.linkedin.com/in/sandeep-patel-508503203"
  },
  {
    label: "GitHub",
    value: "github.com/ssandypatel",
    href: "https://github.com/ssandypatel"
  }
];

export const notesConfig: {
  repoOwner: string;
  repoName: string;
  branch: string;
  notesFolder: string;
  fallback: NoteEntry[];
} = {
  repoOwner: "ssandypatel",
  repoName: "articles",
  branch: "main",
  notesFolder: "notes",
  fallback: []
};

