# Questions to fill the site

Answer under each **A:** line. Short answers are fine; I'll turn them into copy in your voice (plain, a little dry, no buzzwords). If something is confidential or you'd rather leave it off, write **skip** and I'll remove that line from the site instead of leaving a placeholder.

Anything you can't answer yet, leave blank. It stays as a visible placeholder.

> Pre-filled by Claude from what you've told me before. Lines marked **⟨you⟩** need your input; lines marked **(check)** are my best guess, so confirm or fix them.

---

## 1. Basics

**1.1** What's your current status line under the hero? (e.g. "open to summer 2027 internships", "not looking, but happy to talk", "looking for co-founders")
A: Not looking, but happy to talk.

**1.2** What email should people contact you at? (shown on the page)
A: g.satvikkumar89@gmail.com

**1.3** Links. Paste the full URLs, or write *skip*.
- GitHub (I assume https://github.com/satvik8954, so just confirm): https://github.com/satvik8954
- LinkedIn: https://linkedin.com/in/satvik-golla
- X/Twitter: ⟨you⟩ or skip
- Anything else? (Instagram for reels, Medium, Devpost…): ⟨you⟩ (an Instagram or reel showcase would back up the editing note)

A:

**1.4** Résumé: send me the PDF (or a link to it). Should it be the same PDF for the nav "Résumé ↗" and the contact section?
A: Yes, one PDF for both: Satvik_Golla_Resume.pdf (sent). Note: it shows your phone number. Fine for a résumé, but you may want a copy without it on a public site.

**1.5** Where will the site live? (Vercel default URL, a custom domain like satvikgolla.com, or linqup.co.in/satvik)
A: Vercel default URL for now (can add a domain later).

---

## 2. Chapter 01: ExciPick (DrugParadigm)

**2.1** What problem do formulation scientists have that ExciPick solves? Why is it slow or expensive today? (1–2 sentences, plain words)
A: A pill is the drug plus a set of helper ingredients (excipients), each with a job: binding it, helping it dissolve, keeping it stable. Picking them is mostly expert judgment plus trial and error. ExciPick looks at the drug and the dosage form and suggests which jobs are needed and which ingredients to try first. (check wording)

**2.2** What did you build? Walk me through it: what data goes in, what model(s), what comes out.
A: In: the drug's structure (SMILES) + dosage form. Stage 1 (I built this on my own): predicts which of 31 functional roles the formulation needs, using per-role XGBoost classifiers on RDKit descriptors and MoLFormer embeddings, plus pharmacopoeia-based dosage-form rules. Stage 2 (I contributed): a two-tower ranker that ranks excipients for each role from a 195-excipient vocabulary. Out: roles needed + a ranked shortlist of excipients per role. Also made the evaluation leak-free: API-disjoint split, thresholds tuned only on validation, 50+ ablations.

**2.3** What's one concrete result? (accuracy, time saved, how many formulations it's been used on, who uses it). If there's no number you're allowed to share, what's the best honest outcome?
A: No numbers on the site. Outcome line instead: "Turns weeks of trial and error into a ranked shortlist a scientist can start testing from." (check)

**2.4** Stack tags: which tools, libraries and languages? (e.g. Python, scikit-learn, RDKit, XGBoost, FastAPI…)
A: Python, XGBoost, RDKit, MoLFormer, PyTorch

**2.5** What can you show publicly? A diagram of the pipeline, a blurred screenshot, nothing? Anything DrugParadigm would object to?
A: A simple diagram anyone can follow, no technical detail and no data. Something like: "your drug" → "what jobs the ingredients need to do" → "best ingredients to try first".

**2.6** Is there a public link (paper, demo, Formisyn Labs page)? If not, I'll leave the link out.
A: ⟨you⟩

**2.7** Should Formisyn Labs get more than one line? (what it is, stage, your role)
A: skip

---

## 3. Chapter 02: Infero

**3.1** Is Infero the same project as your `llm-inference-server` repo on GitHub? If so, should the link point there?
A: Yes: https://github.com/satvik8954/llm-inference-server

**3.2** Why build your own inference server instead of using vLLM, llama.cpp, Ollama, etc.? (1–2 sentences)
A: ⟨you⟩ Draft from the résumé: it's not a model runtime. It's the serving layer around one: queueing, priority, batching and caching, built to learn what breaks under load. (check)

**3.3** Key features. Which of these are real today: batching, streaming, quantisation, KV-cache tricks, OpenAI-compatible API, anything else?
A: Real (per résumé): Redis-backed priority queue; dual-trigger dynamic batching (batch size or max wait), real batched forward passes up to 8; TTL-aware dispatch that drops abandoned requests; SHA-256 LRU response cache; Prometheus metrics. Streaming / quantisation / OpenAI-compatible API: ⟨you⟩

