import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(0,229,160,0.16), transparent 45%)",
        }}
      >
        {/* top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              color: "#f4f4f2",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: -1,
            }}
          >
            HAMI<span style={{ color: "#00e5a0" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              color: "rgba(244,244,242,0.55)",
              fontSize: 22,
              letterSpacing: 4,
            }}
          >
            AI AUTOMATION &bull; WEB &bull; APPS
          </div>
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
            color: "#f4f4f2",
            fontSize: 92,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -3,
          }}
        >
          <div style={{ display: "flex" }}>BUILD DIGITAL</div>
          <div style={{ display: "flex", color: "#00e5a0" }}>SYSTEMS.</div>
        </div>

        {/* footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: 28,
            color: "rgba(244,244,242,0.6)",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", color: "#f4f4f2", fontSize: 26 }}>
            {SITE.name}
          </div>
          <div style={{ display: "flex" }}>
            AI Automation Specialist &bull; Full-Stack Developer
          </div>
        </div>
      </div>
    ),
    size
  );
}
