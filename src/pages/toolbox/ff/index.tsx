import Navbar from "@/components/Navbar";
import {
  ICanFish,
  IItem,
  IItems,
  IItemSet,
  IStylingObject,
  ITool,
  IUserData,
} from "@/storage/constants/interfaces";
import { STYLING } from "@/storage/constants/styling";
import {
  CaclulateFishingTime,
  calculateToolCost,
  GetTokenPrice,
  useWindowSize,
} from "@/storage/utils/tools";
import ItemsPNG from "@/storage/png/ItemsPNG";
import {
  endAutoFishing,
  pingFishing,
  startAutoFishing,
} from "@/storage/utils/api";
import {
  endSession,
  GetActiveZone,
  GetAllConsumablePrices,
  GetItems,
  getSessionInfo,
  GetTools,
  GetUserdata,
  getUsersStats,
} from "@/storage/utils/fetch";
import { CheckTheme, FFWelcomeMessage } from "@/storage/utils/local";
import Rarity from "public/rarity.png";
import Wod from "public/wod.png";
import { createRef, RefObject, useEffect, useRef, useState } from "react";
import { isDocked } from "@/storage/utils/window";
import {
  ApprovalForAllWodTools,
  approveAll,
  approveTokens,
  bulkBuyOrder,
  buyOrder,
  buyTools,
  createOrder,
  getWodBalance,
  isApproveAll,
  isUnlimitedApprove,
  isUnlimitedApproveTools,
} from "@/storage/utils/method";
import Router from "next/router";
import MetaMaskLoadingSVG from "@/storage/svg/MetaMaskLoadingSVG";
import Seahorse from "public/lowpolyseahorse.png";
import Fish from "public/lowpolyfish.png";

