import { about, profile } from "../data.js";

export default function About() {
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="section__rule" aria-hidden="true" data-parallax="0.06" />
      <div className="section__inner">
        <h2 className="section__title" id="about-title" data-reveal>
          About
        </h2>
        <div className="about__grid">
          <div className="about__copy">
            {about.map((p, i) => (
              <p key={i} data-reveal style={{ "--d": `${i * 90}ms` }}>
                {p}
              </p>
            ))}
            <p className="about__sig" data-reveal style={{ "--d": "200ms" }}>
              — {profile.name}, {profile.location}
            </p>
          </div>
          <aside className="about__facts" data-reveal style={{ "--d": "160ms" }}>
            <dl className="facts">
              <div className="facts__row">
                <dt>Field</dt>
                <dd>IT &amp; Network Infrastructure</dd>
              </div>
              <div className="facts__row">
                <dt>Practice since</dt>
                <dd className="facts__mono">2010</dd>
              </div>
              <div className="facts__row">
                <dt>Base</dt>
                <dd>Heraklion, Crete, Greece</dd>
              </div>
              <div className="facts__row">
                <dt>Working mode</dt>
                <dd>Remote &amp; on-site</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
