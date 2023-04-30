import { useEffect, useState } from "react";
import { Tooltip } from "@nextui-org/react";
import GlobalItem from "./GlobalItem";
import { intToString } from "@/storage/utils/tools";
import Wod from "public/Wod40x40.png";

const FFGlobalStatistics = ({ statisticsData, styling, size }: any) => {
  const [toolTip, setToolTip] = useState<any>({
    fisher_count: false,
  });

  const [wodFarmed, setWodFarmed] = useState<any>(0);

  useEffect(() => {
    setWodFarmed(intToString(statisticsData));
  }, []);

  return (
    <div
      style={{
        display: size.width > 1250 ? "flex" : "none",
        color: styling.font_primary,
        alignItems: "center",
        position: "absolute",
        flexDirection: "column",
        width: "600px",
        height: "170px",
        marginLeft: "-300px",
        left: size.width > 1650 ? "50%" : "940px",
        top: size.width > 1650 ? "350px" : "200px",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "600" }}>
        Global Statistics
      </div>
      <div
        style={{
          width: "600px",
          height: "80px",
          background: "#020609",
          border: "1px solid #120A18",
          borderRadius: "3px",
          marginTop: "15px",
          display: "flex",
          alignItems: "center",
          gap: "75px",
          justifyContent: "center",
        }}
      >
        <GlobalItem
          content={"$WoD Farmed"}
          value={wodFarmed}
          image={<img width={30} src={Wod.src} />}
        />
        <GlobalItem
          content={"NFTs Farmed"}
          value={statisticsData.nft_count}
          image={
            <svg
              width="30"
              height="35"
              viewBox="0 0 30 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.791026 5.52602H3.15932C3.39378 5.52602 3.61561 5.63022 3.76639 5.80942L6.31704 8.87162V2.36829C6.31704 1.06257 7.37962 0 8.68534 0H14.2114V4.73659C14.2169 5.77469 15.7863 5.76442 15.7902 4.73659V0H22.1057V10.2626C22.1057 10.6992 22.4594 11.052 22.8951 11.052C23.3309 11.052 23.6846 10.6992 23.6846 10.2626V0H27.6317C28.9374 0 30 1.06257 30 2.36829V32.3667C30 33.6724 28.9374 34.735 27.6317 34.735H22.8951V26.8407C22.8864 25.801 21.3218 25.8128 21.3163 26.8407V34.735H13.422V23.6829C13.418 22.6464 11.8462 22.6543 11.8431 23.6829V34.735H8.68534C7.37962 34.735 6.31704 33.6724 6.31704 32.3667V19.1326L0.0844855 6.66832C-0.183132 6.1694 0.221057 5.50786 0.791026 5.52602Z"
                fill="white"
              />
            </svg>
          }
        />
        <GlobalItem
          content={"People Fishing"}
          value={statisticsData.fisherman_count}
          image={
            <svg
              width="40"
              height="28"
              viewBox="0 0 40 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.211 13.75C26.211 10.789 26.9922 7.875 28.4843 5.3125L29.0782 4.27343C27.8282 3.97657 26.5625 3.78907 25.2813 3.71875C23.5703 2.39843 21.0157 0.828134 18.0703 0.335933L16.25 0L17.2968 4.83593C14.0391 5.9375 11.1719 8.1875 9.26562 9.72657C8.89843 9.42187 8.51564 9.11719 8.10939 8.82814C5.00782 6.5625 1.65625 6.34375 1.51563 6.33593L0 6.25L0.210938 7.75782C0.234375 7.91407 0.742188 11.25 2.6875 13.7343C0.742188 16.2187 0.234375 19.5547 0.210938 19.7187L0 21.25L1.51563 21.1407C1.65625 21.1328 5.00782 20.914 8.10939 18.6485C8.50782 18.3593 8.88282 18.0625 9.25 17.7578C11.1563 19.3047 14.0234 21.5547 17.289 22.6563L16.25 27.5L18.0625 27.1718C20.9922 26.6797 23.539 25.1093 25.25 23.789C26.5468 23.711 27.836 23.5235 29.1015 23.2265L28.4843 22.1953C26.9922 19.625 26.2032 16.7187 26.211 13.75Z"
                fill="white"
              />
              <path
                d="M39.0312 11.0782C38.5702 10.3047 37.742 9.13281 36.3592 7.92968C34.9217 6.69531 33.2812 5.71875 31.5155 5.03906L30.6405 6.5625C28.0624 11 28.0624 16.4843 30.6327 20.9297L31.5545 22.461C33.3045 21.789 34.9295 20.8282 36.3514 19.6093C38.828 17.461 39.9999 14.7657 39.9999 13.75C39.9999 12.789 39.3749 11.664 39.0312 11.0782ZM32.4999 13.75C31.8124 13.75 31.2499 13.1875 31.2499 12.5C31.2499 11.8125 31.8124 11.25 32.4999 11.25C33.1874 11.25 33.7499 11.8125 33.7499 12.5C33.7499 13.1875 33.1874 13.75 32.4999 13.75Z"
                fill="white"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default FFGlobalStatistics;
