import { education, certifications } from "../data.js";

export default function Education() {
  return (
    <section className="section education" id="education" aria-labelledby="education-title">
      <div className="section__inner">
        <h2 className="section__title" id="education-title" data-reveal>
          Education &amp; Certifications
        </h2>
        <div className="edu">
          {education.map((e, i) => (
            <article
              className="edu__item"
              key={e.school}
              data-reveal
              style={{ "--d": `${i * 90}ms` }}
            >
              <p className="edu__period">{e.period}</p>
              <div>
                <h3 className="edu__school">{e.school}</h3>
                <p className="edu__degree">{e.degree}</p>
                <p className="edu__note">{e.note}</p>
              </div>
            </article>
          ))}
        </div>
        <ul className="certs" role="list">
          {certifications.map((c, i) => (
            <li className="certs__item" key={c.name} data-reveal style={{ "--d": `${i * 70}ms` }}>
              <span className="certs__year">{c.year}</span>
              <span className="certs__name">
                {c.name}
                <span className="certs__issuer"> — {c.issuer}</span>
                {c.credentialId && (
                  <span className="certs__id">Credential ID {c.credentialId}</span>
                )}
                {c.url && (
                  <a className="certs__verify" href={c.url} target="_blank" rel="noopener noreferrer">
                    Verify
                  </a>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
