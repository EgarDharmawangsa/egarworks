import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Hero() {
  return (
    <section className="shell hero" id="hero">
      <div className="hero-copy">
        <span className="eyebrow">
          <span className="status-dot" />
          Full-stack web developer
        </span>
        <h1>
          Thoughtful code.
          <br />
          <span className="muted-heading">Meaningful</span>
          <br />
          digital experiences<span className="blue-dot">.</span>
        </h1>
        <p className="hero-intro">
          Hi, I’m <strong>Egar Dharmawangsa</strong> — a developer who turns
          ideas into functional, intuitive websites. Based in Bali, building for
          the web.
        </p>
        <div className="hero-actions">
          <Button asChild size="lg">
            <a href="#projects">
              Explore my work <ArrowUpRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a
              href="/files/(CV) I Komang Egar Suarama Dharmawangsa.pdf"
              download
            >
              Download CV <Download />
            </a>
          </Button>
        </div>
        <div className="hero-meta">
          <span>
            <MapPin size={14} />
            Bali, Indonesia
          </span>
          <span className="meta-divider" />
          Laravel · React · TypeScript
        </div>
      </div>
      <div className="hero-visual">
        <div className="portrait-frame">
          <div className="portrait-topline">
            <span className="window-dots">
              <i />
              <i />
              <i />
            </span>
            <span>the developer behind the code</span>
            <span className="tiny-dot" />
          </div>
          <div className="portrait-image">
            <Image
              src="/images/profile/profile.jpg"
              alt="Egar Dharmawangsa"
              width={600}
              height={650}
              preload
              sizes="(max-width: 767px) 90vw, 420px"
            />
          </div>
          <div className="portrait-caption">
            <div>
              <strong>Egar Dharmawangsa</strong>
              <span>Full-stack web developer</span>
            </div>
            <span className="code-mark">&lt;/&gt;</span>
          </div>
        </div>
        <div className="portrait-note">
          <span className="status-dot" />
          Crafting ideas into reality
        </div>
      </div>
      <a className="scroll-hint" href="#about">
        <ArrowDown size={14} />
        Scroll to explore
      </a>
    </section>
  );
}
