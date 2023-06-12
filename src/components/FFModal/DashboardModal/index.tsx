import Wod from "public/wod.png";
import RaritySegment from "./RaritySegment";
import Artifact from "public/artifact.png";
import Legendary from "public/legendary.png";
import Epic from "public/epic.png";
import Rare from "public/rare.png";
import Uncommon from "public/uncommon.png";
import Common from "public/common.png";
import { useEffect } from "react";
import { CaclulateFishingTime } from "@/storage/utils/tools";
import { genRanHex } from "@/storage/constants/misc";
import { Button, Tooltip } from "@nextui-org/react";

const DashboardModal = ({
  size,
  timer,
  statusColor,
  sessions,
  setIsActiveSessionMenu,
  wodFarmed,
  wodFarmedPrice,
  wodPerHour,
  wodPerHourPrice,
  status,
  gettingSessions,
  toolMenuData,
  consumableData,
  setToolMenuData,
  userData,
  setIsToolsMenu,
  is25Repair,
  setIs25Repair,
  is50Repair,
  setIs50Repair,
  is100Repair,
  setIs100Repair,
}: any) => {
  const getQuantityByRarity = (rarity: number) =>
    (consumableData !== undefined &&
      consumableData.find((item: any) => item.rarity === rarity)?.quantity) ||
    0;

  return (
    <div
      style={{
        width: "440px",
        height: "700px",
        position: "absolute",
        transform: size.width > 600 ? "scale(1)" : "scale(0.8)",
        background: "#000",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        border: "1px solid #16172E",
        borderRadius: "10px",
        top: "50%",
        zIndex: "10",
        marginTop: size.width > 600 ? "-300px" : "-300px",
        marginLeft: size.width > 1150 ? "125px" : "-220px",
        left: size.width > 1150 ? "0px" : "50%",
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
            <div style={{ marginLeft: "15px" }}>
              {status === "Pending" ? "Starting Up" : status}
            </div>
          </div>
        </div>
      </div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "22px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>
            Sessions Running
          </div>
          <div style={{ fontSize: "14px" }}>
            {sessions !== undefined ? (
              gettingSessions ? (
                <div
                  style={{
                    width: "50px",
                    height: "14px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                sessions.length
              )
            ) : (
              "0"
            )}
            {!gettingSessions && `/15`}
          </div>
          <div
            style={{
              marginLeft: "-30px",
              cursor: "pointer",
              display: size.width < 900 || gettingSessions ? "none" : "flex",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setIsActiveSessionMenu(true);
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
              {gettingSessions ? (
                <div
                  style={{
                    width: "80px",
                    height: "14px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                wodFarmed.toFixed(2)
              )}
            </div>
            <div style={{ fontSize: "10px", color: "#777E90" }}>
              {gettingSessions ? (
                <div
                  style={{
                    width: "40px",
                    height: "10px",
                    background: "#4F4F4F",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                `≈ ${wodFarmedPrice.toFixed(2)} $`
              )}
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
            <div style={{ fontSize: "14px" }}>
              {status === "Pending" ? (
                "Loading..."
              ) : gettingSessions ? (
                <div
                  style={{
                    width: "80px",
                    height: "14px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                `${wodPerHour.toFixed(2)}`
              )}
            </div>
            <div style={{ fontSize: "10px", color: "#777E90" }}>
              {gettingSessions ? (
                <div
                  style={{
                    width: "40px",
                    height: "10px",
                    background: "#4F4F4F",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                `≈ ${wodPerHourPrice.toFixed(2)} $`
              )}
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
              fontWeight: is100Repair ? "600" : "500",
              transition: "0.3s",
              color: is100Repair ? "#fff" : "grey",
              cursor: "pointer",
            }}
            onClick={() => {
              setIs100Repair(true);
              setIs25Repair(false);
              setIs50Repair(false);
            }}
          >
            100%
          </span>
          <span
            style={{
              fontWeight: is50Repair ? "600" : "500",
              transition: "0.3s",
              color: is50Repair ? "#fff" : "grey",
              cursor: "pointer",
            }}
            onClick={() => {
              setIs100Repair(false);
              setIs25Repair(false);
              setIs50Repair(true);
            }}
          >
            50%
          </span>
          <span
            style={{
              fontWeight: is25Repair ? "600" : "500",
              transition: "0.3s",
              color: is25Repair ? "#fff" : "grey",
              cursor: "pointer",
            }}
            onClick={() => {
              setIs100Repair(false);
              setIs25Repair(true);
              setIs50Repair(false);
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
              fontSize: toolMenuData.isDays ? "8px" : "10px",
              color: toolMenuData.isDays ? "#777E90" : "#fff",
              cursor: toolMenuData.isDays ? "pointer" : "default",
              transition: "0.5s",
            }}
            onClick={() => {
              setToolMenuData({ ...toolMenuData, isDays: false });
            }}
          >
            Repairs
          </span>
          /
          <span
            style={{
              fontSize: !toolMenuData.isDays ? "8px" : "10px",
              color: !toolMenuData.isDays ? "#777E90" : "#fff",
              cursor: !toolMenuData.isDays ? "pointer" : "default",
              transition: "0.5s",
            }}
            onClick={() => {
              setToolMenuData({ ...toolMenuData, isDays: true });
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
          <RaritySegment
            key={genRanHex(64)}
            image={Artifact.src}
            topNum={toolMenuData.toolVals[6]}
            tools={getQuantityByRarity(6)}
          />
          <RaritySegment
            key={genRanHex(64)}
            image={Legendary.src}
            topNum={toolMenuData.toolVals[5]}
            tools={getQuantityByRarity(5)}
          />
          <RaritySegment
            key={genRanHex(64)}
            image={Epic.src}
            topNum={toolMenuData.toolVals[4]}
            tools={getQuantityByRarity(4)}
          />
          <RaritySegment
            key={genRanHex(64)}
            image={Rare.src}
            topNum={toolMenuData.toolVals[3]}
            tools={getQuantityByRarity(3)}
          />
          <RaritySegment
            key={genRanHex(64)}
            image={Uncommon.src}
            topNum={toolMenuData.toolVals[2]}
            tools={getQuantityByRarity(2)}
          />
          <RaritySegment
            key={genRanHex(64)}
            image={Common.src}
            topNum={toolMenuData.toolVals[1]}
            tools={getQuantityByRarity(1)}
          />
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
          display: size.width > 1150 ? "flex" : "none",
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
          display: size.width > 1150 ? "flex" : "none",
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
          {gettingSessions ? (
            <div
              style={{
                width: "50px",
                height: "20px",
                background: "#fff",
                borderRadius: "3px",
              }}
            ></div>
          ) : userData.isReady ? (
            (
              wodPerHour *
              (CaclulateFishingTime(userData.items, userData.tools).seconds /
                3600)
            ).toFixed(2)
          ) : (
            "0.00"
          )}
        </div>
        <div style={{ color: "#777E90", fontSize: "10px" }}>
          {gettingSessions ? (
            <div
              style={{
                width: "50px",
                height: "12px",
                background: "rgb(79, 79, 79)",
                borderRadius: "3px",
              }}
            ></div>
          ) : userData.isReady ? (
            `≈ ${(
              wodPerHourPrice *
              (CaclulateFishingTime(userData.items, userData.tools).seconds /
                3600)
            ).toFixed(2)} $`
          ) : (
            "≈ 0.00 $"
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!gettingSessions && (
          <Button
            color={"gradient"}
            auto
            style={{ width: "170px", height: "50px", marginTop: "10px" }}
            onClick={() => {
              setIsToolsMenu(true);
            }}
          >
            Buy More Tools
          </Button>
        )}
      </div>
    </div>
  );
};

export default DashboardModal;
