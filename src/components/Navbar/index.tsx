import { IStylingObject } from "@/storage/constants/interfaces";
import BurgerMenuSVG from "@/storage/svg/BurgerMenuSVG";
import ChevronSVG from "@/storage/svg/ChevronSVG";
import { intToString, useWindowSize } from "@/storage/utils/tools";
import { isDocked } from "@/storage/utils/window";
import Router from "next/router";
import Wod from "public/wod.png";
import Logo from "public/logo.png";
import { useContext, useEffect, useState } from "react";
import { getWodBalance } from "@/storage/utils/method";
import { Tooltip } from "@nextui-org/react";
import { GetUserdata } from "@/storage/utils/fetch";
import { StylingContext } from "@/pages/_app";

const Navbar = (props: any) => {
  const [isToolboxMenu, setIsToolboxMenu] = useState<boolean>(false);
  const [isBurgerMenu, setIsBurgerMenu] = useState<boolean>(false);
  const [isSocialsMenu, setIsSocialsMenu] = useState<boolean>(false);
  const [wodBalance, setWodBalance] = useState<any>(0);
  const [offchainWodBalance, setOffchainWodBalance] = useState<any>(0);

  const styling = useContext(StylingContext);
  const size = useWindowSize();

  useEffect(() => {
    getWodBalance().then((res: any) => {
      setWodBalance(res / 10 ** 18);
    });
    GetUserdata().then((res: any) => {
      setOffchainWodBalance(res.data.wod_balance);
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
          border: `1px solid #ecd977`,
          display: "flex",
          borderRadius: "3px",
          position: "fixed",
          marginLeft: "-40px",
          left: size.width > 1650 ? "75%" : "82%",
          top: size.width > 1650 ? "87px" : "150px",
          color: "#ecd977",
          fontWeight: "600",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img
          src={
            "data:image/png;base64,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"
          }
          alt="wod"
          width={24}
          style={{ marginLeft: "10px" }}
        />
        {intToString(wodBalance)}
      </div>
      <div
        style={{
          height: "40px",
          paddingRight: "16px",
          border: `1px solid #8ae5fd`,
          display: "flex",
          borderRadius: "3px",
          position: "fixed",
          marginLeft: "-40px",
          left: size.width > 1650 ? "68%" : size.width > 1150 ? "72%" : "82%",
          top:
            size.width > 1650 ? "87px" : size.width > 1150 ? "150px" : "200px",
          color: "#8ae5fd",
          fontWeight: "600",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img
          src={
            "data:image/png;base64,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"
          }
          alt="wod"
          width={24}
          style={{ marginLeft: "10px" }}
        />
        {intToString(offchainWodBalance)}
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
