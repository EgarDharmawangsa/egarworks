"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Brand } from "@/components/ui/brand";
import { siteConfig } from "@/config/site";

const links = siteConfig.navigation;
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
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
      if (event.key === "Escape") {
        setOpen(false);
        if (
          document
            .getElementById("mobile-nav")
            ?.contains(document.activeElement)
        )
          menuButton.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    window.addEventListener("keydown", close);
    return () => {
      observer.disconnect();
      desktop.removeEventListener("change", closeOnDesktop);
      window.removeEventListener("keydown", close);
    };
  }, []);
  return (
    <header className="site-header">
      <nav className="shell nav-inner" aria-label="Main navigation">
        <Brand onClick={() => setOpen(false)} />
        <div className="desktop-nav">
          {links.map(({ label, id }) => (
            <Link
              key={label}
              href={`/#${id}`}
              aria-current={active === id ? "location" : undefined}
            >
              {label}
            </Link>
          ))}
        </div>
        <Button asChild variant="outline" size="sm" className="desktop-cta">
          <a href={`mailto:${siteConfig.email}`}>
            Let’s talk <ArrowUpRight />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-toggle"
          ref={menuButton}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
        <div id="mobile-nav" className="mobile-nav" hidden={!open}>
          {links.map(({ label, id }) => (
            <Link key={label} href={`/#${id}`} onClick={() => setOpen(false)}>
              {label}
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
