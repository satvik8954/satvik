import { experiments } from "@/data/content";
import { SmartLink, T } from "./Text";

export function Experiments() {
  return (
    <section className="experiments section" id="experiments" aria-labelledby="exp-t">
      <div className="experiments__head">
        <h2 className="h1" id="exp-t">
          {experiments.title}
        </h2>
        <p className="experiments__sub">{experiments.subline}</p>
      </div>
      {/* Static, tidy grid. Step 3 turns this into the draggable pile. */}
      <ul className="pile">
        {experiments.items.map((e) => (
          <li key={e.title} className="note">
            <h3 className="note__title">
              <T>{e.title}</T>
            </h3>
            <p className="note__text">
              <T>{e.text}</T>
            </p>
            <p className="note__meta label">
              {e.year && <span>{e.year}</span>}
              {e.link && <SmartLink href={e.link}>Open ↗</SmartLink>}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
