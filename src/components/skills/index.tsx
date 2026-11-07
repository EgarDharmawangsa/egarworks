import StackIcon from "tech-stack-icons";
import skillsData from "@/data/skills/skillsData.json";
const categories = [
  { title: "Frontend", id: "frontend" },
  { title: "Styling", id: "styling" },
  { title: "Backend", id: "backend" },
  {
    title: "Database & services",
    id: "database",
  },
];
export default function Skills() {
  return (
    <section className="section-band" id="skills">
      <div className="shell section">
        <div className="section-heading heading-row">
          <div>
            <span className="eyebrow">02 / MY TOOLKIT</span>
            <h2>
              The tools I build with<span className="blue-dot">.</span>
            </h2>
          </div>
          <p>
            A practical stack for bringing ideas
            <br className="desktop-break" /> from the first pixel to the
            database.
          </p>
        </div>
        <div className="skills-grid">
          {categories.map((category) => (
            <div className="skill-category" key={category.title}>
              <h3>{category.title}</h3>
              <div className="skill-list">
                {skillsData
                  .filter((skill) => skill.category === category.id)
                  .map((skill) => {
                    return (
                      <div className="skill-item" key={skill.name}>
                        <StackIcon
                          name={skill.name}
                          variant="dark"
                          className="size-5 shrink-0"
                        />
                        <span>{skill.label}</span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
