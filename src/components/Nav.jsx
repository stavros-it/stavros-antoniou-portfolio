import { useSectionActive, useScrolled } from "../hooks.js";
import { profile } from "../data.js";

const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["education", "Education"],
  ["projects", "Projects"],
];

export default function Nav() {
  const scrolled = useScrolled(40);
  const active = useSectionActive();

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <a className="nav__monogram" href="#top" aria-label="Back to top">
        <svg viewBox="0 0 40 40" aria-hidden="true" className="nav__mark">
          <g fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M9 25c1.2-6 6-11 12-11s8.5 3.5 9.6 7.4" />
            <path d="M7.8 29c2-8.6 8-15.2 15.4-15.2 5 0 9 3 10.6 7" opacity="0.5" />
            <path d="M8.6 20c.8-4 3.8-7 7.4-7 2.6 0 4.6 1.5 5.6 3.2" opacity="0.3" />
          </g>
          <circle cx="28.6" cy="18.2" r="2.1" fill="currentColor" />
        </svg>
        <span className="nav__name">{profile.name}</span>
      </a>
      <nav className="nav__links" aria-label="Sections">
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav__link ${active === id ? "is-active" : ""}`}
          >
            {label}
          </a>
        ))}
        <a
          className="nav__cta"
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Connect
          <svg viewBox="0 0 16 16" aria-hidden="true" className="nav__cta-arrow">
            <path
              d="M11.45 3 15 7.5l-3.55 4.5H9.2l2.3-3.2H2V9.4h9.5L9.2 6.3h2.25Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </nav>
    </header>
  );
}
