"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// AOS has no destroy API. Initialize its global listeners only once per page load.
let initialized = false;

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const activate = async () => {
      cancelAnimationFrame(frame);
      if (reducedMotion.matches) {
        root.classList.remove("aos-enabled");
        return;
      }

      try {
        const { default: AOS } = await import("aos");
        if (cancelled || reducedMotion.matches) return;

        root.classList.add("aos-enabled");
        // Allow the initial state to paint before starting transitions.
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => {
            if (cancelled || reducedMotion.matches) return;
            try {
              if (!initialized) {
                AOS.init({
                  duration: 600,
                  easing: "ease-out-cubic",
                  offset: 56,
                  once: true,
                });
                initialized = true;
              } else {
                AOS.refreshHard();
              }
              void document.fonts.ready.then(() => {
                if (!cancelled) AOS.refresh();
              });
            } catch {
              root.classList.remove("aos-enabled");
            }
          });
        });
      } catch {
        // Progressive enhancement: content stays readable if the animation chunk fails.
        root.classList.remove("aos-enabled");
      }
    };

    void activate();
    reducedMotion.addEventListener("change", activate);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      reducedMotion.removeEventListener("change", activate);
      root.classList.remove("aos-enabled");
    };
  }, [pathname]);

  return null;
}
