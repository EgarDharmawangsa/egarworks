import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function Hero() {
  return (
    <section className="shell hero" id="hero">
      <div className="hero-copy">
        <h1>
          Thoughtful code.
          <br />
          <span className="muted-heading">Meaningful</span>
          <br />
          digital experiences<span className="blue-dot">.</span>
        </h1>
        <p className="hero-intro">
          Hi, I’m <strong>Egar Dharmawangsa</strong> — a full-stack web
          developer who turns ideas into functional, intuitive websites. Based
          in Bali, building for the web.
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
      </div>
      <div className="hero-visual">
        <div className="portrait-frame">
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
        </div>
      </div>
    </section>
  );
}
