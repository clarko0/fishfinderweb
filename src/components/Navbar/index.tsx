import { IStylingObject } from "@/storage/constants/interfaces";
import BurgerMenuSVG from "@/storage/svg/BurgerMenuSVG";
import ChevronSVG from "@/storage/svg/ChevronSVG";
import { intToString, useWindowSize } from "@/storage/utils/tools";
import { isDocked } from "@/storage/utils/window";
import Router from "next/router";
import Wod from "public/wod.png";
import Logo from "public/logo.png";
import { useEffect, useState } from "react";
import { getWodBalance } from "@/storage/utils/method";

const Navbar = (props: any) => {
  const [styling, setStyling] = useState<IStylingObject>(props.styling);
  const [isToolboxMenu, setIsToolboxMenu] = useState<boolean>(false);
  const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false);
  const [isSocialsMenu, setIsSocialsMenu] = useState<boolean>(false);
  const [wodBalance, setWodBalance] = useState<any>(0);
  const size = useWindowSize();
  useEffect(() => {
    setStyling(props.styling);
  }, [props]);

  useEffect(() => {
    getWodBalance().then((res: any) => {
      setWodBalance(res / 10 ** 18);
    });
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        justifyItems: "center",
        position: "fixed",
        zIndex: "999",
      }}
    >
      {size.width > 1400 ? (
        <div
          style={{
            display: "flex",
            position: "fixed",
            alignItems: "center",
            justifyItems: "center",
            height: "50px",
            top: "80px",
            left: "10%",
            color: styling.font_primary,
            fontSize: "24px",
            gap: "50px",
          }}
        >
          <div
            style={{
              fontWeight: "700",
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              marginTop: "10px",
              paddingBottom: "10px",
            }}
            onMouseEnter={() => {
              setIsToolboxMenu(true);
            }}
            onMouseLeave={() => {
              setIsToolboxMenu(false);
            }}
          >
            <div
              onClick={() => {
                Router.push("/toolbox");
              }}
            >
              Toolbox
            </div>
            <div
              style={{
                transition: "0.5s",
                display: "flex",
                transform: isToolboxMenu ? "rotate(180deg)" : "",
              }}
            >
              <ChevronSVG />
            </div>
            <div
              style={{
                transition: "0.5s",
                width: "200px",
                position: "fixed",
                background: "grey",
                borderRadius: "9px",
                userSelect: "none",
                cursor: "default",
                color: "white",
                fontWeight: "600",
                alignItems: "center",
                textShadow: "none",
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                marginTop: "135px",
                marginLeft: "120px",
                flexDirection: "column",
                fontSize: "20px",
                gap: "20px",
                opacity: isToolboxMenu ? "1" : "0",
              }}
              onMouseEnter={() => {
                if (isToolboxMenu) {
                  return;
                } else {
                  setIsToolboxMenu(false);
                }
              }}
            >
              <div
                onClick={() => {
                  Router.push("/toolbox/ff");
                }}
                style={{
                  cursor: isToolboxMenu ? "pointer" : "default",
                }}
              >
                Fisherman&apos;s Friend
              </div>
              <div
                onClick={() => {
                  Router.push("/toolbox/cove");
                }}
                style={{ cursor: isToolboxMenu ? "pointer" : "default" }}
              >
                The Cove
              </div>
            </div>
          </div>
          <div
            style={{
              fontWeight: "700",
              cursor: "pointer",
              userSelect: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              marginTop: "10px",
              paddingBottom: "10px",
            }}
            onMouseEnter={() => {
              setIsSocialsMenu(true);
            }}
            onMouseLeave={() => {
              setIsSocialsMenu(false);
            }}
          >
            <div>Socials</div>
            <div
              style={{
                transition: "0.5s",
                display: "flex",
                transform: isSocialsMenu ? "rotate(180deg)" : "",
              }}
            >
              <ChevronSVG />
            </div>
            <div
              style={{
                transition: "0.5s",
                width: "200px",
                position: "fixed",
                background: "grey",
                borderRadius: "9px",
                userSelect: "none",
                cursor: "default",
                color: "white",
                fontWeight: "600",
                alignItems: "center",
                textShadow: "none",
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                marginTop: "135px",
                marginLeft: "120px",
                flexDirection: "column",
                fontSize: "20px",
                gap: "20px",
                opacity: isSocialsMenu ? "1" : "0",
              }}
              onMouseEnter={() => {
                if (isSocialsMenu) {
                  return;
                } else {
                  setIsSocialsMenu(false);
                }
              }}
            >
              <div
                onClick={() => {
                  Router.push("https://discord.gg/WCRFtnT9bs");
                }}
                style={{
                  cursor: isSocialsMenu ? "pointer" : "default",
                }}
              >
                Discord
              </div>
              <div
                onClick={() => {
                  if (isDocked()) {
                    window.open("https://t.me/officialfishfinder");
                  }
                }}
                style={{ cursor: isSocialsMenu ? "pointer" : "default" }}
              >
                Telegram
              </div>
            </div>
          </div>
          <div
            style={{ fontWeight: "600", cursor: "pointer", userSelect: "none" }}
            onClick={() => {
              window.open("https://fish-finder.gitbook.io/documentation/");
            }}
          >
            Documentation
          </div>
        </div>
      ) : (
        <div
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "70px",
            left: "50px",
          }}
          onClick={() => {
            setIsBurgerMenu(!isBurgerMenu);
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 16.39C10.45 16.39 9.19 17.65 9.19 19.19C9.19 20.74 10.45 22 12 22C13.55 22 14.81 20.74 14.81 19.19C14.81 17.65 13.55 16.39 12 16.39Z"
              fill={styling.font_primary}
            />
            <path
              d="M12 14.81C13.5519 14.81 14.81 13.5519 14.81 12C14.81 10.4481 13.5519 9.19 12 9.19C10.4481 9.19 9.19 10.4481 9.19 12C9.19 13.5519 10.4481 14.81 12 14.81Z"
              fill={styling.font_primary}
            />
            <path
              d="M12 2C10.45 2 9.19 3.26 9.19 4.81C9.19 6.35 10.45 7.60999 12 7.60999C13.55 7.60999 14.81 6.35 14.81 4.81C14.81 3.26 13.55 2 12 2Z"
              fill={styling.font_primary}
            />
          </svg>
        </div>
      )}
      <div
        onClick={() => {
          Router.push("/");
        }}
      >
        <img
          src={Logo.src}
          style={{
            width: "100px",
            height: "100px",
            left: "50vw",
            marginLeft: "-50px",
            top: "40px",
            cursor: "pointer",
            position: "fixed",
          }}
        />
      </div>
      <div
        style={{
          height: "40px",
          paddingRight: "16px",
          border: `1px solid ${styling.font_primary}`,
          display: "flex",
          borderRadius: "3px",
          position: "fixed",
          marginLeft: "-40px",
          left: size.width > 1650 ? "75%" : "82%",
          top: size.width > 1650 ? "87px" : "150px",
          color: styling.font_primary,
          fontWeight: "600",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img
          src={Wod.src}
          alt="wod"
          width={24}
          style={{ marginLeft: "10px" }}
        />
        {intToString(wodBalance)}
      </div>
      <div
        style={{
          display: size.height > 870 ? "flex" : "none",
          position: "fixed",
          userSelect: "none",
          color: styling.font_primary,
          alignItems: "center",
          justifyItems: "center",
          alignContent: "center",
          gap: "10px",
          border: `1px solid ${styling.btn_primary}`,
          width: "150px",
          right: size.width > 600 ? "10%" : "100%",
          left: size.width > 600 ? "" : "50%",
          marginLeft: size.width > 600 ? "0px" : "-86px",
          top: size.width > 600 ? "80px" : "147px",
          borderRadius: "3px",
          paddingRight: "20px",
          height: "50px",
          fontWeight: "600",
        }}
      >
        <img
          src={props.avatar}
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "999px",
            marginLeft: "10px",
          }}
        />
        <div>{props.username}</div>
      </div>
      <div
        style={{
          transition: "0.5s",
          width: isBurgerMenu ? "300px" : "0px",
          height: "400px",
          background: "grey",
          position: "absolute",
          left: "0px",
          top: "140px",
          borderRadius: "0px 10px 10px 0px",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          display: "flex",
          flexDirection: "column",
          color: "#fff",
          fontSize: "24px",
          gap: "30px",
          fontWeight: "600",
          paddingLeft: isBurgerMenu ? "30px" : "0px",
          overflow: "hidden",
        }}
      >
        <div
          style={{ marginTop: "20px", cursor: "pointer" }}
          onClick={() => {
            Router.push("/toolbox");
          }}
        >
          Toolbox
        </div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            window.open("https://fish-finder.gitbook.io/documentation/");
          }}
        >
          Documents
        </div>
        <div
          onClick={() => {
            if (isDocked()) {
              window.open("https://t.me/officialfishfinder");
            }
          }}
          style={{ cursor: "pointer" }}
        >
          Telegram
        </div>
        <div
          onClick={() => {
            if (isDocked()) {
              window.open("https://discord.gg/WCRFtnT9bs");
            }
          }}
          style={{ cursor: "pointer" }}
        >
          Discord
        </div>
      </div>
    </div>
  );
};

export default Navbar;
