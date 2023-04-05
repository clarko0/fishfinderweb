import { IStylingObject } from "@/storage/constants/interfaces";

export const STYLING: IStylingObject = {
  light: {
    font_primary: "#000000",
    background_main: "#ffffff",
    btn_primary: "#8080FF",
    inverse_btn_primary: "#120A18",
    btn_shadow: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    blue_important: "rgba(51, 102, 204, 1)",
    btn_glow:
      "0px 0px 2016px #8080FF, 0px 0px 1152px #8080FF, 0px 0px 672px #8080FF, 0px 0px 336px #8080FF, 0px 0px 96px #8080FF, 0px 0px 48px #8080FF",
    txt_glow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    itemGradient: "linear-gradient(180deg, #E5F5F9 0%, #F7FBFC 100%)",
    inverse_btn_glow: "0px 0px 100px #000",
  },
  dark: {
    font_primary: "#ffffff",
    background_main: "#0A0808",
    btn_primary: "#120A18",
    inverse_btn_primary: "#8080FF",
    btn_shadow: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
    blue_important: "rgba(51, 102, 204, 1)",
    btn_glow:
      "0px 0px 2016px #120A18, 0px 0px 1152px #120A18, 0px 0px 672px #120A18, 0px 0px 336px #120A18, 0px 0px 96px #120A18, 0px 0px 48px #120A18",
    txt_glow:
      "0px 0px 127.008px #FFFFFF, 0px 0px 72.576px #FFFFFF, 0px 0px 42.336px #FFFFFF, 0px 0px 21.168px #FFFFFF, 0px 0px 6.048px #FFFFFF, 0px 0px 3.024px #FFFFFF",
    inverse_btn_glow: "0px 0px 100px #8080FF",
    itemGradient:
      "linear-gradient(180deg, #16172E 0%, rgba(0, 105, 255, 0) 100%)",
  },
};
