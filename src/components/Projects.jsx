import { projects } from "../data.js";

export default function Projects() {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-title">
      <div className="section__inner">
        <h2 className="section__title" id="projects-title" data-reveal>
          Selected Work
        </h2>
        <p className="section__lede" data-reveal style={{ "--d": "80ms" }}>
          Three builds that show the range — automation, defense, and learning
          platforms.
        </p>
        <div className="projects__list">
          {projects.map((p, i) => (
            <article
              className="project"
              key={p.name}
              data-reveal="wipe"
              style={{ "--d": `${i * 110}ms` }}
            >
              <div className="project__head">
                <h3 className="project__name">{p.name}</h3>
                <span className="project__period">{p.period}</span>
              </div>
              <p className="project__place">{p.place}</p>
              <p className="project__summary">{p.summary}</p>
              <p className="project__result">{p.result}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