**3.4** Benchmarks. Give me the actual numbers and the setup:
- Model and size (the draft says "runs a 9B model on a Mac": true?): Site says 9B on a Mac. ⟨you: exact model name⟩
- Hardware: ⟨you: which Mac / chip / RAM⟩
- Tokens/sec and/or latency: ⟨you: 9B-on-Mac numbers. The résumé numbers (65–70 ms, 0% failure at 50 users) were measured on TinyLlama-1.1B on a GPU, so they can't be shown as 9B numbers⟩
- Compared to what baseline: ⟨you⟩ (the TTL fix, ~49% → 8.1% failure at 10 users, is a design result and can still be mentioned if it's model-independent)

A:

**3.5** Stack tags (Python / Rust / C++ / Metal / MLX…)?
A: Python, FastAPI, Redis, PyTorch/Transformers, Docker, Prometheus, Locust

**3.6** Visual: can you record a short GIF of a request streaming in a terminal or browser, or send a benchmark chart (or the numbers so I can make one)?
A: ⟨you⟩

---

## 4. Chapter 03: Premiere Bridge

**4.1** What can it do today? List the actual operations an agent can perform (cut, trim, insert clips, add captions, apply effects, export…).
A: (from the README) An agent can read the timeline, project items, sequences, markers and effects, and grab a frame as a PNG it can look at. It can import files and place, move, trim, split and remove clips. It can also speed-ramp and fit clips, set keyframes and audio levels, add or remove effects and transitions, set text in motion-graphics templates, add markers, create sequences, run pre-export checks, and export the sequence. Edits are undoable, and a batch call runs several steps at once. Architecture: Node MCP server ↔ local WebSocket ↔ UXP panel in Premiere Pro (Windows, Premiere 25.6+). Limitation: captions are mostly out of reach through Adobe's public API.

**4.2** What does it save you on a real reel edit? (time, number of manual steps, anything measurable)
A: ⟨you⟩ (you edit reels for clients like Leading Her Way, so a before/after time per reel would work)

**4.3** Is there anything notable compared with other Premiere MCP servers? (only if true)
A: ⟨you⟩ You've compared it against other Premiere MCPs on GitHub; one candidate is that it uses UXP rather than the older ExtendScript/CEP route. Only use that if it's true for the others.

**4.4** GitHub link? (I didn't see it among your repos; is it public?)
A: https://github.com/satvik8954/pr_mcp

**4.5** The showpiece GIF: can you screen-record an agent editing a timeline (10–20 s is ideal, no client footage you can't show)? I'll compress it for the web.
A: ⟨you⟩

---

## 5. Experiments (the draggable notes)

**5.1** Amazon ML Challenge 2026: final rank and/or score? Link (leaderboard, repo, write-up)?
A: Ranked 949. Team "notaislop"; business entity resolution across 3 data sources (macro F0.5). ⟨you: link, e.g. your LinkedIn post⟩

**5.2** Hindsight Hackathon (Vectorize) 2026: result (won, finalist, submitted)? Link (Devpost, repo, demo)?
A: Project: a creative-agency agent that remembers each client's past feedback and reviews new drafts against it. ⟨you: result + link⟩

**5.3** Kavach (iQOO Hackathon 2026): is https://github.com/satvik8954/kavach the right link? Any result or placement?
A: skip

**5.4** Reel editing: links to a few reels you're allowed to show (check with clients first), or a single Instagram profile?
A: ⟨you⟩ (ask Leading Her Way before linking her reels)

**5.5** I saw other repos on your GitHub. Should any of these become notes? For each, a yes/no and one line on what it is:
- RoundZero: ⟨you⟩
- BillGuard: ⟨you⟩
- pr_mcp: this is Premiere Bridge (Chapter 03), not a separate note
- pdf_chunker: ⟨you⟩
- Wemakedevs: ⟨you⟩
- Anything else: YES: JobPilot (async multi-agent LangGraph pipeline: job discovery, ATS scoring, resume tailoring; LangGraph, Playwright, FastAPI, PostgreSQL). YES: Social media manager, KMIT & K-Hub (grew the following from 300 → 1,000 in ~2 months). YES: reel editing (see 5.4). NO: Molecular Glue Classifier.

A:

---

## 6. Now: LinqUp

**6.1** Waitlist link? (or should the button just go to linqup.co.in?)
A: Button: "Visit linqup.co.in" → https://linqup.co.in. It's live, so no waitlist.

**6.2** Is "launching soon" still accurate? Any date or number worth showing (e.g. students signed up, KMIT batches)?
A: No, it's live. It launched as a verified, KMIT-only campus platform: teammate finder (for Project School teams), senior directory + Q&A, events calendar, club feed, resources library, marketplace, lost & found, and request-based contact sharing (no DMs). Built with Next.js, TypeScript, Supabase, Tailwind and Vercel. ⟨you: launch date, user count⟩

**6.3** "Also currently:" what are you learning or reading right now? (one line, or *skip*)
A: Working through a structured AI-engineering path over the next few months (courses + projects). (check: name the actual course)

---

## 7. Assets and finishing touches

**7.1** Favicon: a simple "SG" monogram or a red dot?
A: Red dot.

**7.2** Share image (the preview when someone posts your link): OK if I generate it from the site (your name in giant Montserrat on paper with the red thread)?
A: Yes (check). Montserrat fits your taste in type.

**7.3** Footer says "Built with [STACK]". OK to write "Built with Next.js, GSAP and Lenis"?
A: ⟨you: confirm that's what the site actually uses⟩

**7.4** Anything on the current page you want changed, cut or added?
A: ⟨you⟩
