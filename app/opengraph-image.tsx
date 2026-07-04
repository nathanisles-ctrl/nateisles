import { ImageResponse } from "next/og";

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
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#0A0A0A",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#C9A961",
            fontSize: 28,
            letterSpacing: 6,
          }}
        >
          NATE ISLES
        </div>
        <div
          style={{
            display: "flex",
            color: "#E8E4DA",
            fontSize: 64,
            fontWeight: 900,
            marginTop: 24,
            maxWidth: 950,
            lineHeight: 1.15,
          }}
        >
          Building what didn&apos;t exist yesterday.
        </div>
        <div
          style={{
            display: "flex",
            color: "#C9A961",
            fontSize: 22,
            marginTop: 40,
            letterSpacing: 2,
          }}
        >
          Force, in every form.
        </div>
      </div>
    ),
    { ...size }
  );
}
