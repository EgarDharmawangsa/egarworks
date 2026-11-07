import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = "Egar Dharmawangsa — Full-stack web developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 76px",
        background: "#0b0c0f",
        color: "#f0f0f3",
        fontFamily: "sans-serif",
        borderLeft: "12px solid #356fdf",
      }}
    >
      <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>
        egar<span style={{ color: "#9a9ba7" }}>works</span>
        <span style={{ color: "#6294fc" }}>.</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            letterSpacing: "-2px",
            fontWeight: 700,
          }}
        >
          {siteConfig.owner}
        </div>
        <div style={{ display: "flex", color: "#acb1be", fontSize: 30 }}>
          Full-stack web developer
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #303138",
          paddingTop: 24,
          fontSize: 22,
          color: "#acb1be",
        }}
      >
        <span>Based in Bali. Building for the web.</span>
        <span>{new URL(siteConfig.url).hostname}</span>
      </div>
    </div>,
    size,
  );
}
