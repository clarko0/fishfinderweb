import { STYLING } from "@/storage/constants/styling";
import { IStylingObject } from "@/storage/constants/interfaces";
import { useEffect, useState } from "react";
import { ChangeTheme, CheckTheme, ClearAuthToken } from "@/storage/utils/local";
import DarkHero from "public/dark-hero.png";
import LightHero from "public/light-hero.png";
import SunSVG from "@/storage/svg/SunSVG";
import MoonSVG from "@/storage/svg/MoonSVG";
import WorldSVG from "@/storage/svg/WorldSVG";
import Router from "next/router";
import { useWindowSize } from "@/storage/utils/tools";
import DiscordSVG from "@/storage/svg/DiscordSVG";
import TelegramSVG from "@/storage/svg/TelegramSVG";
import TwitterSVG from "@/storage/svg/TwitterSVG";
import MediumSVG from "@/storage/svg/MediumSVG";
import { isDocked } from "@/storage/utils/window";
import SocialModal from "@/components/SocialModal";
import { UserSettings } from "@/components/UserSettings";

const Home = () => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isDark, setIsDark] = useState<boolean>(false);
  const size = useWindowSize();
  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
  }, []);

  const HandleThemeChange = () => {
    ChangeTheme();
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
  };

  return (
    <div
      style={{
        background: styling.background_main,
        height: "100vh",
        width: "100%",
        overflow: "hidden",
        transition: "0.5s",
      }}
    >
      <div
        style={{
          display: "flex",
          color: styling.font_primary,
          flexDirection: "column",
          userSelect: "none",
          position: "absolute",
          left: "7%",
          top: size.width > 770 ? "10%" : "20%",
        }}
      >
        <div style={{ fontSize: "30px", fontWeight: "500" }}>Welcome to</div>
        <div
          style={{
            fontSize: size.width > 500 ? "80px" : "60px",
            fontWeight: "700",
          }}
        >
          Fish Finder
        </div>
      </div>
      <div
        style={{
          userSelect: "none",
          fontSize: "30px",
          fontWeight: "600",
          color: styling.font_primary,
          position: "absolute",
          top: size.width > 770 ? "30%" : "40%",
          left: "7%",
          width: "400px",
        }}
      >
        The #1{" "}
        <span style={{ color: styling.blue_important, fontWeight: "700" }}>
          QOL
        </span>{" "}
        toolbox for World of Defish!
      </div>
      {size.width > 1400 && (
        <img
          style={{
            position: "fixed",
            top: "50%",
            left: "3%",
            zIndex: "0",
            filter: isDark
              ? "drop-shadow(0px 0px 1000px #008040) drop-shadow(0px 0px 500px #008040)"
              : "",
          }}
          src={CheckTheme() === "dark" ? DarkHero.src : LightHero.src}
        />
      )}
      <UserSettings HandleThemeChange={HandleThemeChange} />
      <div
        style={{
          width: "400px",
          height: "80px",
          cursor: "pointer",
          userSelect: "none",
          position: "fixed",
          transition: "0.3s",
          left: "50%",
          marginLeft: "-200px",
          top: "70%",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          background: styling.btn_primary,
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "3px",
          fontSize: "30px",
        }}
        onMouseEnter={(e: any) => {
          e.target.style.background = styling.inverse_btn_primary;
        }}
        onMouseLeave={(e: any) => {
          e.target.style.background = styling.btn_primary;
        }}
        onClick={(e: any) => {
          e.target.style.background = styling.btn_primary;
          e.target.style.boxShadow = styling.btn_glow;
          ClearAuthToken();
          Router.push("/login");
        }}
      >
        Enter App
      </div>
      <SocialModal />
    </div>
  );
};

export default Home;
