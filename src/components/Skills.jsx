import { skills } from "../data.js";

export default function Skills() {
  return (
    <section className="section skills" id="skills" aria-labelledby="skills-title">
      <div className="section__inner">
        <h2 className="section__title" id="skills-title" data-reveal>
          Skills
        </h2>
        <div className="skills__grid">
          {skills.map((group, i) => (
            <div
              className="skillgroup"
              key={group.domain}
              data-reveal
              style={{ "--d": `${i * 90}ms` }}
            >
              <h3 className="skillgroup__domain">{group.domain}</h3>
              <p className="skillgroup__lead">{group.lead}</p>
              <ul className="skillgroup__list" role="list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
