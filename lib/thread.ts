import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * The thread: one 2px accent line that underlines the hero name, weaves past
 * each chapter number, and ends underlining the email. Its tip follows the
 * reader down the page. With reduced motion it is drawn in full, static.
 */

const NS = "http://www.w3.org/2000/svg";
type Pt = { x: number; y: number };

// Document position from layout offsets, so running transforms don't skew it.
function docPos(el: HTMLElement) {
  let x = 0, y = 0;
  let n: HTMLElement | null = el;
  while (n) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}
const q = <T extends HTMLElement = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);

export function initThread(reduce: boolean): () => void {
  const main = q("main");
  const heroMark = q(".hero__last .thread-mark");
  const mailMark = q(".contact__email .thread-mark");
  if (!main || !heroMark || !mailMark) return () => {};

  const svg = document.createElementNS(NS, "svg");
  svg.classList.add("thread");
  svg.setAttribute("aria-hidden", "true");
  const path = document.createElementNS(NS, "path");
  svg.append(path);
  main.append(svg);
  document.documentElement.classList.add("has-thread");

  let total = 0, minLen = 0, endY = 0;
  let samples: { l: number; y: number }[] = [];

  const build = () => {
    const m = docPos(main);
    const W = document.documentElement.clientWidth;
    const H = main.scrollHeight;
    svg.setAttribute("width", String(W));
    svg.setAttribute("height", String(H));
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

    const P = (x: number, y: number): Pt => ({ x: x - m.x, y: y - m.y });
    const gutter = parseFloat(getComputedStyle(q(".hero")!).paddingLeft) || 16;
    const gx = Math.max(6, gutter / 2);
    const wide = W >= 768;

    const u = docPos(heroMark);
    const u0 = P(u.x, u.y + u.h), u1 = P(u.x + u.w, u.y + u.h);
    const e = docPos(mailMark);
    const e0 = P(e.x, e.y + e.h + 2), e1 = P(e.x + e.w, e.y + e.h + 2);

    const pts: Pt[] = [P(gx, docPos(q(".intro")!).y)];
    document.querySelectorAll<HTMLElement>(".chapter").forEach((c) => {
      const rail = q(".chapter__rail", c)!, num = q(".chapter__num", c)!;
      const r = docPos(rail);
      if (wide) {
        // swing out past the number, then back to the margin
        pts.push(P(gx, r.y - 40));
        pts.push(P(r.x + num.offsetWidth + 32, r.y + num.offsetHeight * 0.55));
        pts.push(P(gx, r.y + num.offsetHeight + 220));
      } else {
        pts.push(P(gx, r.y));
      }
    });
    for (const s of [".experiments", ".now", ".contact"]) pts.push(P(gx, docPos(q(s)!).y));

    let d = `M ${u0.x} ${u0.y} H ${u1.x}`;
    let prev = u1;
    pts.forEach((p, i) => {
      const dy = p.y - prev.y;
      const c1 = i === 0 ? { x: Math.min(prev.x + 80, W - 2), y: prev.y } : { x: prev.x, y: prev.y + dy * 0.5 };
      d += ` C ${c1.x} ${c1.y}, ${p.x} ${p.y - dy * 0.5}, ${p.x} ${p.y}`;
      prev = p;
    });
    const dy = e0.y - prev.y;
    d += ` C ${prev.x} ${prev.y + dy * 0.6}, ${Math.max(0, e0.x - 140)} ${e0.y}, ${e0.x} ${e0.y} H ${e1.x}`;
    path.setAttribute("d", d);

    total = path.getTotalLength();
    minLen = u1.x - u0.x; // the hero underline is always drawn
    endY = e0.y;
    path.style.strokeDasharray = `${total} ${total}`;
    samples = [];
    const N = 600;
    for (let i = 0; i <= N; i++) {
      const l = (total * i) / N;
      samples.push({ l, y: path.getPointAtLength(l).y });
    }
    update();
  };

  const update = () => {
    if (reduce) { path.style.strokeDashoffset = "0"; return; }
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const p = Math.min(1, scrollY / max);
    // the tip rides ~60% down the screen, catching up with the email at the very end
    const tipY = scrollY + innerHeight * (0.6 + 0.4 * p ** 3);
    let l = minLen;
    if (tipY >= endY) l = total;
    else for (const s of samples) { if (s.y > tipY) break; l = Math.max(l, s.l); }
    path.style.strokeDashoffset = String(total - l);
  };

  let raf = 0;
  const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
  const onResize = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(build); };

  build();
  document.fonts?.ready.then(build);
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onResize);
  ScrollTrigger.addEventListener("refresh", build);

  return () => {
    removeEventListener("scroll", onScroll);
    removeEventListener("resize", onResize);
    ScrollTrigger.removeEventListener("refresh", build);
    svg.remove();
    document.documentElement.classList.remove("has-thread");
  };
}
