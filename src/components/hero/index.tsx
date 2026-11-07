import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
export default function Hero() {
  const [firstName, ...lastName] = siteConfig.owner.split(" ");
  return (
    <section className="shell hero" id="hero">
      <div className="hero-copy" data-aos="fade-up">
        <p className="hero-greeting">Hi, I’m</p>
        <h1>
          {firstName}
          <br />
          <span className="muted-heading">{lastName.join(" ")}</span>
          <span className="blue-dot">.</span>
        </h1>
        <p className="hero-role">{siteConfig.role}</p>
        <p className="hero-intro">
          Based in Bali, I build functional, intuitive websites with thoughtful
          design and reliable code.
        </p>
        <div className="hero-actions">
          <Button asChild size="lg">
            <a href="#projects">
              Explore my work <ArrowUpRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={siteConfig.cvPath} download>
              Download CV <Download />
            </a>
          </Button>
        </div>
      </div>
      <div className="hero-visual" data-aos="fade-up" data-aos-delay="150">
        <div className="portrait-frame">
          <div className="portrait-topline">
            <span className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>the developer behind the code</span>
          </div>
          <div className="portrait-image">
            <Image
              src="/images/profile/profile.jpg"
              alt={siteConfig.owner}
              width={600}
              height={650}
              preload
              sizes="(max-width: 767px) 90vw, 420px"
            />
          </div>
        </div>
        <div className="portrait-note">Always learning, always building.</div>
      </div>
      <a className="scroll-hint" href="#about">
        <ArrowDown size={14} />
        Scroll to explore
      </a>
    </section>
  );
}
