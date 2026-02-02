import { Platform } from "react-native";

const accent = "#FFD54A";
const primary = "#12C2B3";

export const Colors = {
  light: {
    text: "#08131F",
    background: "#EAF2FF",
    card: "#FFFFFF",
    primary,
    accent,
    muted: "#6B7C93",
    border: "rgba(0,0,0,0.08)",
    danger: "#FF5A6A",

    tint: primary,
    icon: "#6B7C93",
    tabIconDefault: "#6B7C93",
    tabIconSelected: primary,
  },

  dark: {
    text: "#EAF2FF",
    background: "#08131F",
    card: "#0E2233",
    primary,
    accent,
    muted: "#9BB3C7",
    border: "rgba(255,255,255,0.12)",
    danger: "#FF5A6A",

    tint: accent,
    icon: "#9BB3C7",
    tabIconDefault: "#9BB3C7",
    tabIconSelected: accent,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono:
      "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});