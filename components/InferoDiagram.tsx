import { inferoDiagram as d } from "@/data/content";

// Final state is the static markup (readable without JS). lib/diagrams.ts plays
// the journey backwards from it: spawn -> queue slot -> destination.
const QUEUE = 10;
const DROPPED = [3, 7]; // queue slots whose callers give up
const BATCH = Array.from({ length: QUEUE }, (_, i) => i).filter((i) => !DROPPED.includes(i));
const tag = (n: number) => `${d.token} ${String(n + 1).padStart(2, "0")}`;

export function InferoDiagram({ wide }: { wide?: boolean }) {
  return (
    <figure className={`visual${wide ? " visual--wide" : ""} diagram-wrap`}>
      <div className="visual__frame diagram infero" data-diagram="infero" role="img" aria-label={d.label}>
        <div className="dz infero__in">
          <p className="label">{d.zones.incoming}</p>
          <span className="infero__spawn" data-spawn />
        </div>
        <div className="dz infero__queue">
          <p className="label">{d.zones.queue}</p>
          <div className="infero__slots">
            {Array.from({ length: QUEUE }, (_, i) => (
              <span key={i} className="slot" data-slot={i} />
            ))}
          </div>
        </div>
        <div className="dz infero__batch">
          <p className="label">{d.zones.batch}</p>
          <div className="infero__grid">
            {BATCH.map((i) => (
              <span key={i} className="tok" data-from={i}>{tag(i)}</span>
            ))}
          </div>
        </div>
        <div className="dz infero__model" data-model>
          <p className="label">{d.zones.model}</p>
          <p className="infero__pass">{d.zones.modelText}</p>
        </div>
        <div className="dz infero__drop">
          <p className="label">{d.zones.dropped}</p>
          <div className="infero__row">
            {DROPPED.map((i) => (
              <span key={i} className="tok tok--dropped" data-from={i}>{tag(i)}</span>
            ))}
          </div>
        </div>
        <div className="dz infero__cache">
          <p className="label">{d.zones.cache}</p>
          <div className="infero__row">
            <span className="tok tok--cache" data-from="spawn">{tag(QUEUE)}</span>
          </div>
        </div>
      </div>
      <figcaption className="label diagram__caption">{d.caption}</figcaption>
    </figure>
  );
}
