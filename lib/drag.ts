import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type Bounds = { minX: number; maxX: number; minY: number; maxY: number };

type DragOptions = {
  bounds: () => Bounds;
  /** Called the moment a drag actually starts. */
  onGrab?: () => void;
  /** Called on a press-and-release without movement. */
  onTap?: () => void;
};

let zTop = 10;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Small pointer-events drag. Mouse/pen drag immediately; touch needs a ~150ms
 * press first, so a normal swipe always scrolls the page instead.
 */
export function makeDraggable(el: HTMLElement, o: DragOptions): () => void {
  let id = -1;
  let active = false;
  let moved = false;
  let timer = 0;
  let sx = 0, sy = 0, ox = 0, oy = 0;

  const activate = () => {
    active = true;
    o.onGrab?.();
    ox = Number(gsap.getProperty(el, "x"));
    oy = Number(gsap.getProperty(el, "y"));
    try { el.setPointerCapture(id); } catch { /* pointer already gone */ }
    el.classList.add("is-dragging");
    el.style.zIndex = String(++zTop);
    gsap.to(el, { scale: 1.03, duration: 0.15, overwrite: "auto" });
  };
  const reset = () => { active = false; id = -1; clearTimeout(timer); };

  const down = (e: PointerEvent) => {
    if (e.button !== 0 || id !== -1) return;
    if ((e.target as Element).closest("a, button")) return;
    id = e.pointerId;
    sx = e.clientX; sy = e.clientY; moved = false;
    if (e.pointerType === "touch") timer = window.setTimeout(activate, 150);
    else activate();
  };
  const move = (e: PointerEvent) => {
    if (e.pointerId !== id) return;
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (!active) {
      if (Math.hypot(dx, dy) > 8) reset(); // the finger is scrolling: let it
      return;
    }
    if (Math.hypot(dx, dy) > 4) moved = true;
    const b = o.bounds();
    gsap.set(el, { x: clamp(ox + dx, b.minX, b.maxX), y: clamp(oy + dy, b.minY, b.maxY) });
  };
  const up = (e: PointerEvent) => {
    if (e.pointerId !== id) return;
    const tapped = e.type === "pointerup" && !moved;
    if (active) {
      el.classList.remove("is-dragging");
      gsap.to(el, { scale: 1, duration: 0.25, ease: "power2.out" });
    }
    reset();
    if (tapped) o.onTap?.();
  };
  const touchMove = (e: TouchEvent) => { if (active) e.preventDefault(); };

  el.addEventListener("pointerdown", down);
  el.addEventListener("pointermove", move);
  el.addEventListener("pointerup", up);
  el.addEventListener("pointercancel", up);
  el.addEventListener("touchmove", touchMove, { passive: false });
  return () => {
    el.removeEventListener("pointerdown", down);
    el.removeEventListener("pointermove", move);
    el.removeEventListener("pointerup", up);
    el.removeEventListener("pointercancel", up);
    el.removeEventListener("touchmove", touchMove);
    el.classList.remove("is-dragging");
  };
}

/* ---------- experiments pile ---------- */

// Where each note lands, as fractions of the free space (deliberate, not random).
const SPOTS: [number, number][] = [
  [0.0, 0.16], [0.25, 0.62], [0.49, 0.04], [0.74, 0.52], [1.0, 0.08], [0.6, 0.95],
];
const ROT = [-3, 2.5, -1.5, 3.5, -2.5, 1.5];

