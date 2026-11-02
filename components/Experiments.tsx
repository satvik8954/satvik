import { experiments } from "@/data/content";
import { SmartLink, T } from "./Text";

export function Experiments() {
  return (
    <section className="experiments section" id="experiments" aria-labelledby="exp-t">
      <div className="experiments__head">
        <h2 className="h1" id="exp-t">
          {experiments.title}
        </h2>
        <div className="experiments__side">
          <p className="experiments__sub">{experiments.subline}</p>
          <button type="button" className="button label" data-tidy hidden>
            {experiments.tidy}
          </button>
        </div>
      </div>
      <p className="sr-only" id="pile-help">
        {experiments.keyboardHelp}
      </p>
      {/* Static, tidy grid without JS; lib/drag.ts turns it into the draggable pile. */}
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
      <dialog className="note-dialog" aria-labelledby="note-dialog-t">
        <div className="note-dialog__body" />
        <form method="dialog">
          <button className="button label">{experiments.close}</button>
        </form>
      </dialog>
    </section>
  );
}
