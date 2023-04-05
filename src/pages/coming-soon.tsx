import { IStylingObject } from "@/storage/constants/interfaces";
import { STYLING } from "@/storage/constants/styling";
import { CheckTheme } from "@/storage/utils/local";
import { useWindowSize } from "@/storage/utils/tools";
import Router from "next/router";
import { useEffect, useState } from "react";

const ComingSoon = () => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isDark, setIsDark] = useState<boolean>(false);
  const size = useWindowSize();
  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
  }, []);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: styling.background_main,
        transition: "0.5s",
        userSelect: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: styling.font_primary,
        fontWeight: "600",
        flexDirection: "column",
        textAlign: "center",
        fontSize: size.width > 600 ? "40px" : "30px",
      }}
    >
      This product is coming soon
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          border: `1px solid ${styling.btn_primary}`,
          width: "250px",
          height: "80px",
          borderRadius: "3px",
          marginTop: "20px",
          cursor: "pointer",
        }}
        onClick={() => {
          Router.push("/toolbox");
        }}
      >
        Go back
      </div>
    </div>
  );
};

export default ComingSoon;
