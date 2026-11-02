import { hero } from "@/data/content";
import { T } from "./Text";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <h1 className="hero__name" id="hero-name">
        <span className="hero__first">{hero.first}</span>
        <span className="hero__last">
          <span className="thread-mark">{hero.last}</span>
        </span>
      </h1>
      <div className="hero__foot">
        <p className="hero__line">{hero.line}</p>
        <ul className="hero__label label">
          {hero.label.map((l) => (
            <li key={l}>
              <T>{l}</T>
            </li>
          ))}
        </ul>
        <p className="hero__hint label" aria-hidden="true">
          {hero.scrollHint}
        </p>
      </div>
    </section>
  );
}
