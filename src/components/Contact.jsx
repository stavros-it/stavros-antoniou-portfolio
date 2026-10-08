import { profile } from "../data.js";

export default function Contact() {
  return (
    <>
      <section className="section contact" id="contact" aria-labelledby="contact-title">
        <div className="section__inner contact__inner">
          <h2 className="section__title" id="contact-title" data-reveal>
            Let&apos;s connect
          </h2>
          <p className="contact__lede" data-reveal style={{ "--d": "90ms" }}>
            The fastest way to reach me is LinkedIn — whether it&apos;s a role,
            a project, or a network that needs looking after.
          </p>
          <p className="contact__location" data-reveal style={{ "--d": "150ms" }}>
            <span className="contact__pin" aria-hidden="true">
              <svg viewBox="0 0 12 12">
                <circle cx="6" cy="6" r="2.4" fill="currentColor" />
                <circle
                  cx="6"
                  cy="6"
                  r="5.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.55"
                />
              </svg>
            </span>
            {profile.location}
            <span className="contact__coords">
              {profile.coordinates.lat} / {profile.coordinates.lng}
            </span>
          </p>
          <a
            className="contact__cta"
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            style={{ "--d": "210ms" }}
          >
            Connect on LinkedIn
            <svg viewBox="0 0 24 24" aria-hidden="true" className="contact__cta-arrow">
              <path
                d="M17.2 6.8 21.4 12l-4.2 5.2h-3.1l2.9-3.8H4.9v-2.8h12.1l-2.9-3.8Z"
                fill="currentColor"
              />
            </svg>
          </a>
        </div>
      </section>
      <footer className="footer">
        <div className="footer__inner">
          <span className="footer__name">{profile.name}</span>
          <span className="footer__place">Heraklion · Crete · Greece</span>
          <a href="#top" className="footer__top">
            Back to top ↑
          </a>
        </div>
        <p className="footer__colophon">
          Type set in{" "}
          <a href="./OFL-Archivo.txt" target="_blank" rel="noopener noreferrer">
            Archivo
          </a>{" "}
          and{" "}
          <a href="./OFL-MartianMono.txt" target="_blank" rel="noopener noreferrer">
            Martian Mono
          </a>
          , both under the SIL Open Font License 1.1.
        </p>
      </footer>
    </>
  );
}
