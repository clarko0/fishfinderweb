import GlowingFish from "@/components/GlowingFish";
import LoadingBar from "@/components/LoadingBar";
import LoadingMainLogo from "@/components/Logo/LoadingMain";
import { sleep } from "@/storage/utils/tools";
import { hexlify } from "ethers";
import Router from "next/router";
import { useEffect, useState } from "react";

export const Home = () => {
  const [glowingFishSize, setGlowingFishSize] = useState<any>({
    height: "0px",
    width: "0px",
  });
  const [isGlowingFish, setIsGlowingFish] = useState<boolean>(false);
  const [positionGlowingFish, setPositionGlowingFish] = useState<any>({
    top: "",
    right: "",
    left: "0",
    bottom: "0",
  });
  const [barSize, setBarSize] = useState<number>(15);
  const [barIndex, setBarIndex] = useState<number>(0);
  const [isBar, setIsBar] = useState<boolean>(false);
  const [barText, setBarText] = useState<string[]>([
    "Connecting to AI...",
    "Searching the waters...",
    "Casting the line...",
    "Waiting for a bite...",
    "Reeling in excitement...",
    "Trawling the depths...",
    "Dipping into the unknown...",
    "Navigating the currents...",
    "Sailing through data streams...",
  ]);
  const [currentBarText, setCurrentBarText] = useState<string>("");
  const [logoPosition, setLogoPosition] = useState<any>({
    top: "",
    right: "",
    left: "",
    bottom: "",
  });
  const [isLoadingLogo, setIsLoadingLogo] = useState<boolean>(false);
  const handleLoad = async () => {
    await sleep(500);
    setIsLoadingLogo(true);
    await sleep(1000);
    setIsGlowingFish(true);
    setGlowingFishSize({ height: "300px", width: "300px" });
    setPositionGlowingFish({
      top: "",
      right: "",
      left: "90px",
      bottom: "110px",
    });
    await sleep(1000);
    setGlowingFishSize({ height: "500px", width: "500px" });
    await sleep(500);
    setIsBar(true);
    for (let i = 0; i < barSize; i++) {
      if (barSize - i === 2 || barSize - i === 1) {
        setCurrentBarText("All most finished...");
      } else {
        setCurrentBarText(barText[Math.floor(Math.random() * barText.length)]);
      }
      // setGlowingFishSize((prev: any) => {
      //   const newSize = prev;
      //   newSize.width = newSize.width === "500px" ? "400px" : "500px";
      //   newSize.height = newSize.width === "500px" ? "400px" : "500px";
      //   return newSize;
      // });
      setBarIndex(i);
      await sleep(500);
    }
    setIsBar(false);
    setGlowingFishSize({
      width: "750px",
      height: "750px",
    });
    setPositionGlowingFish({
      top: "",
      right: "",
      left: "-90px",
      bottom: "-110px",
    });
    setIsLoadingLogo(false);
    await sleep(500);
    setLogoPosition({ top: "45px", right: "", left: "45px", bottom: "" });
    setIsLoadingLogo(true);
  };

  useEffect(() => {
    handleLoad();
  }, []);
  return (
    <div
      style={{
        background: "rgba(59, 12, 81, 1)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <LoadingMainLogo position={logoPosition} seen={isLoadingLogo} />
      <GlowingFish
        position={positionGlowingFish}
        size={glowingFishSize}
        seen={isGlowingFish}
      />
      <LoadingBar
        barText={currentBarText}
        seen={isBar}
        size={barSize}
        index={barIndex}
      />
    </div>
  );
};

export default Home;
