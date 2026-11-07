"use client";

import { useEffect, useRef } from "react";
import "./cursor.css";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const enabled = window.matchMedia(
      "(any-hover: hover) and (any-pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    let frame = 0;
    let visible = false;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let lastTime = 0;

    const draw = (time: number) => {
      const elapsed = Math.min(time - lastTime, 64);
      lastTime = time;
      const ease = 1 - Math.exp(-elapsed / 55);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

      if (Math.hypot(targetX - x, targetY - y) > 0.1) {
        frame = requestAnimationFrame(draw);
      } else {
        frame = 0;
      }
    };

    const hide = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      visible = false;
      glow.style.opacity = "0";
    };

    const move = (event: PointerEvent) => {
      if (!enabled.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;
      if (!visible) {
        x = targetX;
        y = targetY;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        glow.style.opacity = "1";
        visible = true;
      }
      if (!frame) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };
    const visibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    document.addEventListener("visibilitychange", visibility);
    enabled.addEventListener("change", hide);

    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      document.removeEventListener("visibilitychange", visibility);
      enabled.removeEventListener("change", hide);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
