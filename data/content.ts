// All copy lives here: CONTENT.md, updated with the answers in QUESTIONS.md.
// Anything in [BRACKETS] is a placeholder and renders visibly as one.
// A link whose href is a placeholder string is rendered as a placeholder, never as a fake <a>.

export type Link = { label: string; href: string };

/** A project visual: a placeholder until real media exists, or a simple typographic diagram. */
export type Visual =
  | { kind: "placeholder"; text: string }
  | { kind: "steps"; label: string; steps: string[] };

export type Chapter = {
  id: string;
  number: string;
  label: string;
  title: string;
  oneLiner: string;
  rows: { term: string; text: string }[];
  stack: string[];
  also?: string;
  visual: Visual;
  link?: string;
  linkLabel?: string;
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

const RESUME = "[RESUME PDF LINK]";

export const nav = {
  name: "Satvik Golla",
  links: [
    { label: "Work", href: "#work" },
    { label: "Experiments", href: "#experiments" },
    { label: "Now", href: "#now" },
    { label: "Contact", href: "#contact" },
  ] as Link[],
  resume: { label: "Résumé ↗", href: RESUME } as Link,
};

export const hero = {
  first: "Satvik",
  last: "Golla",
  line: "I build AI systems — from inference servers to agents that edit video.",
  label: ["AI/ML engineer", "KMIT Hyderabad", "Not looking, but happy to talk"],
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
        text: "A tablet is the drug plus a few helper ingredients, called excipients. Each one has a job: binding the tablet, helping it dissolve, keeping it stable. Picking them is mostly expert judgment plus trial and error.",
      },
      {
        term: "What I built",
        text: "You give it the drug's structure and the dosage form. First it predicts which of 31 jobs the formulation needs. I built that stage on my own: one XGBoost classifier per job, on RDKit descriptors and MoLFormer embeddings, plus rules from the pharmacopoeia. Then a two-tower ranker, which I contributed to, shortlists excipients for each job from a vocabulary of 195. I also made the evaluation leak-free: no drug appears in both training and test, thresholds are tuned on validation only, and it's backed by 50+ ablations.",
      },
      {
        term: "Result",
        text: "Turns weeks of trial and error into a ranked shortlist a scientist can start testing from.",
      },
    ],
    stack: ["Python", "XGBoost", "RDKit", "MoLFormer", "PyTorch"],
    also: "This became the basis for Formisyn Labs, a startup pitch I'm part of.",
    visual: {
      kind: "steps",
      label: "How ExciPick works",
      steps: ["Your drug", "What jobs the ingredients need to do", "Best ingredients to try first"],
    },
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
        term: "Why",
        text: "It isn't a model runtime. It's the serving layer around one: queueing, priority, batching and caching. I built it to find out what breaks under load.",
      },
      {
        term: "What I built",
        text: "A Redis-backed priority queue. Dynamic batching that fires on batch size or max wait, with real batched forward passes of up to 8 requests. Dispatch that drops requests whose callers have already given up. A SHA-256 LRU response cache, and Prometheus metrics for all of it.",
      },
      {
        term: "Result",
        text: "Dropping abandoned requests cut failures at 10 concurrent users from about 49% to 8.1%. With TinyLlama-1.1B on a GPU it holds 65–70 ms latency with no failures at 50 users.",
      },
    ],
    stack: ["Python", "FastAPI", "Redis", "PyTorch", "Transformers", "Docker", "Prometheus", "Locust"],
    visual: { kind: "placeholder", text: "[GIF of a request streaming, or a benchmark chart]" },
    link: "https://github.com/satvik8954/llm-inference-server",
    linkLabel: "Infero on GitHub ↗",
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
        text: "A Node MCP server talks to a UXP plugin inside Premiere over a local WebSocket, so an agent can cut, arrange and edit a timeline directly. Windows, Premiere Pro 25.6 and later.",
      },
      {
        term: "Why",
        text: "I edit reels for clients and wanted an agent to handle the repetitive parts of the edit.",
      },
      {
        term: "What it can do",
        text: "Read the timeline, project and effects, and grab a frame to look at. Import, place, move, trim, split and remove clips. Speed-ramp, keyframe, set audio levels, add effects and transitions, fill in text templates, add markers, check and export. Every edit can be undone, and one call can batch several steps. Captions are mostly out of reach through Adobe's public API.",
      },
      {
        term: "Result",
        text: "[what it saves you on a real reel edit, e.g. time per reel before and after]",
      },
    ],
    stack: ["Node.js", "MCP", "UXP", "WebSocket"],
    visual: { kind: "placeholder", text: "[GIF: an agent editing a timeline in Premiere]" },
    link: "https://github.com/satvik8954/pr_mcp",
    linkLabel: "Premiere Bridge on GitHub ↗",
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
      text: 'Business entity resolution across three data sources, scored on macro F0.5. Team "notaislop", ranked 949.',
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
      title: "JobPilot",
      text: "An async multi-agent pipeline that finds jobs, scores them like an ATS would and tailors the résumé for each one. LangGraph, Playwright, FastAPI, PostgreSQL.",
    },
    {
      title: "Kavach — iQOO Hackathon 2026",
      text: "Prototype of an on-device scam shield for SMS and live calls.",
      year: "2026",
    },
    {
      title: "Social media, KMIT & K-Hub",
      text: "Ran the accounts and grew the following from 300 to 1,000 in about two months.",
    },
    {
      title: "Reel editing",
      text: "I edit Instagram reels for brands, which is how Premiere Bridge started.",
      link: "[LINK TO A FEW REELS — check with clients first]",
    },
  ] as Experiment[],
};

export const now = {
  label: "Currently building",
  title: "LinqUp",
  text: "A verified, KMIT-only campus platform. It has a teammate finder for Project School, a senior directory with Q&A, events, club feeds, a resources library, a marketplace, lost and found, and contact sharing by request instead of DMs. It's live.",
  link: { label: "Visit linqup.co.in ↗", href: "https://linqup.co.in" } as Link,
  also: "Also currently: working through a structured AI-engineering path of courses and projects.",
};

export const contact = {
  statement: "Let's build something.",
  email: "g.satvikkumar89@gmail.com",
  links: [
    { label: "GitHub", href: "https://github.com/satvik8954" },
    { label: "LinkedIn", href: "https://linkedin.com/in/satvik-golla" },
    { label: "X/Twitter", href: "[LINK or omit]" },
    { label: "Résumé", href: RESUME },
  ] as Link[],
  footer: "© 2026 Satvik Golla · Hyderabad · Built with Next.js, GSAP and Lenis",
};
