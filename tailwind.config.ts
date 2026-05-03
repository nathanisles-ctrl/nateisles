import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0A0A",
        "obsidian-warm": "#0A0807",
        "obsidian-deep": "#080604",
        bone: "#E8E4DA",
        ember: "#C9A961",
        "ember-light": "#D4B373",
        "ember-deep": "#8B6F30",
        storm: "#2A3942",
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
