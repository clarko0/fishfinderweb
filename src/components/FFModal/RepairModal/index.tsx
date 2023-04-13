import { CaclulateFishingTime } from "@/storage/utils/tools";
import Rarity from "public/rarity.png";
import Wod from "public/wod.png";

const RepairModal = ({
  size,
  userData,
  fishingTime,
  wodPerHour,
  wodPerHourPrice,
  setIsToolsMenu,
  gettingSessions,
}: any) => {
  return (
    <div
      style={{
        width: "440px",
        height: "700px",
        position: "absolute",
        background: "#000",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        border: "1px solid #16172E",
        borderRadius: "10px",
        top: "50%",
        right: "0px",
        zIndex: "10",
        marginTop: "-300px",
        marginRight: "125px",
        display: size.width > 1150 ? "block" : "none",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontSize: "30px",
          fontWeight: "600",
          width: "215px",
          height: "60px",
          marginLeft: "112.5px",
          userSelect: "none",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        Your Tools
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
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", marginLeft: "30px", marginTop: "30px" }}>
          <div>
            <img src={Rarity.src} />
          </div>
          <div
            style={{
              color: "#fff",
              marginTop: "15px",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              marginLeft: "10px",
              fontWeight: "600",
            }}
          >
            <div>
              {gettingSessions ? (
                <div
                  style={{
                    width: "50px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : userData.tools[5] ? (
                userData.tools[5].quantity
              ) : (
                0
              )}
            </div>
            <div>
              {gettingSessions ? (
                <div
                  style={{
                    width: "50px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : userData.tools[4] ? (
                userData.tools[4].quantity
              ) : (
                0
              )}
            </div>
            <div>
              {gettingSessions ? (
                <div
                  style={{
                    width: "50px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : userData.tools[3] ? (
                userData.tools[3].quantity
              ) : (
                0
              )}
            </div>
            <div>
              {gettingSessions ? (
                <div
                  style={{
                    width: "50px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : userData.tools[2] ? (
                userData.tools[2].quantity
              ) : (
                0
              )}
            </div>
            <div>
              {gettingSessions ? (
                <div
                  style={{
                    width: "50px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : userData.tools[1] ? (
                userData.tools[1].quantity
              ) : (
                0
              )}
            </div>
            <div>
              {gettingSessions ? (
                <div
                  style={{
                    width: "50px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : userData.tools[0] ? (
                userData.tools[0].quantity
              ) : (
                0
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            marginLeft: "70px",
            color: "#fff",
            marginTop: "30px",
            width: "50%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              fontWeight: "600",
              color: "#fff",
              fontSize: "20px",
              width: "200px",
              textAlign: "center",
              marginLeft: "",
            }}
          >
            Estimated Fishing Time:
          </div>
          <div
            style={{ fontWeight: "600", fontSize: "20px", marginTop: "10px" }}
          >
            {gettingSessions ? (
              <div
                style={{
                  width: "190px",
                  height: "20px",
                  marginLeft: "7px",
                  background: "#fff",
                  borderRadius: "3px",
                }}
              ></div>
            ) : (
              fishingTime
            )}
            <div
              style={{
                fontSize: "8px",
                display: "flex",
                fontWeight: "400",
                marginTop: "5px",
              }}
            >
              <div style={{ marginLeft: "-9px" }}>MONTHS</div>
              <div style={{ marginLeft: "18.5px" }}>DAYS</div>
              <div style={{ marginLeft: "18.5px" }}>HOURS</div>
              <div style={{ marginLeft: "10px" }}>MINUTES</div>
              <div style={{ marginLeft: "12px" }}>SECONDS</div>
            </div>
          </div>
          <div
            style={{
              fontWeight: "600",
              color: "#fff",
              width: "185px",
              fontSize: "20px",
              textAlign: "center",
              marginLeft: "",
              marginTop: "30px",
            }}
          >
            Estimated Yield:
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              marginTop: "10px",
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
                    width: "50px",
                    height: "20px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : userData.isReady ? (
                (
                  wodPerHour *
                  (CaclulateFishingTime(userData.items, userData.tools)
                    .seconds /
                    3600)
                ).toFixed(2)
              ) : (
                "0.00"
              )}
            </div>
            <div style={{ fontSize: "10px", color: "#4F4F4F" }}>
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
                `($${(
                  wodPerHourPrice *
                  (CaclulateFishingTime(userData.items, userData.tools)
                    .seconds /
                    3600)
                ).toFixed(2)})`
              ) : (
                "($0.00)"
              )}
            </div>
          </div>
          {!gettingSessions && (
            <div
              onClick={() => {
                setIsToolsMenu(true);
              }}
              style={{
                border: "1px solid #3366CC",
                fontWeight: "600",
                borderRadius: "6px",
                width: "170px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "25px",
                height: "80px",
                cursor: "pointer",
              }}
            >
              Buy More Tools
            </div>
          )}
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
    </div>
  );
};

export default RepairModal;
