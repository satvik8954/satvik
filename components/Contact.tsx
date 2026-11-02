import { contact } from "@/data/content";
import { SmartLink, T, isPlaceholder } from "./Text";

export function Contact() {
  return (
    <section className="contact section" id="contact" aria-labelledby="contact-t">
      <h2 className="contact__statement" id="contact-t">
        {contact.statement}
      </h2>
      <p className="contact__email">
        {isPlaceholder(contact.email) ? (
          <span className="thread-mark">
            <T>{contact.email}</T>
          </span>
        ) : (
          <a className="thread-mark" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        )}
      </p>
      <ul className="contact__links">
        {contact.links.map((l) => (
          <li key={l.label}>
            <SmartLink href={l.href}>{l.label}</SmartLink>
          </li>
        ))}
      </ul>
      <footer className="footer label">
        <T>{contact.footer}</T>
      </footer>
    </section>
  );
}
