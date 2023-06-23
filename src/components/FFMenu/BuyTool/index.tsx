import ReqBtn from "@/components/Buttons/ReqBtn";
import { fullBuyTools } from "@/storage/utils/fullMethods";
import Artifact from "public/artifact.png";
import Legendary from "public/legendary.png";
import Epic from "public/epic.png";
import Rare from "public/rare.png";
import Uncommon from "public/uncommon.png";
import Common from "public/common.png";
import RarityBtn from "./RarityBtn";
import Wod from "public/wod.png";
import { useEffect, useState } from "react";
import { genRanHex } from "@/storage/constants/misc";
import { BuyTools } from "@/storage/utils/fetch";
import { sleep } from "@/storage/utils/tools";

const images = [
  Common.src,
  Uncommon.src,
  Rare.src,
  Epic.src,
  Legendary.src,
  Artifact.src,
];

const BuyToolMenu = ({
  updatePageData,
  repairMode,
  componentData,
  consumableData,
  itemsInSets,
  isDays,
  consumablePrices,
  refetchSiteData,
}: any) => {
  const [toolsBought, setToolsBought] = useState<boolean>(false);

  const { open, formData } = componentData;

  return (
    <div
      style={{
        width: open ? "100vw" : "0px",
        height: "100vh",
        transition: "0.5s",
        overflow: "hidden",
        position: "absolute",
        display: "flex",
        zIndex: "9999",
        alignItems: "center",
        justifyContent: "center",
        backdropFilter: "blur(9px)",
      }}
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          display: "flex",
          zIndex: "9999",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(9px)",
        }}
      >
        <div
          style={{
            width: "1000px",
            height: "600px",
            background: "#303030",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "6px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "30px",
              marginTop: "48.54px",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                color: "white",
                fontWeight: "600",
                position: "absolute",
              }}
            >
              {"Buy Tools"}
            </div>
            <svg
              width="30"
              height="30"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                cursor: "pointer",
                position: "absolute",
                right: "48.54px",
              }}
              onClick={() => {
                updatePageData("components.menu.tool.open", false);
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2928 13.3053C13.4803 13.1178 13.7346 13.0125 13.9998 13.0125C14.265 13.0125 14.5193 13.1178 14.7068 13.3053L19.9998 18.5983L25.2928 13.3053C25.385 13.2098 25.4954 13.1336 25.6174 13.0812C25.7394 13.0288 25.8706 13.0012 26.0034 13C26.1362 12.9989 26.2678 13.0242 26.3907 13.0745C26.5136 13.1247 26.6253 13.199 26.7192 13.2929C26.8131 13.3868 26.8873 13.4984 26.9376 13.6213C26.9879 13.7442 27.0132 13.8759 27.012 14.0087C27.0109 14.1415 26.9833 14.2727 26.9309 14.3947C26.8785 14.5167 26.8023 14.627 26.7068 14.7193L21.4138 20.0123L26.7068 25.3053C26.8889 25.4939 26.9897 25.7465 26.9875 26.0087C26.9852 26.2709 26.88 26.5217 26.6946 26.7071C26.5092 26.8925 26.2584 26.9977 25.9962 27C25.734 27.0022 25.4814 26.9014 25.2928 26.7193L19.9998 21.4263L14.7068 26.7193C14.5182 26.9014 14.2656 27.0022 14.0034 27C13.7412 26.9977 13.4904 26.8925 13.305 26.7071C13.1196 26.5217 13.0144 26.2709 13.0121 26.0087C13.0098 25.7465 13.1106 25.4939 13.2928 25.3053L18.5858 20.0123L13.2928 14.7193C13.1053 14.5318 13 14.2775 13 14.0123C13 13.7471 13.1053 13.4928 13.2928 13.3053Z"
                fill="white"
              />
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="#CCCCCC"
                strokeWidth="2"
              />
            </svg>
          </div>
          {
            <>
              <div
                style={{
                  fontSize: "35px",
                  fontWeight: "400",
                  marginTop: " 30px",
                }}
              >
                Enter the number of repairs for all your items:
              </div>
              <div style={{}}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "right",
                        fontSize: "12px",
                        width: "50px",
                        position: "absolute",
                        marginLeft: "-60px",
                      }}
                    >
                      Rarity
                    </div>
                    {images.map((img: any, index: number) => {
                      return (
                        <RarityBtn
                          key={genRanHex(24)}
                          updatePageData={updatePageData}
                          rarity={index + 1}
                          imgSrc={img}
                          rarities={componentData.form.rarities}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div style={{}}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        textAlign: "right",
                        fontSize: "12px",
                        width: "107px",
                        position: "absolute",
                        marginLeft: "-138px",
                      }}
                    >
                      {isDays
                        ? "Current Repair Time (days)"
                        : "Current Number of Repairs"}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "55px",
                        justifyContent: "center",
                        fontWeight: "600",
                      }}
                    >
                      {Object.keys(consumableData).map((item: any) => {
                        return (
                          <div
                            key={genRanHex(24)}
                            style={{
                              fontSize: "16px",
                              width: "10px",
                              height: "12px",
                              marginLeft: "-2px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isDays
                              ? consumableData[item].repairs.in_days.toFixed(2)
                              : parseInt(consumableData[item].repairs.amount)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: "16px",
                  gap: "10px",
                  right: "30px",
                }}
              >
                <div>Repair amount</div>
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
                  width: "320px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    marginTop: "-100px",
                    background: "#303030",
                    width: "150px",
                    alignContent: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    display: "flex",
                    gap: "5px",
                    fontSize: "16px",
                    color: "#777E90",
                  }}
                >
                  <span
                    style={{
                      color: isDays ? "#777E90" : "#fff",
                      fontSize: isDays ? "" : "20px",
                      textDecoration: isDays ? "none" : "underline",
                      cursor: isDays ? "pointer" : "default",
                      transition: "0.5s",
                    }}
                    onClick={() => {
                      updatePageData("global.is_days", false);
                    }}
                  >
                    REPAIRS
                  </span>{" "}
                  /{" "}
                  <span
                    style={{
                      color: !isDays ? "#777E90" : "#fff",
                      fontSize: !isDays ? "" : "20px",
                      textDecoration: !isDays ? "" : "underline",
                      cursor: !isDays ? "pointer" : "default",
                      transition: "0.5s",
                    }}
                    onClick={() => {
                      updatePageData("global.is_days", true);
                    }}
                  >
                    DAYS
                  </span>
                </div>
                <input
                  type="number"
                  name="cost"
                  placeholder="Enter a number..."
                  value={componentData.form.tools.amount}
                  onChange={(e) => {
                    updatePageData(
                      "components.menu.tool.form.tools.amount",
                      e.target.value
                    );
                  }}
                  style={{
                    width: "320px",
                    height: "100px",
                    textAlign: "center",
                    border: "1px solid #787EFF",
                    fontWeight: "500",
                    borderRadius: "6px",
                    background: "transparent",
                    color: "#C5C5C5",
                    fontSize: "18px",
                  }}
                />
                <div
                  style={{
                    transition: "0.5s",
                    width: isDays ? "20px" : "0px",
                  }}
                ></div>
                <div
                  style={{
                    background: "#fff",
                    width: "20px",
                    height: "40px",
                    flexDirection: "column",
                    position: "absolute",
                    marginLeft: "270px",
                    borderRadius: "3px",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderTop: "1px solid #000",
                      transform: "rotate(180deg)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      if (
                        isNaN(
                          parseInt(componentData.form.tools.amount.toString())
                        )
                      ) {
                        updatePageData(
                          "components.menu.tool.form.tools.amount",
                          1
                        );
                      } else {
                        updatePageData(
                          "components.menu.tool.form.tools.amount",
                          parseInt(componentData.form.tools.amount.toString()) +
                            1
                        );
                      }
                    }}
                  >
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 6 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.00001 3.66666L0.333339 0.99999L1.03334 0.266656L3.00001 2.23332L4.96667 0.266656L5.66667 0.99999L3.00001 3.66666Z"
                        fill={"rgba(53, 57, 69, 1)"}
                      />
                    </svg>
                  </div>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      if (
                        isNaN(
                          parseInt(componentData.form.tools.amount.toString())
                        )
                      ) {
                        updatePageData(
                          "components.menu.tool.form.tools.amount",
                          0
                        );
                      } else {
                        if (
                          parseInt(componentData.form.tools.amount.toString()) -
                            1 >=
                          0
                        ) {
                          updatePageData(
                            "components.menu.tool.form.tools.amount",
                            parseInt(
                              componentData.form.tools.amount.toString()
                            ) + -1
                          );
                        } else {
                          updatePageData(
                            "components.menu.tool.form.tools.amount",
                            0
                          );
                        }
                      }
                    }}
                  >
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 6 4"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.00001 3.66666L0.333339 0.99999L1.03334 0.266656L3.00001 2.23332L4.96667 0.266656L5.66667 0.99999L3.00001 3.66666Z"
                        fill={"rgba(53, 57, 69, 1)"}
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </>
          }
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontWeight: "500",
              }}
            >
              Use Offchain $WoD?
              <input
                style={{ marginLeft: "7px" }}
                type="checkbox"
                onClick={() => {
                  updatePageData(
                    "components.menu.tool.form.offchain_wod",
                    !componentData.form.offchain_wod
                  );
                }}
              />
            </div>

            <div
              style={{
                fontWeight: "600",
                fontSize: "24px",
                color: "#fff",
              }}
            >
              Total Cost
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "500",
              }}
            >
              <img src={Wod.src} />
              <div>{componentData.form.tools.price.toFixed(2)}</div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#4F4F4F",
                }}
              >
                ($
                {componentData.form.tools.usd.toFixed(2)})
              </div>
            </div>
          </div>

          <ReqBtn
            width={"250px"}
            height={"60px"}
            condition={
              !(
                isNaN(parseInt(componentData.form.tools.amount.toString())) ||
                parseInt(componentData.form.tools.amount.toString()) === 0
              )
            }
            text="Buy"
            func={() => {
              let factor = 4;
              if (repairMode === 1) {
              } else if (repairMode === 2) {
                factor = 2;
              } else if (repairMode === 3) {
                factor = 1;
              }
              componentData.form.offchain_wod
                ? BuyTools(
                    isDays
                      ? parseInt(componentData.form.tools.amount.toString()) *
                          factor
                      : parseInt(componentData.form.tools.amount.toString()),
                    componentData.form.rarities,
                    itemsInSets,
                    consumablePrices[repairMode]
                  ).then(() => {
                    setToolsBought(true);
                    refetchSiteData();
                    sleep(5000).then(() => {
                      setToolsBought(false);
                    });
                  })
                : fullBuyTools(
                    isDays
                      ? parseInt(componentData.form.tools.amount.toString()) *
                          factor
                      : parseInt(componentData.form.tools.amount.toString()),
                    itemsInSets,
                    componentData.form.rarities
                  );
            }}
          />
        </div>
      </div>
      <div
        style={{
          width: "300px",
          transition: "0.5s margin-left, 0.3s opacity",
          opacity: toolsBought ? "1" : "0",
          marginTop: "750px",
          marginLeft: toolsBought ? "" : "-500px",
          height: "75px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          fontWeight: "600",
          background: "#000",
          padding: "20px",
          gap: "10px",
          zIndex: "9999",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="16"
            cy="16"
            r="12"
            stroke="#30C04F"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M11.3334 16.6667L13.5347 19.4184C13.783 19.7287 14.2458 19.7543 14.5267 19.4733L20.6667 13.3333"
            stroke="#30C04F"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        Tools successfully bought
      </div>
    </div>
  );
};

export default BuyToolMenu;