export function initPile(): () => void {
  const pile = document.querySelector<HTMLElement>(".pile");
  const tidy = document.querySelector<HTMLButtonElement>("[data-tidy]");
  const dialog = document.querySelector<HTMLDialogElement>(".note-dialog");
  if (!pile) return () => {};
  const notes = [...pile.querySelectorAll<HTMLElement>(".note")];

  pile.classList.add("pile--live");
  if (tidy) tidy.hidden = false;

  const bounds = (n: HTMLElement): Bounds => ({
    minX: 0, maxX: Math.max(0, pile.clientWidth - n.offsetWidth),
    minY: 0, maxY: Math.max(0, pile.clientHeight - n.offsetHeight),
  });
  const spot = (n: HTMLElement, i: number) => {
    const b = bounds(n);
    const [fx, fy] = SPOTS[i % SPOTS.length];
    return { x: fx * b.maxX, y: fy * b.maxY, rotation: ROT[i % ROT.length] };
  };

  // Fan out from a stacked pile as the section scrolls in.
  let fan: gsap.core.Timeline | null = gsap.timeline({
    scrollTrigger: { trigger: pile, start: "top 85%", end: "top 25%", scrub: 0.6, invalidateOnRefresh: true },
  });
  notes.forEach((n, i) => {
    n.style.zIndex = String(i + 1);
    fan!.fromTo(
      n,
      {
        x: () => bounds(n).maxX / 2 + (i - notes.length / 2) * 6,
        y: () => bounds(n).maxY / 2 + i * 4,
        rotation: ROT[i % ROT.length] * 0.6,
      },
      { x: () => spot(n, i).x, y: () => spot(n, i).y, rotation: ROT[i % ROT.length], ease: "power1.out" },
      0,
    );
  });
  // Once someone touches the pile, it is theirs: stop the scroll from moving it.
  const release = () => {
    if (!fan) return;
    fan.scrollTrigger?.kill();
    fan.progress(1).kill();
    fan = null;
  };

  const open = (n: HTMLElement) => {
    if (!dialog) return;
    const body = dialog.querySelector(".note-dialog__body")!;
    body.replaceChildren(...[...n.children].map((c) => c.cloneNode(true)));
    body.querySelector("h3")?.setAttribute("id", "note-dialog-t");
    dialog.showModal();
  };

  const cleanups = notes.map((n) => {
    n.tabIndex = 0;
    n.setAttribute("aria-describedby", "pile-help");
    const key = (e: KeyboardEvent) => {
      if (e.target !== n) return;
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(n); return; }
      const step = e.shiftKey ? 64 : 16;
      const d = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] }[e.key];
      if (!d) return;
      e.preventDefault();
      release();
      const b = bounds(n);
      n.style.zIndex = String(++zTop);
      gsap.to(n, {
        x: clamp(Number(gsap.getProperty(n, "x")) + d[0], b.minX, b.maxX),
        y: clamp(Number(gsap.getProperty(n, "y")) + d[1], b.minY, b.maxY),
        duration: 0.15,
      });
    };
    n.addEventListener("keydown", key);
    const off = makeDraggable(n, { bounds: () => bounds(n), onGrab: release, onTap: () => open(n) });
    return () => { off(); n.removeEventListener("keydown", key); n.removeAttribute("tabindex"); };
  });

  const onTidy = () => {
    release();
    notes.forEach((n, i) => {
      n.style.zIndex = String(i + 1);
      gsap.to(n, { ...spot(n, i), scale: 1, duration: 0.6, ease: "power3.out" });
    });
  };
  tidy?.addEventListener("click", onTidy);
  ScrollTrigger.refresh();

  return () => {
    cleanups.forEach((f) => f());
    tidy?.removeEventListener("click", onTidy);
    fan?.scrollTrigger?.kill();
    fan?.kill();
    gsap.set(notes, { clearProps: "all" });
    pile.classList.remove("pile--live");
    if (tidy) tidy.hidden = true;
  };
}

/* ---------- stack tags: a tactile detail, nothing depends on it ---------- */

export function initTags(): () => void {
  const tags = [...document.querySelectorAll<HTMLElement>(".tag")];
  const offs = tags.map((t) => {
    t.classList.add("is-draggable");
    return makeDraggable(t, { bounds: () => ({ minX: -140, maxX: 140, minY: -70, maxY: 70 }) });
  });
  return () => {
    offs.forEach((f) => f());
    tags.forEach((t) => t.classList.remove("is-draggable"));
    gsap.set(tags, { clearProps: "transform,zIndex" });
  };
}
