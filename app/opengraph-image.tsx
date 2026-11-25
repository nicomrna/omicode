import { ImageResponse } from "next/og";
import { getSite } from "@/lib/data";

export const alt = "omnicode — Un programador, todo el stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const site = getSite();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f4f1ea",
          color: "#0e0e12",
          position: "relative",
        }}
      >
        {/* Órbitas decorativas */}
        <div style={{ position: "absolute", right: -140, top: -140, width: 620, height: 620, borderRadius: 620, border: "2px dashed #0e0e1255", display: "flex" }} />
        <div style={{ position: "absolute", right: -20, top: -20, width: 380, height: 380, borderRadius: 380, border: "2px dashed #0e0e1255", display: "flex" }} />
        <div style={{ position: "absolute", right: 150, top: 60, width: 44, height: 44, borderRadius: 44, background: "#ff4d1c", display: "flex" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 52, height: 52, borderRadius: 52, border: "9px solid #0e0e12", display: "flex", position: "relative" }}>
            <div style={{ position: "absolute", right: -20, top: -20, width: 24, height: 24, borderRadius: 24, background: "#ff4d1c", display: "flex" }} />
          </div>
          <div style={{ display: "flex", fontSize: 46, fontWeight: 800, letterSpacing: -1 }}>
            omni<span style={{ color: "#d63a0b" }}>code</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.98, letterSpacing: -4, display: "flex" }}>Un programador.</div>
          <div style={{ fontSize: 112, fontWeight: 800, lineHeight: 0.98, letterSpacing: -4, color: "#d63a0b", display: "flex" }}>Todo el stack.</div>
          <div style={{ fontSize: 30, marginTop: 28, color: "#5f5c55", display: "flex" }}>
            Sitios web · Aplicaciones · Automatizaciones — {site.url.replace("https://", "")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
