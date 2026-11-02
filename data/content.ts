// All copy lives here, taken verbatim from CONTENT.md.
// Anything in [BRACKETS] is a placeholder and renders visibly as one.
// A link whose href is a placeholder string is rendered as a placeholder, never as a fake <a>.

export type Link = { label: string; href: string };

export type Chapter = {
  id: string;
  number: string;
  label: string;
  title: string;
  oneLiner: string;
  rows: { term: string; text: string }[];
  stack: string[];
  also?: string;
  visual: string;
  link?: string;
  layout: "split" | "statement" | "bleed";
};

export type Experiment = {
  title: string;
  text: string;
  year?: string;
  link?: string;
};

export const meta = {
  title: "Satvik Golla — AI/ML Engineer",
  description:
    "Satvik Golla builds AI systems — inference servers, ML pipelines and agents. CS student at KMIT, AI/ML intern at DrugParadigm.",
};

export const nav = {
  name: "Satvik Golla",
  links: [
    { label: "Work", href: "#work" },
    { label: "Experiments", href: "#experiments" },
    { label: "Now", href: "#now" },
    { label: "Contact", href: "#contact" },
  ] as Link[],
  resume: { label: "Résumé ↗", href: "[RESUME PDF LINK]" } as Link,
};

export const hero = {
  first: "Satvik",
  last: "Golla",
  line: "I build AI systems — from inference servers to agents that edit video.",
  label: [
    "AI/ML engineer",
    "KMIT Hyderabad",
    "[CURRENT STATUS — e.g. open to summer 2027 internships]",
  ],
  scrollHint: "scroll ↓",
};

export const intro = {
  statement:
    "I'm a computer science student who likes the parts of AI that sit under the hood: how models get served, how pipelines get built, how agents actually do things. I'm currently an AI/ML intern at DrugParadigm, and I spend my evenings building tools I want to exist.",
  facts: [
    { what: "B.Tech CSE (AI/ML specialisation), KMIT", when: "2024–2028" },
    { what: "AI/ML Intern, DrugParadigm", when: "Feb 2026–present" },
    { what: "Also: video editor for brands", when: "" },
  ],
};

export const chapters: Chapter[] = [
  {
    id: "excipick",
    number: "01",
    label: "DrugParadigm · AI/ML Internship · 2026",
    title: "ExciPick",
    oneLiner: "An ML pipeline that helps pick excipients for drug formulations.",
    rows: [
      {
        term: "Problem",
        text: "[1–2 sentences: what problem formulation scientists have, and why it's slow or expensive today]",
      },
      {
        term: "What I built",
        text: "[1–2 sentences: the pipeline — data, model, output]",
      },
      {
        term: "Result",
        text: "[one concrete number or outcome, e.g. accuracy, time saved, adoption]",
      },
    ],
    stack: ["[e.g. Python, scikit-learn, …]"],
    also: "This became the basis for Formisyn Labs, a startup pitch I'm part of.",
    visual: "[SCREENSHOT/DIAGRAM — keep anything confidential out]",
    link: "[LINK if public, otherwise omit]",
    layout: "split",
  },
  {
    id: "infero",
    number: "02",
    label: "Personal project · Systems",
    title: "Infero",
    oneLiner: "My own LLM inference server.",
    rows: [
      {
        term: "Problem",
        text: "[1–2 sentences: why build one instead of using an existing server]",
      },
      {
        term: "What I built",
        text: "[key features: batching, streaming, quantisation, API shape, …]",
      },
      {
        term: "Result",
        text: "[benchmark numbers: tokens/sec, latency, vs a baseline. Runs a 9B model on a Mac — confirm before using]",
      },
    ],
    stack: ["[e.g. Python / Rust / …]"],
    visual: "[GIF of a request streaming, or a benchmark chart]",
    link: "[GITHUB LINK]",
    layout: "statement",
  },
  {
    id: "premiere-bridge",
    number: "03",
    label: "Personal project · Agents & tooling",
    title: "Premiere Bridge",
    oneLiner: "An MCP server that lets AI agents control Adobe Premiere Pro.",
    rows: [
      {
        term: "How it works",
        text: "A Node MCP server talks to a UXP plugin inside Premiere over a local WebSocket, so an agent can cut, arrange and edit a timeline directly.",
      },
      {
        term: "Why",
        text: "I edit reels for clients and wanted an agent to handle the repetitive parts of the edit.",
      },
      {
        term: "Result",
        text: "[what it can do today / what it saves you / anything notable vs other Premiere MCPs]",
      },
    ],
    stack: ["Node.js", "MCP", "UXP", "WebSocket"],
    visual: "[GIF: an agent editing a timeline in Premiere]",
    link: "[GITHUB LINK]",
    layout: "bleed",
  },
];

export const experiments = {
  title: "Experiments",
  subline: "Hackathons, prototypes and things I built to find out. Drag them around.",
  tidy: "tidy up",
  // interface text (not in CONTENT.md): keyboard help for screen readers, dialog close
  keyboardHelp: "Arrow keys move this note. Enter opens it.",
  close: "Close",
  items: [
    {
      title: "Amazon ML Challenge 2026",
      text: 'Business entity resolution across three data sources, scored on macro F0.5. Team "notaislop". Result: [RANK / SCORE].',
      year: "2026",
      link: "[LINK]",
    },
    {
      title: "Hindsight Hackathon (Vectorize) 2026",
      text: "A creative-agency agent that remembers each client's past feedback and reviews new drafts against it. [RESULT]",
      year: "2026",
      link: "[LINK]",
    },
    {
      title: "Kavach — iQOO Hackathon 2026",
      text: "Prototype of an on-device scam shield for SMS and live calls.",
      year: "2026",
      link: "[LINK]",
    },
    {
      title: "Reel editing",
      text: "I edit Instagram reels for brands, which is how Premiere Bridge started.",
      link: "[LINK TO A FEW REELS — check with clients first]",
    },
    {
      title: "[ADD MORE]",
      text: "[ADD MORE: coursework, side projects, writing…]",
    },
  ] as Experiment[],
};

export const now = {
  label: "Currently building",
  title: "LinqUp",
  text: "A campus platform for KMIT students: a team finder for Project School, advice from seniors, and an Ask board. Launching soon at linqup.co.in.",
  link: { label: "Join the waitlist", href: "[WAITLIST LINK]" } as Link,
  also: "Also currently: [e.g. learning X, reading Y]",
};

export const contact = {
  statement: "Let's build something.",
  email: "[EMAIL]",
  links: [
    { label: "GitHub", href: "[LINK]" },
    { label: "LinkedIn", href: "[LINK]" },
    { label: "X/Twitter", href: "[LINK or omit]" },
    { label: "Résumé", href: "[RESUME PDF LINK]" },
  ] as Link[],
  footer: "© 2026 Satvik Golla · Hyderabad · Built with [STACK]",
};
