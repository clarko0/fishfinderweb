import Wod from "public/wod.png";
import RaritySegment from "./RaritySegment";
import Artifact from "public/artifact.png";
import Legendary from "public/legendary.png";
import Epic from "public/epic.png";
import Rare from "public/rare.png";
import Uncommon from "public/uncommon.png";
import Common from "public/common.png";
import { useEffect, useState } from "react";
import { CaclulateFishingTime } from "@/storage/utils/tools";
import { genRanHex } from "@/storage/constants/misc";
import { Button } from "@nextui-org/react";

const images = [
  Common.src,
  Uncommon.src,
  Rare.src,
  Epic.src,
  Legendary.src,
  Artifact.src,
];

const DashboardModal = ({
  windowSize,
  updatePageData,
  componentData,
  consumableData,
  repairMode,
  fishingStatus,
  isDays,
  timer,
}: any) => {
  ///
  // const getDataByRarity = (
  //   rarity: number
  // ): { quantity: number; repairs: number } => {
  //   const defaultData = { quantity: 0, repairs: 0 };

  //   if (consumableData !== undefined) {
  //     const data = consumableData.find((item: any) => item.rarity === rarity);
  //     if (data !== undefined) {
  //       return {
  //         quantity: data.quantity,
  //         repairs: isDays ? data.repairs.in_days : data.repairs.quantity,
  //       };
  //     }
  //   }

  //   return defaultData;
  // };

  const [statusColor, setStatusColor] = useState<string>("#fff");
  const [statusText, setStatusText] = useState<string>("Not Started");

  useEffect(() => {
    switch (fishingStatus) {
      case 0:
        setStatusColor("#fff");
        setStatusText("Not Started");
        break;
      case 1:
        setStatusColor("rgb(236, 217, 119)");
        setStatusText("Starting Up");
        break;
      case 2:
        setStatusColor("rgb(57, 255, 20)");
        setStatusText("Running");
        break;
      default:
        // setStatusColor("#fff");
        // setStatusText("Not Started");
        break;
    }
  }, [fishingStatus]);

  if (!windowSize) {
    return <></>;
  }
  const { width, height } = windowSize;

  const sessions = componentData.sessions_running;

  const wodPerHour = componentData.data.farm_statistics.wod_per_hour;

  const wodFarmed = componentData.data.farm_statistics.wod_farmed;

  return (
    <div
      style={{
        width: "440px",
        height: "700px",
        position: "absolute",
        transform: width > 600 ? "scale(1)" : "scale(0.8)",
        background: "#000",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        border: "1px solid #16172E",
        borderRadius: "10px",
        top: "50%",
        zIndex: "10",
        marginTop: width > 600 ? "-300px" : "-300px",
        marginLeft: width > 1150 ? "125px" : "-220px",
        left: width > 1150 ? "0px" : "50%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontSize: "24px",
          fontWeight: "600",
          width: "160px",
          height: "60px",
          marginLeft: "140px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          marginTop: "15px",
        }}
      >
        Dashboard
      </div>
      <div
        style={{
          width: "380px",
          height: "1px",
          background: "#fff",
          marginLeft: "30px",
          marginTop: "10px",
        }}
      ></div>
      <div style={{ display: "flex", marginLeft: "30px", marginTop: "18px" }}>
        <div style={{ color: "#fff", fontWeight: "500", fontSize: "24px" }}>
          Next Repair
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            marginLeft: "70px",
          }}
        >
          <div>{timer}</div>
          <div
            style={{
              fontSize: "8px",
              display: "flex",
              fontWeight: "400",
              marginTop: "5px",
            }}
          >
            <div style={{ marginLeft: "-7px" }}>HOURS</div>
            <div style={{ marginLeft: "3px" }}>MINUTES</div>
            <div style={{ marginLeft: "3px" }}>SECONDS</div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "380px",
          height: "1px",
          background: "#fff",
          marginLeft: "30px",
          marginTop: "18px",
        }}
      ></div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "18px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>Status</div>
          <div
            style={{
              width: "150px",
              height: "40px",
              borderRadius: "30px",
              border: `1px solid ${statusColor}`,
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                background: statusColor,
                marginLeft: "20px",
                borderRadius: "999px",
              }}
            ></div>
            <div style={{ marginLeft: "15px" }}>{statusText}</div>
          </div>
        </div>
      </div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>
            Sessions Running
          </div>
          <div style={{ fontSize: "14px" }}>{sessions}/15</div>
          <div
            style={{
              marginLeft: "-30px",
              cursor: "pointer",
              display: width < 900 ? "none" : "flex",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                updatePageData("components.menu.fishing.open", true);
              }}
            >
              <path
                d="M3 21L10.5 13.5M3 21V15.4M3 21H8.6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.0711 3L13.5 10.5M21.0711 3V8.65685M21.0711 3H15.4142"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>$WoD Earned</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <img
              src={Wod.src}
              style={{
                filter: "drop-shadow(0px 0px 10px #808000)",
              }}
            />
            <div style={{ fontSize: "14px" }}>
              {wodFarmed.amount.toFixed(2)}
            </div>
            <div style={{ fontSize: "10px", color: "#777E90" }}>
              {`≈ ${wodFarmed.price.toFixed(2)} $`}
            </div>
          </div>
        </div>
      </div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>$WoD/Hour</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <img
              src={Wod.src}
              style={{
                filter: "drop-shadow(0px 0px 10px #808000)",
              }}
            />
            <div style={{ fontSize: "14px" }}>{`${wodPerHour.amount.toFixed(
              2
            )}`}</div>
            <div style={{ fontSize: "10px", color: "#777E90" }}>
              {`≈ ${wodPerHour.price.toFixed(2)} $`}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "380px",
          height: "1px",
          background: "#fff",
          marginLeft: "30px",
          marginTop: "20px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "15px",
        }}
      >
        <div
          style={{
            position: "absolute",
            display: "flex",
            fontSize: "10px",
            flexDirection: "column",
            gap: "10px",
            right: "30px",
          }}
        >
          <span
            style={{
              fontWeight: repairMode === 1 ? "600" : "500",
              transition: "0.3s",
              color: repairMode === 1 ? "#fff" : "grey",
              cursor: "pointer",
            }}
            onClick={() => {
              updatePageData("global.repair_mode", 1);
            }}
          >
            100%
          </span>
          <span
            style={{
              fontWeight: repairMode === 2 ? "600" : "500",
              transition: "0.3s",
              color: repairMode === 2 ? "#fff" : "grey",
              cursor: "pointer",
            }}
            onClick={() => {
              updatePageData("global.repair_mode", 2);
            }}
          >
            50%
          </span>
          <span
            style={{
              fontWeight: repairMode === 3 ? "600" : "500",
              transition: "0.3s",
              color: repairMode === 3 ? "#fff" : "grey",
              cursor: "pointer",
            }}
            onClick={() => {
              updatePageData("global.repair_mode", 3);
            }}
          >
            25%
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            width: "80px",
            height: "13px",
            textAlign: "right",
            color: "#777E90",
            fontSize: "8px",
            gap: "2px",
            display: "flex",
            marginTop: "33px",
            marginLeft: "-330px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: isDays ? "8px" : "10px",
              color: isDays ? "#777E90" : "#fff",
              cursor: isDays ? "pointer" : "default",
              transition: "0.5s",
            }}
            onClick={() => {
              updatePageData("global.is_days", false);
            }}
          >
            Repairs
          </span>
          /
          <span
            style={{
              fontSize: !isDays ? "8px" : "10px",
              color: !isDays ? "#777E90" : "#fff",
              cursor: !isDays ? "pointer" : "default",
              transition: "0.5s",
            }}
            onClick={() => {
              updatePageData("global.is_days", true);
            }}
          >
            Days
          </span>
        </div>
        <div
          style={{
            position: "absolute",
            width: "80px",
            height: "13px",
            textAlign: "right",
            color: "#fff",
            fontSize: "10px",
            gap: "2px",
            display: "flex",
            marginTop: "53px",
            marginLeft: "-300px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Tools
        </div>
        <div
          style={{
            display: "flex",
            width: "280px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Object.keys(consumableData)
            .map((item: any) => {
              return (
                <RaritySegment
                  key={genRanHex(24)}
                  image={images[parseInt(item) - 1]}
                  quantity={consumableData[item].amount}
                  repairs={
                    isDays
                      ? consumableData[item].repairs.in_days
                      : consumableData[item].repairs.amount
                  }
                />
              );
            })
            .reverse()}
        </div>
      </div>
      <div
        style={{
          width: "380px",
          height: "1px",
          background: "#fff",
          marginLeft: "30px",
          marginTop: "24px",
        }}
      ></div>
      <div
        style={{
          color: "#fff",
          display: width > 1150 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          marginTop: "10px",
        }}
      >
        Estimated Earnings
      </div>
      <div
        style={{
          display: width > 1150 ? "flex" : "none",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "5px",
        }}
      >
        <img src={Wod.src} />
        <div
          style={{
            color: "#fff",
            fontWeight: "600",
            fontSize: "18px",
            marginTop: "2px",
          }}
        >
          {componentData.estimated_earnings.amount &&
            componentData.estimated_earnings.amount.toFixed(2)}
        </div>
        <div style={{ color: "#777E90", fontSize: "10px" }}>{`≈ ${
          componentData.estimated_earnings.price &&
          componentData.estimated_earnings.price.toFixed(2)
        } $`}</div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {
          <Button
            color={"gradient"}
            auto
            style={{ width: "170px", height: "50px", marginTop: "10px" }}
            onPress={() => {
              updatePageData("components.menu.tool.open", true);
            }}
          >
            Buy More Tools
          </Button>
        }
      </div>
    </div>
  );
};

export default DashboardModal;
