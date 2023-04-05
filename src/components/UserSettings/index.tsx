import { IStylingObject } from "@/storage/constants/interfaces";
import { STYLING } from "@/storage/constants/styling";
import MoonSVG from "@/storage/svg/MoonSVG";
import SunSVG from "@/storage/svg/SunSVG";
import { CheckTheme } from "@/storage/utils/local";
import { useEffect, useState } from "react";

export const UserSettings = (props: any) => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
        position: "fixed",
        right: "10%",
        top: "12%",
        userSelect: "none",
      }}
    >
      <div
        style={{
          color: styling.font_primary,
          display: "flex",
          height: "50px",
          alignItems: "center",
          gap: "5px",
          cursor: "pointer",
        }}
      >
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20V20ZM12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z"
              fill={isDark ? "#D0DCE8" : "#000"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.747 18.177C14.485 16.699 15 14.518 15 12C15 9.482 14.485 7.3 13.747 5.823C12.948 4.226 12.215 4 12 4C11.785 4 11.052 4.226 10.253 5.823C9.515 7.301 9 9.482 9 12C9 14.518 9.515 16.7 10.253 18.177C11.052 19.774 11.785 20 12 20C12.215 20 12.948 19.774 13.747 18.177ZM12 22C14.761 22 17 17.523 17 12C17 6.477 14.761 2 12 2C9.239 2 7 6.477 7 12C7 17.523 9.239 22 12 22Z"
              fill={isDark ? "#D0DCE8" : "#000"}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.95 13C22.0162 12.335 22.0162 11.665 21.95 11H2.05003C1.98398 11.665 1.98398 12.335 2.05003 13H21.95Z"
              fill={isDark ? "#D0DCE8" : "#000"}
            />
          </svg>
        </div>
        <div style={{ fontWeight: "600" }}>EN</div>
      </div>
      <div
        style={{
          width: "110px",
          height: "40px",
          borderRadius: "9999px",
          border: `1px solid ${styling.font_primary}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0px",
        }}
        onClick={() => {
          props.HandleThemeChange();
          setStyling(STYLING[CheckTheme()]);
          setIsDark(CheckTheme() === "dark");
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            height: "30px",
            cursor: "pointer",
            borderRadius: "900px",
            background: !isDark ? styling.btn_primary : "",
          }}
        >
          <SunSVG />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "50px",
            cursor: "pointer",
            height: "30px",
            borderRadius: "900px",
            background: isDark ? styling.btn_primary : "",
          }}
        >
          <MoonSVG />
        </div>
      </div>
    </div>
  );
};
