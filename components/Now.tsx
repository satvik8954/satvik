import { now } from "@/data/content";
import { SmartLink, T } from "./Text";

export function Now() {
  return (
    <section className="now section" id="now" aria-labelledby="now-t">
      <p className="label now__label">{now.label}</p>
      <div className="now__body">
        <h2 className="h1" id="now-t">
          {now.title}
        </h2>
        <p className="now__text">{now.text}</p>
        <p>
          <SmartLink href={now.link.href} className="link">
            {now.link.label}
          </SmartLink>
        </p>
        <p className="now__also">
          <T>{now.also}</T>
        </p>
      </div>
    </section>
  );
}