const FishermanFriend = () => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isEndFishingMenu, setIsEndFishingMenu] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [isDark, setIsDark] = useState<boolean>(false);
  const [wodFarmed, setWodFarmed] = useState<number>(0);
  const [activeSessionData, setActiveSessionData] = useState<any>({});
  const [playerLevel, setPlayerLevel] = useState<number>(0);
  const [status, setStatus] = useState<string>("Not Started");
  const [sessions, setSessions] = useState<any[]>([]);
  const [statusColor, setStatusColor] = useState<string>("#fff");
  const [isConfirmationMenu, setIsConfirmationMenu] = useState<boolean>(false);
  const [isActiveSessionMenu, setIsActiveSessionMenu] =
    useState<boolean>(false);
  const size = useWindowSize();
  const [endingFishing, setEndingFishing] = useState<boolean>(false);
  const [isWelcomeMenu, setIsWelcomeMenu] = useState<boolean | undefined>(
    FFWelcomeMessage()
  );
  const [numberOfRepairs, setNumberOfRepairs] = useState<number | string>("");
  const repairInput = createRef<HTMLInputElement>();
  const [repairValues, setRepairValues] = useState<any>({
    1: true,
    2: false,
    3: false,
  });
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    avatar: "",
    tools: [],
    items: {
      common: [],
      uncommon: [],
      rare: [],
      epic: [],
      legendary: [],
      artifact: [],
    },
    isReady: false,
  });
  const [wodOnSignup, setWodOnSignup] = useState<number>(0);
  const [timer, setTimer] = useState("00 : 00 : 00");
  const [fishingTime, setFishingTime] = useState("00 : 00 : 00 : 00 : 00");
  const [isFishing, setIsFishing] = useState<boolean>(false);
  const [nextRepair, setNextRepair] = useState<string>("");
  const [isFishingMenu, setIsFishingMenu] = useState<boolean>(false);
  const [wodFarmedPrice, setWodFarmedPrice] = useState<number>(0.0);
  const [timerCount, setTimerCount] = useState<number>(0);
  const [wodPerHour, setWodPerHour] = useState<number>(0.0);
  const [cards, setCards] = useState<any[]>([]);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [wodPerHourPrice, setWodPerHourPrice] = useState<number>(0.0);
  const [isToolsMenu, setIsToolsMenu] = useState<boolean>(false);
  const timerCountRef = useRef(0);
  const [toolCost, setToolCost] = useState<number>(0);
  const [isToolsConfirmationMenu, setIsToolsConfirmationMenu] =
    useState<boolean>(false);
  const [canFish, setCanFish] = useState<ICanFish>({
    hasSets: false,
    isRepaired: true,
  });
  const [consumableData, setConsumableData] = useState<any>({
    1: [],
    2: [],
    3: [],
  });

  // useEffect(() => {
  //   Router.push("/coming-soon");
  // }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!isNaN(parseInt(numberOfRepairs.toString()))) {
      for (const i in repairValues) {
        if (repairValues[i]) {
          setToolCost(
            calculateToolCost(
              numberOfRepairs,
              consumableData,
              i,
              userData.items
            )
          );
          return;
        }
      }
    }
    setToolCost(0);
  }, [numberOfRepairs, repairValues]);

  useEffect(() => {
    const cards: any[] = [];
    let total: number = 0;
    let sessionWod: number = 0;

    for (let i = 0; i < activeSessionData.length; i++) {
      const items: any[] = [];
      total +=
        activeSessionData[i].fishing_session?.wod_multiplier *
        parseFloat(activeSessionData[i].wod_rate) *
        60 *
        60 *
        (1 - activeSessionData[i].fee / 100);
      sessionWod += activeSessionData[i].fishing_session.last_saved_wod_earned;
      for (
        let x = 0;
        x < activeSessionData[i].fishing_session.slot_items.length;
        x++
      ) {
        const item = activeSessionData[i].fishing_session.slot_items[x];
        items.push(
          <img style={{ width: "80px", height: "120px" }} src={item.image} />
        );
      }
      cards.push(
        <div style={{ display: "flex", gap: "30px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>{items}</div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "500" }}>ZONE</div>
              <div
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  if (isDocked()) {
                    window.open(
                      `https://game.worldofdefish.com/zone/${activeSessionData[i].id}/fishing`
                    );
                  }
                }}
              >
                {activeSessionData[i].id}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "500" }}>
                $WoD/HOUR
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  width="20px"
                  src={Wod.src}
                  style={{
                    filter: "drop-shadow(0px 0px 10px #808000)",
                  }}
                />
                {(
                  activeSessionData[i].fishing_session?.wod_multiplier *
                  parseFloat(activeSessionData[i].wod_rate) *
                  60 *
                  60 *
                  (1 - activeSessionData[i].fee / 100)
                ).toFixed(2)}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "20px", fontWeight: "500" }}>
                $WoD EARNED
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={Wod.src}
                  width="20px"
                  style={{
                    filter: "drop-shadow(0px 0px 10px #808000)",
                  }}
                />
                <div>
                  {activeSessionData[
                    i
                  ].fishing_session.last_saved_wod_earned.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      setCards(cards);
    }
    setWodPerHour(Number(total.toFixed(2)));
    GetTokenPrice(Number(total.toFixed(2))).then((result) => {
      setWodPerHourPrice(Number(result.toFixed(2)));
    });
  }, [activeSessionData]);

  useEffect(() => {
    setPageLoading(true);
    getUsersStats().then((res) => {
      let wod_balance: number = res.data.total_wod;

      pingFishing(wod_balance).then(async (res) => {
        setStatus(res.data.status);
        setIsFishing(res.data.bool);
        setSessions(res.data.sessions);
        setSessionId(res.data.session_id);
        setWodOnSignup(res.data.wod_signup);
        setNextRepair(res.data.next_repair);
        setPageLoading(false);
        const consumablePrices: any = await GetAllConsumablePrices();
        const cData: any = {
          1: [],
          2: [],
          3: [],
        };
        for (let i = 0; i < consumablePrices.length; i++) {
          if (
            consumablePrices[i].rarity !== undefined &&
            consumablePrices[i].repairNum !== undefined &&
            consumablePrices[i].repairNum !== undefined
          ) {
            if (consumablePrices[i].repairNum === 25) {
              cData[3].push(consumablePrices[i]);
            } else if (consumablePrices[i].repairNum === 50) {
              cData[2].push(consumablePrices[i]);
            } else {
              cData[1].push(consumablePrices[i]);
            }
          }
        }
        setConsumableData(cData);
        const currentWod: any = await getUsersStats();
        let wod: any = currentWod.data.total_wod - res.data.wod_signup;
        if (res.data.bool) {
          GetActiveZone().then(async (res) => {
            let zoneIds: any = res.data;
            let items: IItems = {
              common: [],
              uncommon: [],
              rare: [],
              epic: [],
              legendary: [],
              artifact: [],
            };
            const sessionInfo: any = await getSessionInfo(zoneIds);
            for (let i = 0; i < sessionInfo.length; i++) {
              for (
                let z = 0;
                z < sessionInfo[i].fishing_session.slot_items.length;
                z++
              ) {
                let item = sessionInfo[i].fishing_session.slot_items[z];
                if (item.rarity === 1) {
                  items.common.push(item);
                } else if (item.rarity === 2) {
                  items.uncommon.push(item);
                } else if (item.rarity === 3) {
                  items.rare.push(item);
                } else if (item.rarity === 4) {
                  items.epic.push(item);
                } else if (item.rarity === 5) {
                  items.legendary.push(item);
                } else if (item.rarity === 6) {
                  items.artifact.push(item);
                }
              }
              wod += sessionInfo[i].fishing_session.last_saved_wod_earned;
            }
            setUserData((prevUserData: IUserData) => ({
              ...prevUserData,
              items: items,
            }));
            setActiveSessionData(sessionInfo);
          });
        }
        setWodFarmed(Number(wod.toFixed(2)));
        GetTokenPrice(Number(wod.toFixed(2))).then((result) => {
          setWodFarmedPrice(Number(result.toFixed(2)));
        });
      });
      const interval = setInterval(() => {
        pingFishing(wod_balance).then(async (res) => {
          setStatus(res.data.status);
          setIsFishing(res.data.bool);
          setSessions(res.data.sessions);
          setSessionId(res.data.session_id);
          setWodOnSignup(res.data.wod_signup);
          setNextRepair(res.data.next_repair);
          const currentWod: any = await getUsersStats();
          let wod: any = currentWod.data.total_wod - res.data.wod_signup;
          if (res.data.bool) {
            GetActiveZone().then(async (res) => {
              let zoneIds: any = res.data;
              const sessionInfo: any = await getSessionInfo(zoneIds);
              for (let i = 0; i < sessionInfo.length; i++) {
                wod += sessionInfo[i].fishing_session.last_saved_wod_earned;
              }
              setActiveSessionData(sessionInfo);
            });
          }
          setWodFarmed(Number(wod.toFixed(2)));
          GetTokenPrice(Number(wod.toFixed(2))).then((result) => {
            setWodFarmedPrice(Number(result.toFixed(2)));
          });
        });
        timerCountRef.current += 1;
      }, 60000);

      return () => clearInterval(interval);
    });
  }, []);

  useEffect(() => {
    if (isFishing) {
      setStatusColor("#39ff14");
    } else if (status === "Pending") {
      setStatusColor("#FFAD00");
    } else {
      setStatusColor("#fff");
    }
  }, [status]);

  useEffect(() => {
    var timeZoneOffset = new Date().getTimezoneOffset() / 60 + 1;
    var targetTime = new Date(nextRepair);
    targetTime.setHours(targetTime.getHours() - timeZoneOffset);
    const targetMS = targetTime.getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeToTarget = (targetMS - now) / 1000;
      const hours = `0${Math.floor(timeToTarget / 3600)}`.slice(-2);
      const minutes = `0${Math.floor((timeToTarget % 3600) / 60)}`.slice(-2);
      const seconds = `0${Math.floor(timeToTarget % 60)}`.slice(-2);
      setTimer(`${hours} : ${minutes} : ${seconds}`);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [nextRepair]);

  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
    let tools: ITool[] = [];
    GetTools().then((res: any) => {
      const result = res.data;
      for (let i = 0; i < result.length; i++) {
        const element = result[i];
        if (element.repair_amount === 25) {
          const tool: ITool = {
            name: element.name,
            quantity: element.quantity,
            rarity: element.rarity,
          };
          tools[tool.rarity - 1] = tool;
        }
      }
      GetItems().then((res: any) => {
        const items: IItems = {
          common: [],
          uncommon: [],
          rare: [],
          epic: [],
          legendary: [],
          artifact: [],
        };
        const validateDura: any[] = [];
        let setItems: IItemSet = {};
        const result = res.data;
        for (let i = 0; i < result.length; i++) {
          const element = result[i];
          if (element.is_teleported) {
            const item: IItem = {
              name: element.name,
              id: element.id,
              image: element.rendered_image_url,
              slot_key: element.slot_key,
              wod_multiplier: element.wod_multiplier,
              rarity: element.rarity,
              durability: element.local_state.durability,
            };
            validateDura.push(element.local_state.durability);
            try {
              setItems[element.slot_key].push(element);
            } catch (e) {
              setItems[element.slot_key] = [];
              setItems[element.slot_key].push(element);
            }
            if (item.rarity === 1) {
              items.common.push(item);
            } else if (item.rarity === 2) {
              items.uncommon.push(item);
            } else if (item.rarity === 3) {
              items.rare.push(item);
            } else if (item.rarity === 4) {
              items.epic.push(item);
            } else if (item.rarity === 5) {
              items.legendary.push(item);
            } else if (item.rarity === 6) {
              items.artifact.push(item);
            }
          }
        }
        let validation: ICanFish = {
          hasSets: true,
          isRepaired: true,
        };
        for (let i = 0; i < validateDura.length; i++) {
          if (validateDura[i] !== 100) {
            validation.isRepaired = true;
          }
        }
        const required: any[] = ["float", "hook", "rod", "line", "reel"];
        for (let i = 0; i < required.length; i++) {
          if (!(required[i] in setItems)) {
            validation.hasSets = false;
          }
        }
        setCanFish(validation);
        GetUserdata().then((res: any) => {
          setPlayerLevel(res.data.character.level);
          setUserData({
            username: "@" + res.data.nickname,
            avatar:
              res.data.avatar_url === null
                ? "https://ynnovate.it/wp-content/uploads/2015/04/default-avatar.png"
                : res.data.avatar_url,
            tools: tools,
            items: items,
            isReady: true,
          });
        });
      });
    });
  }, []);

  useEffect(() => {
    if (userData.isReady) {
      setFishingTime(
        CaclulateFishingTime(userData.items, userData.tools).string
      );
    }
  }, [userData]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: styling.background_main,
        transition: "0.5s",
        userSelect: "none",
      }}
    >
      <Navbar
        avatar={userData.avatar}
        username={userData.username}
        styling={styling}
      />
      <div
        style={{
          fontWeight: "700",
          fontSize: "48px",
          alignItems: "center",
          position: "absolute",
          left: "50%",
          marginLeft: "-300px",
          justifyContent: "center",
          color: styling.font_primary,
          userSelect: "none",
          top: "200px",
          width: "600px",
          display: size.width > 1650 ? "flex" : "none",
        }}
      >
        Fisherman&apos;s Friend
      </div>
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
            fontSize: "30px",
            fontWeight: "600",
            width: "160px",
            height: "60px",
            marginLeft: "140px",
            userSelect: "none",
            marginTop: "40px",
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
            marginTop: "20px",
          }}
        ></div>
        <div style={{ display: "flex", marginLeft: "30px", marginTop: "30px" }}>
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
            marginTop: "30px",
          }}
        ></div>
        <div style={{ color: "#fff", marginLeft: "30px", marginTop: "30px" }}>
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
        <div style={{ color: "#fff", marginLeft: "30px", marginTop: "30px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <div style={{ fontSize: "20px", fontWeight: "500" }}>
              Sessions Running
            </div>
            <div style={{ fontSize: "14px" }}>
              {sessions !== undefined ? sessions.length : "0"}/15
            </div>
            <div style={{ marginLeft: "-30px", cursor: "pointer" }}>
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
        <div style={{ color: "#fff", marginLeft: "30px", marginTop: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            <div style={{ fontSize: "20px", fontWeight: "500" }}>
              $WoD Earned
            </div>
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
              <div style={{ fontSize: "14px" }}>{wodFarmed}</div>
              <div style={{ fontSize: "10px", color: "#4F4F4F" }}>
                ${wodFarmedPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        <div style={{ color: "#fff", marginLeft: "30px", marginTop: "40px" }}>
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
                {status === "Pending" ? "Loading..." : wodPerHour.toFixed(2)}
              </div>
              <div style={{ fontSize: "10px", color: "#4F4F4F" }}>
                ${wodPerHourPrice.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
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
          <div
            style={{ display: "flex", marginLeft: "30px", marginTop: "30px" }}
          >
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
              <div>{userData.tools[5] ? userData.tools[5].quantity : 0}</div>
              <div>{userData.tools[4] ? userData.tools[4].quantity : 0}</div>
              <div>{userData.tools[3] ? userData.tools[3].quantity : 0}</div>
              <div>{userData.tools[2] ? userData.tools[2].quantity : 0}</div>
              <div>{userData.tools[1] ? userData.tools[1].quantity : 0}</div>
              <div>{userData.tools[0] ? userData.tools[0].quantity : 0}</div>
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
              {fishingTime}
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
                {userData.isReady
                  ? (
                      wodPerHour *
                      (CaclulateFishingTime(userData.items, userData.tools)
                        .seconds /
                        3600)
                    ).toFixed(2)
                  : "0.00"}
              </div>
              <div style={{ fontSize: "10px", color: "#4F4F4F" }}>
                ($
                {userData.isReady
                  ? (
                      wodPerHourPrice *
                      (CaclulateFishingTime(userData.items, userData.tools)
                        .seconds /
                        3600)
                    ).toFixed(2)
                  : "0.00"}
                )
              </div>
            </div>
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
      <div
        style={{
          width: "400px",
          transform: size.width > 600 ? "scale(1)" : "scale(0.8)",
          height: "80px",
          cursor: "pointer",
          userSelect: "none",
          position: "fixed",
          zIndex: "10",
          left: size.width > 1650 ? "50%" : size.width > 1150 ? "345px" : "50%",
          marginLeft: "-200px",
          top: "70%",
          marginTop:
            size.width > 1650 ? "0px" : size.width > 600 ? "50px" : "50px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          background: styling.inverse_btn_primary,
          borderRadius: "3px",
          fontSize: "30px",
          boxShadow: styling.inverse_btn_glow,
        }}
        onClick={async () => {
          if (isFishing || status === "Pending") {
            setIsEndFishingMenu(true);
          } else {
            await startAutoFishing(playerLevel);
            window.location.reload();
          }
        }}
      >
        {isFishing || status === "Pending" ? "End Fishing" : "Start Fishing"}
      </div>
      {isFishingMenu && (
        <div
          style={{
            position: "absolute",
            zIndex: "9999",
            width: "100vw",
            height: "100vh",
            backdropFilter: "blur(9px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "1200px",
              height: "700px",
              background: "#303030",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontWeight: "600",
                fontSize: "40px",
                marginTop: "30px",
                marginLeft: "30px",
                display: "flex",
                gap: "830px",
                alignItems: "center",
              }}
            >
              Start Fishing
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsFishingMenu(false);
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
            <div
              style={{ color: "white", marginLeft: "30px", marginTop: "40px" }}
            >
              <div style={{ fontSize: "20px", fontWeight: "500" }}>
                Requirements
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "30px",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontWeight: "500",
                    fontSize: "14px",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  {canFish.hasSets && (
                    <svg
                      width="31"
                      height="22"
                      viewBox="0 0 31 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 11L11 20L29 2"
                        stroke="#00FF00"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {!canFish.hasSets && (
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.564173 0.588263C0.925522 0.227023 1.41555 0.0240898 1.9265 0.0240898C2.43745 0.0240898 2.92747 0.227023 3.28882 0.588263L13.488 10.7874L23.6871 0.588263C23.8648 0.404224 24.0775 0.257427 24.3126 0.15644C24.5476 0.0554523 24.8005 0.00229605 25.0563 7.27544e-05C25.3122 -0.00215055 25.5659 0.0466031 25.8027 0.14349C26.0396 0.240377 26.2547 0.383456 26.4356 0.564378C26.6165 0.745301 26.7596 0.960444 26.8565 1.19725C26.9534 1.43406 27.0022 1.6878 26.9999 1.94365C26.9977 2.19951 26.9445 2.45236 26.8436 2.68745C26.7426 2.92254 26.5958 3.13516 26.4117 3.31291L16.2126 13.512L26.4117 23.7112C26.7627 24.0746 26.957 24.5613 26.9526 25.0666C26.9482 25.5718 26.7455 26.0551 26.3883 26.4124C26.031 26.7696 25.5477 26.9723 25.0425 26.9767C24.5372 26.9811 24.0505 26.7868 23.6871 26.4358L13.488 16.2367L3.28882 26.4358C2.9254 26.7868 2.43866 26.9811 1.93343 26.9767C1.4282 26.9723 0.94491 26.7696 0.587645 26.4124C0.230381 26.0551 0.0277293 25.5718 0.023339 25.0666C0.0189487 24.5613 0.213171 24.0746 0.564173 23.7112L10.7633 13.512L0.564173 3.31291C0.202934 2.95156 0 2.46154 0 1.95059C0 1.43964 0.202934 0.949612 0.564173 0.588263Z"
                        fill="#FF0000"
                      />
                    </svg>
                  )}
                  Have at least one set off-chain/not in a session already
                </div>
                <div
                  style={{
                    display: "flex",
                    fontWeight: "500",
                    fontSize: "14px",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  {canFish.isRepaired && (
                    <svg
                      width="31"
                      height="22"
                      viewBox="0 0 31 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 11L11 20L29 2"
                        stroke="#00FF00"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {!canFish.isRepaired && (
                    <svg
                      width="27"
                      height="27"
                      viewBox="0 0 27 27"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M0.564173 0.588263C0.925522 0.227023 1.41555 0.0240898 1.9265 0.0240898C2.43745 0.0240898 2.92747 0.227023 3.28882 0.588263L13.488 10.7874L23.6871 0.588263C23.8648 0.404224 24.0775 0.257427 24.3126 0.15644C24.5476 0.0554523 24.8005 0.00229605 25.0563 7.27544e-05C25.3122 -0.00215055 25.5659 0.0466031 25.8027 0.14349C26.0396 0.240377 26.2547 0.383456 26.4356 0.564378C26.6165 0.745301 26.7596 0.960444 26.8565 1.19725C26.9534 1.43406 27.0022 1.6878 26.9999 1.94365C26.9977 2.19951 26.9445 2.45236 26.8436 2.68745C26.7426 2.92254 26.5958 3.13516 26.4117 3.31291L16.2126 13.512L26.4117 23.7112C26.7627 24.0746 26.957 24.5613 26.9526 25.0666C26.9482 25.5718 26.7455 26.0551 26.3883 26.4124C26.031 26.7696 25.5477 26.9723 25.0425 26.9767C24.5372 26.9811 24.0505 26.7868 23.6871 26.4358L13.488 16.2367L3.28882 26.4358C2.9254 26.7868 2.43866 26.9811 1.93343 26.9767C1.4282 26.9723 0.94491 26.7696 0.587645 26.4124C0.230381 26.0551 0.0277293 25.5718 0.023339 25.0666C0.0189487 24.5613 0.213171 24.0746 0.564173 23.7112L10.7633 13.512L0.564173 3.31291C0.202934 2.95156 0 2.46154 0 1.95059C0 1.43964 0.202934 0.949612 0.564173 0.588263Z"
                        fill="#FF0000"
                      />
                    </svg>
                  )}
                  All items are at 100% durability
                </div>
              </div>
            </div>
            <div
              style={{
                width: "300px",
                height: "80px",
                borderRadius: "3px",
                background:
                  canFish.hasSets && canFish.isRepaired ? "#8080FF" : "#D9D9D9",
                fontSize: "24px",
                fontWeight: "600",
                color: canFish.hasSets && canFish.isRepaired ? "white" : "grey",
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                cursor:
                  canFish.hasSets && canFish.isRepaired
                    ? "pointer"
                    : "not-allowed",
                position: "absolute",
                top: "650px",
                left: "50%",
                marginLeft: "-150px",
              }}
              onClick={async () => {
                if (canFish.hasSets && canFish.isRepaired) {
                  await startAutoFishing(playerLevel);
                  window.location.reload();
                }
              }}
            >
              Start
            </div>
          </div>
        </div>
      )}
      {isEndFishingMenu && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            backdropFilter: "blur(9px)",
            zIndex: "9999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "400px",
              height: "500px",
              background: "#303030",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "6px",
              color: "#fff",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                fontWeight: "600",
                marginLeft: "20px",
                display: "flex",
                gap: "150px",
                marginTop: "20px",
              }}
            >
              End Fishing
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setIsEndFishingMenu(false);
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
            {!endingFishing ? (
              <>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "500",
                    width: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-100px",
                    top: "425px",
                  }}
                >
                  Are you sure?
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "500",
                    width: "200px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-100px",
                    top: "500px",
                    height: "60px",
                    borderRadius: "3px",
                    background: "rgba(51, 102, 204, 1)",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    setEndingFishing(true);
                    await endAutoFishing(sessionId);
                    const active = await GetActiveZone();
                    const activeSessions = await getSessionInfo(active.data);
                    for (let i = 0; i < activeSessions.length; i++) {
                      await endSession(activeSessions[i].fishing_session.id);
                    }
                    setEndingFishing(false);
                    window.location.reload();
                  }}
                >
                  Confirm
                </div>
              </>
            ) : (
              <div
                style={{
                  marginTop: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "24px",
                  color: "#fff",
                  fontWeight: "600",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <MetaMaskLoadingSVG />
                Please wait, ending fishing.
              </div>
            )}
          </div>
        </div>
      )}
      {isActiveSessionMenu && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            display: "flex",
            zIndex: "9999",
            backdropFilter: "blur(9px)",
            alignItems: "center",
            justifyContent: "center",
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
            }}
          >
            <div
              style={{
                fontSize: "30px",
                fontWeight: "600",
                marginTop: "40px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Active Sessions
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
                marginLeft: "850px",
                marginTop: "40px",
              }}
              onClick={() => {
                setIsActiveSessionMenu(false);
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
            <div
              className="scrollme"
              style={{
                overflowY: "scroll",
                display: "flex",
                flexDirection: "column",
                gap: "25px",
                marginTop: "30px",
                alignItems: "end",
                placeItems: "center",
              }}
            >
              {cards}
              <div style={{ height: "50px", width: "20px", color: "#303030" }}>
                .
              </div>
            </div>
          </div>
        </div>
      )}
      {isToolsMenu && (
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
            }}
          >
            <div
              style={{
                fontSize: "30px",
                color: "white",
                fontWeight: "600",
                marginTop: "40px",
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
                marginLeft: "850px",
                marginTop: "40px",
              }}
              onClick={() => {
                setIsToolsMenu(false);
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
            {!isToolsConfirmationMenu && (
              <>
                <div
                  style={{
                    fontSize: "35px",
                    fontWeight: "600",
                    marginTop: "70px",
                  }}
                >
                  Enter a number of repairs for all your items:
                </div>
                <div
                  style={{
                    width: "320px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    marginTop: "50px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      marginTop: "-100px",
                      background: "#303030",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    REPAIRS
                  </div>
                  <input
                    type="number"
                    name="cost"
                    placeholder="Enter a number..."
                    value={numberOfRepairs}
                    onChange={(e) => {
                      setNumberOfRepairs(e.target.value);
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
                </div>
                <div
                  style={{ display: "flex", gap: "120px", marginTop: "50px" }}
                >
                  <div
                    style={{
                      fontWeight: repairValues[1] ? "600" : "400",
                      cursor: "pointer",
                      transition: "0.2s",
                      color: repairValues[1] ? "#fff" : "grey",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setRepairValues({ 1: true, 2: false, 3: false });
                    }}
                  >
                    100%
                    <div
                      style={{
                        transition: "0.2s",
                        marginTop: "2px",
                        width: repairValues[1] ? "30px" : "0px",
                        height: "2px",
                        background: "#fff",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      fontWeight: repairValues[2] ? "600" : "400",
                      color: repairValues[2] ? "#fff" : "grey",
                      borderRadius: "1px",
                      cursor: "pointer",
                      transition: "0.2s",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setRepairValues({ 1: false, 2: true, 3: false });
                    }}
                  >
                    50%
                    <div
                      style={{
                        transition: "0.2s",
                        marginTop: "2px",
                        width: repairValues[2] ? "30px" : "0px",
                        height: "2px",
                        background: "#fff",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      fontWeight: repairValues[3] ? "600" : "400",
                      color: repairValues[3] ? "#fff" : "grey",
                      transition: "0.2s",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setRepairValues({ 1: false, 2: false, 3: true });
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        color: "red",
                        fontWeight: "600",
                        fontSize: "14px",
                        marginLeft: "35px",
                        marginTop: "-5px",
                        cursor: "default",
                      }}
                    >
                      * Required for Fisherman&apos;s Friend
                    </div>
                    25%
                    <div
                      style={{
                        transition: "0.2s",
                        marginTop: "2px",
                        width: repairValues[3] ? "30px" : "0px",
                        height: "2px",
                        background: "#fff",
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  style={{
                    position: "absolute",
                    right: "31%",
                    top: "410px",
                    fontWeight: "600",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>Total Cost</div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={Wod.src} />
                    {toolCost.toFixed(2)}
                  </div>
                </div>
              </>
            )}
            <div
              style={{
                marginTop: "50px",
                fontSize: "30px",
                fontWeight: "600",
                width: "250px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                transition: "0.2s",
                justifyContent: "center",
                background:
                  isNaN(parseInt(numberOfRepairs.toString())) ||
                  parseInt(numberOfRepairs.toString()) === 0
                    ? "grey"
                    : styling.blue_important,
                borderRadius: "6px",
                cursor:
                  isNaN(parseInt(numberOfRepairs.toString())) ||
                  parseInt(numberOfRepairs.toString()) === 0
                    ? "not-allowed"
                    : "pointer",
              }}
              onClick={async () => {
                if (
                  isNaN(parseInt(numberOfRepairs.toString())) ||
                  parseInt(numberOfRepairs.toString()) === 0
                ) {
                  return;
                }
                if (!(await isUnlimitedApproveTools())) {
                  await ApprovalForAllWodTools();
                }
                for (const i in repairValues) {
                  if (repairValues[i]) {
                    buyTools(
                      userData.items,
                      parseInt(numberOfRepairs.toString()),
                      parseInt(i),
                      consumableData
                    );
                  }
                }
              }}
            >
              Buy
            </div>
          </div>
        </div>
      )}
      {pageLoading && (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            position: "absolute",
            zIndex: "99",
            background: styling.background_main,
            color: styling.font_primary,
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
            flexDirection: "column",
            fontSize: "30px",
            textAlign: "center",
            justifyContent: "center",
          }}
        >
          Loading Fisherman&apos;s Friend...
          <div>
            <MetaMaskLoadingSVG />
          </div>
        </div>
      )}
      {/* {!pageLoading */}

      {
        <div
          style={{
            transition: "backdrop-filter 0.3s",
            width: isWelcomeMenu && !pageLoading ? "100vw" : "0px",
            overflow: "hidden",
            height: "100vh",
            backdropFilter:
              isWelcomeMenu && !pageLoading ? "blur(9px)" : "blur(0px)",
            position: "absolute",
            zIndex: "99999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "900px",
              transition: "0.5s",
              height: "500px",
              background: "#161616",
              position: "relative",
              display: "flex",
              marginLeft: isWelcomeMenu && !pageLoading ? "0px" : "-10000px",
              flexDirection: "column",
              borderRadius: "10px",
              alignItems: "center",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
          >
            <img
              src={Seahorse.src}
              style={{
                position: "absolute",
                transition: "0.5s",
                left: "-100px",
                bottom: "-100px",
                display: size.width > 1050 ? "flex" : "none",
                marginLeft: isWelcomeMenu && !pageLoading ? "0px" : "-10000px",
              }}
            />
            <img
              src={Fish.src}
              style={{
                position: "absolute",
                transition: "0.5s",
                right: "-100px",
                top: "-100px",
                display: size.width > 1050 ? "flex" : "none",
                marginLeft: isWelcomeMenu && !pageLoading ? "0px" : "-10000px",
              }}
            />
            <div
              style={{
                fontWeight: "600",
                color: "#fff",
                fontSize: "30px",
                lineHeight: "36px",
                marginTop: "33px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              Welcome to Fisherman&apos;s Friend!
            </div>
            <div
              style={{
                width: "400px",
                height: "170px",
                borderRadius: "3px",
                background: "#1E1E1E",
                marginTop: "65px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  lineHeight: "29px",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                Fully automate your game.
              </div>
              <div
                style={{
                  textAlign: "center",
                  width: "270px",
                  color: "rgba(182, 182, 182, 1)",
                  lineHeight: "19px",
                  fontWeight: "400",
                }}
              >
                Just click{" "}
                <span style={{ fontWeight: "600", color: "#fff" }}>
                  Start Fishing
                </span>
                , relax and leave all the work to our bot.{" "}
                <span style={{ fontWeight: "600", color: "#fff" }}>
                  Remember to keep those 25% repair tools topped up!
                </span>
              </div>
            </div>
            <div
              style={{
                width: "200px",
                height: "50px",
                background: "rgba(25, 95, 194, 1)",
                color: "#fff",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "3px",
                marginTop: "65px",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsWelcomeMenu(false);
              }}
            >
              Continue
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default FishermanFriend;
