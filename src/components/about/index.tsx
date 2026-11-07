import { Code2, GraduationCap, Layers3, MapPin } from "lucide-react";
export default function About() {
  return (
    <section className="shell section" id="about">
      <div className="section-heading">
        <span className="eyebrow">01 / ABOUT ME</span>
        <h2>
          A little about
          <br />
          <span className="muted-heading">the person behind the pixels.</span>
        </h2>
      </div>
      <div className="about-grid">
        <div className="about-copy">
          <p>
            I’m Egar, a graduate of <strong>ITB STIKOM Bali</strong> with a
            strong interest in full-stack web development. I enjoy connecting
            good design with reliable code to build things that are useful.
          </p>
          <p>
            My experience includes building web applications with Laravel,
            understanding system requirements, and turning them into structured
            digital solutions. I’m always learning, comfortable working
            independently or with a team, and committed to getting better at
            what I do.
          </p>
          <a className="text-link" href="#contact">
            Have something in mind? Let’s connect <span>↗</span>
          </a>
        </div>
        <div className="about-details">
          {[
            {
              icon: GraduationCap,
              label: "EDUCATION",
              value: "ITB STIKOM Bali",
            },
            { icon: Code2, label: "FOCUS", value: "Full-stack development" },
            {
              icon: Layers3,
              label: "APPROACH",
              value: "Functional & well-structured",
            },
            { icon: MapPin, label: "BASED IN", value: "Bali, Indonesia" },
          ].map(({ icon: Icon, label, value }) => (
            <div className="detail" key={label}>
              <span className="detail-icon">
                <Icon size={19} />
              </span>
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
