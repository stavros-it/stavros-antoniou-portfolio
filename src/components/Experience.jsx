import { experience } from "../data.js";

export default function Experience() {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="section__inner">
        <h2 className="section__title" id="experience-title" data-reveal>
          Experience
        </h2>
        <p className="section__lede" data-reveal style={{ "--d": "80ms" }}>
          Fourteen years of keeping real systems running — airports, factories,
          hotel networks, and the cloud.
        </p>
        <ol className="timeline" role="list">
          {experience.map((job, i) => (
            <li
              className="entry"
              key={job.company + job.start}
              data-reveal="wipe"
              style={{ "--d": `${Math.min(i, 4) * 70}ms` }}
            >
              <div className="entry__period">
                <span className="entry__dates">{job.period}</span>
                <span className="entry__meta">{job.type}</span>
              </div>
              <div className="entry__body">
                <h3 className="entry__role">
                  {job.role}
                  <span className="entry__company"> · {job.company}</span>
                </h3>
                <p className="entry__place">{job.place}</p>
                <p className="entry__summary">{job.summary}</p>
                <p className="entry__detail">{job.detail}</p>
                <p className="entry__tags">
                  {job.tags.map((t) => (
                    <span className="entry__tag" key={t}>
                      {t}
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
