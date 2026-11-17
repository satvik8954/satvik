import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { initPile, initTags } from "./drag";
import { initThread } from "./thread";
import { initDiagrams } from "./diagrams";

/**
 * All scroll-driven motion. Everything here is enhancement: the page is
 * complete without it, and with prefers-reduced-motion only the static
 * thread is added. Only transform and opacity are animated.
 */
export function initMotion(): () => void {
  gsap.registerPlugin(ScrollTrigger);
  const root = document.documentElement;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    const offThread = initThread(true);
    return () => offThread();
  }

  root.classList.add("motion");

  /* smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync */
  const lenis = new Lenis({ lerp: 0.12 });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const onAnchor = (e: MouseEvent) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!a || a.classList.contains("skip")) return;
    const hash = a.getAttribute("href")!;
    const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
    if (target === null) return;
    e.preventDefault();
    lenis.scrollTo(target, { offset: -72 });
  };
  document.addEventListener("click", onAnchor);

  const mm = gsap.matchMedia();

  mm.add(
    { wide: "(min-width: 768px)", narrow: "(max-width: 767px)" },
    (ctx) => {
      const { wide } = ctx.conditions as { wide: boolean };

      /* 1. Hero: the giant name shrinks into the nav corner */
      const hero = document.querySelector<HTMLElement>(".hero")!;
      const name = document.querySelector<HTMLElement>(".hero__name")!;
      const navName = document.querySelector<HTMLElement>(".nav__name")!;
      const dist = () => hero.offsetHeight * 0.7;
      const nameTop = () => name.offsetTop + (name.offsetParent as HTMLElement).offsetTop;
      const nameLeft = () => name.offsetLeft + (name.offsetParent as HTMLElement).offsetLeft;

      gsap.set(navName, { autoAlpha: 0 });
      gsap.set(name, { transformOrigin: "0 0" });
      gsap
        .timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
        })
        .to(name, {
          scale: () => (navName.offsetHeight * 1.9) / name.offsetHeight,
          x: () => navName.getBoundingClientRect().left - nameLeft(),
          y: () => navName.getBoundingClientRect().top - nameTop() + dist(),
          ease: "none",
          duration: 1,
        })
        .to(".hero__foot", { autoAlpha: 0, y: -40, ease: "none", duration: 0.5 }, 0)
        .to(name, { autoAlpha: 0, duration: 0.12 }, 0.88)
        .to(navName, { autoAlpha: 1, duration: 0.12 }, 0.88);

      /* 2. Intro: words come up from soft to full ink as you read */
      gsap.fromTo(
        ".intro__statement .word",
        { opacity: 0.22 },
        {
          opacity: 1, stagger: 0.1, ease: "none",
          scrollTrigger: { trigger: ".intro__statement", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );

      /* 3. Chapters: the pinned number arrives, holds, and hands over to the next */
      if (wide) {
        gsap.utils.toArray<HTMLElement>(".chapter").forEach((c) => {
          const num = c.querySelector(".chapter__num");
          gsap.fromTo(num, { yPercent: 35, autoAlpha: 0 }, {
            yPercent: 0, autoAlpha: 1, ease: "none",
            scrollTrigger: { trigger: c, start: "top 85%", end: "top 45%", scrub: true },
          });
          gsap.to(num, {
            yPercent: -35, autoAlpha: 0, ease: "none", immediateRender: false,
            scrollTrigger: { trigger: c, start: "bottom 65%", end: "bottom 30%", scrub: true },
          });
        });
      }

      /* 4. Project visuals drift a little slower than the text */
      gsap.utils.toArray<HTMLElement>(".visual__frame").forEach((f) => {
        gsap.fromTo(f, { yPercent: 8 }, {
          yPercent: -8, ease: "none",
          scrollTrigger: { trigger: f.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      /* 4b. Diagrams standing in for project GIFs play with the scroll */
      initDiagrams();

      /* 5. Experiments pile + draggable tags (the pile is a scroll row on phones) */
      const offPile = wide ? initPile() : () => {};
      const offTags = initTags();

      return () => { offPile(); offTags(); };
    },
  );

  /* 6. The thread */
  const offThread = initThread(false);
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => {
    offThread();
    mm.revert();
    document.removeEventListener("click", onAnchor);
    gsap.ticker.remove(tick);
    lenis.destroy();
    root.classList.remove("motion");
  };
}
