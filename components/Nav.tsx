import { nav } from "@/data/content";
import { SmartLink } from "./Text";

export function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav__name">
        {nav.name}
      </a>
      <nav aria-label="Sections">
        <ul className="nav__links">
          {nav.links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
          <li>
            <SmartLink href={nav.resume.href}>{nav.resume.label}</SmartLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
