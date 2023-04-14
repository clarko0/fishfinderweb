import { useEffect, useState } from "react";
import { STYLING } from "@/storage/constants/styling";
import ItemsPNG from "@/storage/png/ItemsPNG";
import TreasurePNG from "@/storage/png/TreasurePNG";
import MetaMaskLoadingSVG from "@/storage/svg/MetaMaskLoadingSVG";
import MetamaskSVG from "@/storage/svg/MetamaskSVG";
import MoonSVG from "@/storage/svg/MoonSVG";
import SunSVG from "@/storage/svg/SunSVG";
import WalletConnectSVG from "@/storage/svg/WalletConnectSVG";
import {
  CheckTheme,
  ChangeTheme,
  SetCurrentAccount,
  GetAuthToken,
} from "@/storage/utils/local";
import {
  GenerateAuth,
  GetAddress,
  MetaMaskConnect,
} from "@/storage/utils/web3";
import Router from "next/router";
import { isDocked } from "@/storage/utils/window";
import { IStylingObject } from "@/storage/constants/interfaces";
import { isDev, useWindowSize } from "@/storage/utils/tools";
import { UserSettings } from "@/components/UserSettings";

const Login = () => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isDark, setIsDark] = useState<boolean>(CheckTheme() === "dark");
  const [connecting, setIsConnecting] = useState<boolean>(false);
  const size = useWindowSize();

  const handleThemeChange = () => {
    ChangeTheme();
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
  };

  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    if (isDocked()) {
      if (GetAuthToken() !== "") {
        Router.push("/toolbox");
        window.location.reload();
      }
    }
  }, []);

  return (
    <div
      style={{
        background: styling.background_main,
        height: "100vh",
        margin: "0",
        transition: "0.5s",
        overflow: "hidden",
      }}
    >
      {
        <div
          style={{
            marginTop: "100px",
            marginLeft: size.width > 800 ? "75px" : "0px",
            zIndex: "10",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            position: "fixed",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: styling.font_primary,
              userSelect: "none",
              marginLeft: size.width > 800 ? "100px" : "-200px",
              position: size.width > 800 ? "inherit" : "absolute",
              left: size.width > 800 ? "inherit" : "50vw",
              width: "400px",
            }}
          >
            Login With
          </div>
          {size.width > 800 && (
            <UserSettings HandleThemeChange={handleThemeChange} />
          )}
        </div>
      }
      <div
        style={{
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          userSelect: "none",
          gap: "10px",
          zIndex: "1",
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
          position: "fixed",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            color: "#FFA500",
            border: "1px solid #FFA500",
            borderRadius: "9px",
            width: "300px",
            fontSize: "24px",
            fontWeight: "600",
            height: "80px",
            cursor: "pointer",
            gap: "20px",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
          }}
          onClick={async () => {
            let address: any = await GetAddress();
            if (address === undefined) {
              window.location.reload();
            }
            setIsConnecting(true);
            await MetaMaskConnect();
            const s = await GenerateAuth();
            SetCurrentAccount(address, s);
            await Router.push("/toolbox");
          }}
        >
          {!connecting && (
            <>
              <div>
                <MetamaskSVG />
              </div>
              <div>MetaMask</div>
            </>
          )}
          {connecting && (
            <>
              <MetaMaskLoadingSVG />
            </>
          )}
        </div>
        <div
          style={{
            fontSize: "60px",
            color: styling.font_primary,
            fontWeight: "700",
          }}
        >
          or
        </div>
        <div
          style={{
            color: "#3B99FC",
            border: "1px solid #3B99FC",
            borderRadius: "9px",
            width: "300px",
            fontSize: "24px",
            fontWeight: "600",
            height: "80px",
            cursor: "pointer",
            gap: "20px",
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            <WalletConnectSVG />
          </div>
          <div style={{}}>WalletConnect</div>
        </div>
        <div
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: styling.font_primary,
          }}
        >
          By continuing, you agree to our{" "}
          <span
            style={{
              color: "#3B99FC",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Terms of Use
          </span>
        </div>
      </div>
      <div
        style={{
          bottom: isDark ? "-15px" : "-20px",
          left: "0px",
          zIndex: "0",
          position: "fixed",
        }}
      >
        {size.width > 1200 && <TreasurePNG />}
      </div>
      <div
        style={{
          bottom: isDark ? "-15px" : "-20px",
          right: "0px",
          zIndex: "0",
          position: "fixed",
        }}
      >
        {size.width > 1200 && <ItemsPNG />}
      </div>
    </div>
  );
};

export default Login;
