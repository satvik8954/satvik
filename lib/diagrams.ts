import gsap from "gsap";

/**
 * Scroll-scrubbed diagrams that stand in for project GIFs. The static markup is
 * always the finished state; these timelines rewind it and play it back as the
 * reader scrolls (and in reverse when they scroll up). Transform/opacity only.
 * Call inside a gsap.matchMedia() context so everything reverts cleanly.
 */
export function initDiagrams() {
  document.querySelectorAll<HTMLElement>('[data-diagram="infero"]').forEach(infero);
  document.querySelectorAll<HTMLElement>('[data-diagram="premiere"]').forEach(premiere);
}

/* Infero: requests enter, wait in the queue, two get dropped, eight go out
   as one batch, and a repeat request is answered from the cache. */
function infero(f: HTMLElement) {
  const spawn = f.querySelector<HTMLElement>("[data-spawn]");
  const model = f.querySelector<HTMLElement>("[data-model]");
  if (!spawn || !model) return;
  const toks = [...f.querySelectorAll<HTMLElement>(".tok")];
  const slot = (i: string) => f.querySelector<HTMLElement>(`[data-slot="${i}"]`)!;
  // Offsets are layout-based (the frame is the offsetParent), so running transforms never skew them.
  const delta = (t: HTMLElement, target: HTMLElement) => ({
    x: () => target.offsetLeft - t.offsetLeft,
    y: () => target.offsetTop - t.offsetTop,
  });

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: { trigger: f, start: "top 80%", end: "bottom 30%", scrub: 0.5, invalidateOnRefresh: true },
  });

  const queued = toks
    .filter((t) => t.dataset.from !== "spawn")
    .sort((a, b) => Number(a.dataset.from) - Number(b.dataset.from));
  queued.forEach((t, i) => {
    const from = delta(t, spawn), to = delta(t, slot(t.dataset.from!));
    tl.fromTo(t, { x: from.x, y: from.y, autoAlpha: 0 }, { x: to.x, y: to.y, autoAlpha: 1, duration: 1 }, i * 0.3);
  });

  const dropped = queued.filter((t) => t.classList.contains("tok--dropped"));
  const batch = queued.filter((t) => !t.classList.contains("tok--dropped"));
  tl.to(dropped, { x: 0, y: 0, duration: 1, stagger: 0.2 }, 4.2);
  tl.to(batch, { x: 0, y: 0, duration: 1.2, stagger: 0.08 }, 5.6);
  tl.fromTo(model, { opacity: 0.35 }, { opacity: 1, duration: 0.6 }, 7.2);

  const cached = toks.find((t) => t.dataset.from === "spawn");
  if (cached) {
    const from = delta(cached, spawn);
    tl.fromTo(cached, { x: from.x, y: from.y, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, duration: 1.2 }, 7.6);
  }
}

/* Premiere Bridge: each agent command lights up and the timeline changes to match. */
function premiere(f: HTMLElement) {
  const one = (s: string) => f.querySelector<HTMLElement>(s);
  const lane = one("[data-lane]");
  if (!lane) return;
  const cmds = [...f.querySelectorAll<HTMLElement>(".prem__cmd")];
  const shift = [...f.querySelectorAll<HTMLElement>("[data-shift]")];

  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    scrollTrigger: { trigger: f, start: "top 75%", end: "bottom 40%", scrub: 0.5, invalidateOnRefresh: true },
  });
  const step = (i: number) => {
    if (cmds[i]) tl.fromTo(cmds[i], { opacity: 0.3 }, { opacity: 1, duration: 0.4 }, i);
  };

  tl.fromTo(one("[data-playhead]"), { x: 0 }, { x: () => lane.offsetWidth * 0.95, ease: "none", duration: 5 }, 0);

  // 1. split at 00:09
  step(0);
  tl.fromTo(one("[data-cut]"), { autoAlpha: 0, scaleY: 0 }, { autoAlpha: 1, scaleY: 1, duration: 0.6 }, 0.2);
  // 2. remove the pause and close the gap (the later clip is 40% wide, the pause 12%: 30% of itself)
  step(1);
  tl.fromTo(one("[data-pause]"), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.5 }, 1.1);
  tl.fromTo(shift, { xPercent: 30 }, { xPercent: 0, duration: 0.7 }, 1.3);
  // 3. B-roll lands on V2
  step(2);
  tl.fromTo(one("[data-broll]"), { yPercent: -140, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8 }, 2.1);
  // 4. cross dissolve replaces the raw cut
  step(3);
  tl.to(one("[data-cut]"), { autoAlpha: 0, duration: 0.3 }, 3.1);
  tl.fromTo(one("[data-fx]"), { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.5 }, 3.2);
  // 5. export
  step(4);
  tl.fromTo(one("[data-fill]"), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "none" }, 4.1);
}
