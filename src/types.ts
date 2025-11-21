export type NavLink = {
  id: string;
  label: string;
};

export type HeroStat = {
  value: string;
  label: string;
  detail: string;
};

export type ExperienceInitiative = {
  title: string;
  summary: string;
  highlights: string[];
  stack: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  focus: string;
  summary: string;
  initiatives: ExperienceInitiative[];
};

export type Project = {
  title: string;
  period: string;
  description: string;
  highlights: string[];
  stack: string[];
  metrics: string;
  cover: string;
};

export type Education = {
  school: string;
  credential: string;
  timeline: string;
  detail: string;
};

export type SkillGroup = {
  title: string;
  detail: string;
  level: number;
  items: string[];
};

export type Achievement = {
  title: string;
  detail: string;
  date: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
};

export type NoteEntry = {
  title: string;
  summary: string;
  published: string;
  link?: string;
  slug?: string;
  contentPath?: string;
  tags?: string[];
};

