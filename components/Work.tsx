import { chapters } from "@/data/content";
import { Chapter } from "./Chapter";

export function Work() {
  return (
    <section className="work" id="work" aria-labelledby="work-t">
      <h2 className="sr-only" id="work-t">
        Work
      </h2>
      {chapters.map((c) => (
        <Chapter key={c.id} c={c} total={chapters.length} />
      ))}
    </section>
  );
}
