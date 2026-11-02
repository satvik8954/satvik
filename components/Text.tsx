import type { ReactNode } from "react";

const PLACEHOLDER = /(\[[^\]]+\])/g;

export const isPlaceholder = (s?: string) => !!s && /^\[[^\]]+\]$/.test(s.trim());

/** Renders copy, wrapping any [PLACEHOLDER] so it stays visibly unfinished. */
export function T({ children }: { children: string }) {
  const parts = children.split(PLACEHOLDER);
  return (
    <>
      {parts.map((part, i) =>
        PLACEHOLDER.test(part) ? (
          <span key={i} className="ph" title="Placeholder: not filled in yet">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** A real link when the href is filled in; a visible placeholder otherwise. */
export function SmartLink({
  href,
  children,
  className,
}: {
  href?: string;
  children: ReactNode;
  className?: string;
}) {
  if (!href) return null;
  if (isPlaceholder(href)) {
    return (
      <span className={className}>
        {children} <T>{href}</T>
      </span>
    );
  }
  const external = /^https?:/.test(href) || href.endsWith(".pdf");
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
