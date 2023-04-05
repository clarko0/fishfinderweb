import { useEffect, useState } from "react";
import { IStylingObject } from "../constants/interfaces";
import { STYLING } from "../constants/styling";
import { CheckTheme } from "./local";

export const useStyling = () => {
  const [styling, setStyling] = useState<IStylingObject>({});
  useEffect(() => {
    function handleThemeChange() {
      setStyling(STYLING[CheckTheme()]);
    }
    window.addEventListener("storage", handleThemeChange);
    handleThemeChange();
    return () => window.removeEventListener("storage", handleThemeChange);
  }, []);
  return styling;
};
