import { premiereIllustration as p } from "@/data/content";

// Static markup is the finished edit. lib/diagrams.ts rewinds it and plays each
// command against the timeline as you scroll.
export function PremiereIllustration({ wide }: { wide?: boolean }) {
  return (
    <figure className={`visual${wide ? " visual--wide" : ""} diagram-wrap`}>
      <div className="visual__frame diagram prem" data-diagram="premiere">
        <ol className="prem__log" aria-label={p.label}>
          {p.commands.map((c, i) => (
            <li key={c} className="prem__cmd" data-step={i}>
              <span className="label">{String(i + 1).padStart(2, "0")}</span>
              <span>{c}</span>
            </li>
          ))}
        </ol>
        <div className="prem__timeline" aria-hidden="true">
          <div className="prem__ruler">
            {p.ruler.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="prem__track">
            <span className="prem__name label">V2</span>
            <div className="prem__lane">
              <div className="clip clip--broll" data-broll style={{ left: "28%", width: "22%" }}>{p.clips.broll}</div>
            </div>
          </div>
          <div className="prem__track">
            <span className="prem__name label">V1</span>
            <div className="prem__lane" data-lane>
              <div className="clip clip--video" style={{ left: 0, width: "45%" }}>{p.clips.interview}</div>
              <div className="prem__pause" data-pause style={{ left: "45%", width: "12%" }}>{p.clips.pause}</div>
              <div className="clip clip--video clip--join" data-shift style={{ left: "45%", width: "40%" }}>{p.clips.interview}</div>
              <span className="prem__cut" data-cut style={{ left: "45%" }} />
              <span className="prem__fx label" data-fx style={{ left: "45%" }}>{p.clips.fx}</span>
            </div>
          </div>
          <div className="prem__track">
            <span className="prem__name label">A1</span>
            <div className="prem__lane">
              <div className="clip clip--audio" style={{ left: 0, width: "45%" }} />
              <div className="clip clip--audio" data-shift style={{ left: "45%", width: "40%" }} />
            </div>
          </div>
          <span className="prem__playhead" data-playhead />
        </div>
        <div className="prem__export">
          <span className="label">{p.exportLabel}</span>
          <span className="prem__bar"><span className="prem__fill" data-fill /></span>
        </div>
      </div>
      <figcaption className="label diagram__caption">{p.caption}</figcaption>
    </figure>
  );
}
