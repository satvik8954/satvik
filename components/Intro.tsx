import { intro } from "@/data/content";

export function Intro() {
  return (
    <section className="intro section" aria-label="About">
      <ul className="intro__facts">
        {intro.facts.map((f) => (
          <li key={f.what}>
            <span className="label">{f.when || " "}</span>
            <span>{f.what}</span>
          </li>
        ))}
      </ul>
      {/* Words are pre-split so the scroll reveal (step 2) can scrub them one by one. */}
      <p className="intro__statement">
        {intro.statement.split(" ").map((w, i) => (
          <span key={i} className="word">
            {w}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}
