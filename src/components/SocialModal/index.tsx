import { IStylingObject } from "@/storage/constants/interfaces";
import { STYLING } from "@/storage/constants/styling";
import DiscordSVG from "@/storage/svg/DiscordSVG";
import TelegramSVG from "@/storage/svg/TelegramSVG";
import { useStyling } from "@/storage/utils/hooks";
import { CheckTheme } from "@/storage/utils/local";
import { useWindowSize } from "@/storage/utils/tools";
import { isDocked } from "@/storage/utils/window";
import { useEffect, useState } from "react";

const SocialModal = () => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isDark, setIsDark] = useState<boolean>(false);
  const size = useWindowSize();
  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
  }, []);
  return (
    <div
      className=""
      style={{
        display: size.width > 1000 ? "flex" : "none",
        position: "absolute",
        alignItems: "center",
        width: "490px",
        height: "210px",
        flexDirection: "column",
        backgroundColor: "rgb(2, 6, 9)",
        zIndex: "10",
        top: "40%",
        left: size.width > 1700 ? "70%" : "50%",
        marginLeft: size.width > 1700 ? "0px" : "-245px",
        borderRadius: "9px",
        border: `1px solid ${styling.btn_primary}`,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          marginTop: "25px",
          color: "#fff",
          userSelect: "none",
        }}
      >
        Connect with us
      </div>
      <div
        className="flex"
        style={{ display: "flex", gap: "30px", marginTop: "35px" }}
      >
        <div
          onClick={() => {
            if (isDocked()) {
              window.open("https://t.me/officialfishfinder");
            }
          }}
          style={{ cursor: "pointer" }}
        >
          <TelegramSVG />
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (isDocked()) {
              window.open("https://discord.gg/WCRFtnT9bs");
            }
          }}
        >
          <DiscordSVG />
        </div>
      </div>
    </div>
  );
};

export default SocialModal;
