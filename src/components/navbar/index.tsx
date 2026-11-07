"use client";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = ["About", "Skills", "Projects", "Contact"];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", close);
    };
  }, []);
  return (
    <header className="site-header">
      <nav className="shell nav-inner" aria-label="Main navigation">
        <a href="#hero" className="brand" onClick={() => setOpen(false)}>
          egar<span className="text-muted-foreground">works</span>
          <span className="brand-dot">.</span>
        </a>
        <div className="desktop-nav">
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              aria-current={
                active === label.toLowerCase() ? "location" : undefined
              }
            >
              {label}
            </a>
          ))}
        </div>
        <Button asChild variant="outline" size="sm" className="desktop-cta">
          <a href="mailto:dharmawangsaegar@gmail.com">
            Let’s talk <ArrowUpRight />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
        <div id="mobile-nav" className="mobile-nav" hidden={!open}>
          {links.map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
