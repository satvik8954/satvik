import type { Chapter as ChapterData } from "@/data/content";
import { SmartLink, T } from "./Text";

function Visual({ text, wide }: { text: string; wide?: boolean }) {
  // Visuals are placeholders until real GIFs/screenshots arrive in /public.
  return (
    <figure className={`visual${wide ? " visual--wide" : ""}`}>
      <div className="visual__frame" role="img" aria-label={`Placeholder: ${text}`}>
        <T>{text}</T>
      </div>
    </figure>
  );
}

function Details({ c }: { c: ChapterData }) {
  return (
    <>
      <dl className="rows">
        {c.rows.map((r) => (
          <div key={r.term} className="rows__row">
            <dt className="label">{r.term}</dt>
            <dd>
              <T>{r.text}</T>
            </dd>
          </div>
        ))}
      </dl>
      <ul className="stack" aria-label="Stack">
        {c.stack.map((s) => (
          <li key={s} className="tag">
            <T>{s}</T>
          </li>
        ))}
      </ul>
      {c.also && <p className="also">{c.also}</p>}
      {c.link && (
        <p className="chapter__link">
          <SmartLink href={c.link}>View {c.title} ↗</SmartLink>
        </p>
      )}
    </>
  );
}

export function Chapter({ c, total }: { c: ChapterData; total: number }) {
  const head = (
    <header className="chapter__head">
      <p className="label chapter__label">
        <span className="chapter__count">
          {c.number} / {String(total).padStart(2, "0")}
        </span>{" "}
        {c.label}
      </p>
      <h3 className="chapter__title" id={`${c.id}-t`}>{c.title}</h3>
    </header>
  );

  return (
    <article className={`chapter chapter--${c.layout}`} id={c.id} aria-labelledby={`${c.id}-t`}>
      <div className="chapter__rail" aria-hidden="true">
        <span className="chapter__num">{c.number}</span>
      </div>

      {c.layout === "split" && (
        <div className="chapter__body">
          <div className="chapter__text">
            {head}
            <p className="oneliner">{c.oneLiner}</p>
            <Details c={c} />
          </div>
          <Visual text={c.visual} />
        </div>
      )}

      {c.layout === "statement" && (
        <div className="chapter__body">
          {head}
          <p className="oneliner oneliner--big">{c.oneLiner}</p>
          <Visual text={c.visual} wide />
          <div className="chapter__cols">
            <Details c={c} />
          </div>
        </div>
      )}

      {c.layout === "bleed" && (
        <div className="chapter__body">
          {head}
          <p className="oneliner">{c.oneLiner}</p>
          <Visual text={c.visual} wide />
          <div className="chapter__cols">
            <Details c={c} />
          </div>
        </div>
      )}
    </article>
  );
}
