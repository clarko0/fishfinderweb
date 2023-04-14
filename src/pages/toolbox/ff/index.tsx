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
  GetTokenPrice,
  isDev,
  useWindowSize,
} from "@/storage/utils/tools";
import ItemsPNG from "@/storage/png/ItemsPNG";
import { pingFishing, startAutoFishing } from "@/storage/utils/api";
import {
  GetActiveZone,
  GetAllConsumablePrices,
  GetItems,
  getSessionInfo,
  GetTools,
  GetUserdata,
  getUsersStats,
} from "@/storage/utils/fetch";
import { CheckTheme, FFWelcomeMessage } from "@/storage/utils/local";
import Wod from "public/wod.png";
import { createRef, useEffect, useRef, useState } from "react";
import { isDocked } from "@/storage/utils/window";
import BuyToolMenu from "@/components/FFMenu/BuyTool";
import SystemMessage from "@/components/FFMenu/SystemMessage";
import WelcomeMenu from "@/components/FFMenu/Welcome";
import PageLoading from "@/components/PageLoading";
import ActiveSessionMenu from "@/components/FFMenu/ActiveSessions";
import EndFishingMenu from "@/components/FFMenu/EndFishing";
import StartFishing from "@/components/FFMenu/StartFishing";
import StartStopBtn from "@/components/Buttons/StartStopBtn";
import RepairModal from "@/components/FFModal/RepairModal";
import DashboardModal from "@/components/FFModal/DashboardModal";

const FishermanFriend = () => {
  const [toolMenuData, setToolMenuData] = useState<any>({
    rarities: {
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
    },
    toolVals: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    },
    isDays: false,
  });
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isEndFishingMenu, setIsEndFishingMenu] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [wodPrice, setWodPrice] = useState<any>(0);
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
  const [isSystemMessage, setIsSystemMessage] = useState<any>({
    bool: false,
    title: "",
    msg: "",
  });
  const [numberOfRepairs, setNumberOfRepairs] = useState<any>("");
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
  const [consumableData, setConsumableData] = useState<any>([]);
  const [gettingSessions, setGettingSessions] = useState<boolean>(false);

  const calculateCost = () => {
    let c = 0;
    if (!isNaN(parseInt(numberOfRepairs))) {
      let number = parseInt(numberOfRepairs);
      let num = toolMenuData.isDays ? number * 4 : number;
      for (let i = 0; i < Object.keys(userData.items).length; i++) {
        c +=
          num *
          userData.items[Object.keys(userData.items)[i]].length *
          consumableData[i].price;
      }
    }
    setToolCost(c);
  };

  useEffect(() => {
    calculateCost();
  }, [numberOfRepairs, toolMenuData.isDays]);

  const determineRepair = (isDays: boolean) => {
    let newToolVals: any = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    };
    let j = 0;
    for (const i in userData.items) {
      if (userData.tools[j] !== undefined) {
        newToolVals[j + 1] = ~~(
          userData.tools[j].quantity / userData.items[i].length
        );
      }
      j++;
    }
    if (isDays) {
      for (const i in newToolVals) {
        newToolVals[i] = parseFloat((newToolVals[i] / 4).toFixed(2));
      }
    }

    setToolMenuData({ ...toolMenuData, toolVals: newToolVals });
  };

  useEffect(() => {
    determineRepair(toolMenuData.isDays);
  }, [userData, toolMenuData.isDays]);

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

        setSessionId(res.data.session_id);
        setWodOnSignup(res.data.wod_signup);
        setNextRepair(res.data.next_repair);
        setGettingSessions(true);
        if (
          res.data.system_msg.title !== "" &&
          res.data.system_msg.msg !== ""
        ) {
          setIsSystemMessage({
            bool: true,
            title: res.data.system_msg.title,
            msg: res.data.system_msg.msg,
          });
        }
        const tokenPrice = await GetTokenPrice(1);
        setWodPrice(tokenPrice);
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
        setConsumableData(cData[3]);
        const currentWod: any = await getUsersStats();
        let wod: any = currentWod.data.total_wod - res.data.wod_signup;

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
          setSessions(
            sessionInfo.map((item: any) => {
              return item.fishing_session._id;
            })
          );
          setGettingSessions(false);
        });

        setWodFarmed(Number(wod.toFixed(2)));
        setWodFarmedPrice(Number(wod.toFixed(2)) * tokenPrice);
      });
      const interval = setInterval(() => {
        pingFishing(wod_balance).then(async (res) => {
          setStatus(res.data.status);
          setIsFishing(res.data.bool);
          setSessionId(res.data.session_id);
          setWodOnSignup(res.data.wod_signup);
          setNextRepair(res.data.next_repair);
          if (
            res.data.system_msg.title !== "" &&
            res.data.system_msg.msg !== ""
          ) {
            setIsSystemMessage({
              bool: true,
              title: res.data.system_msg.title,
              msg: res.data.system_msg.msg,
            });
          }
          const currentWod: any = await getUsersStats();
          let wod: any = currentWod.data.total_wod - res.data.wod_signup;
          GetActiveZone().then(async (res) => {
            let zoneIds: any = res.data;
            const sessionInfo: any = await getSessionInfo(zoneIds);
            for (let i = 0; i < sessionInfo.length; i++) {
              wod += sessionInfo[i].fishing_session.last_saved_wod_earned;
            }
            setActiveSessionData(sessionInfo);
            setSessions(
              sessionInfo.map((item: any) => {
                return item.fishing_session._id;
              })
            );
          });

          setWodFarmed(Number(wod.toFixed(2)));
          setWodFarmedPrice(Number(wod.toFixed(2)) * wodPrice);
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
        background: isDev() ? "orange" : styling.background_main,
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
      <DashboardModal
        size={size}
        timer={timer}
        statusColor={statusColor}
        sessions={sessions}
        setIsActiveSessionMenu={setIsActiveSessionMenu}
        wodFarmed={wodFarmed}
        wodFarmedPrice={wodFarmedPrice}
        wodPerHour={wodPerHour}
        wodPerHourPrice={wodPerHourPrice}
        status={status}
        gettingSessions={gettingSessions}
      />
      <RepairModal
        size={size}
        userData={userData}
        fishingTime={fishingTime}
        gettingSessions={gettingSessions}
        wodPerHour={wodPerHour}
        wodPerHourPrice={wodPerHourPrice}
        setIsToolsMenu={setIsToolsMenu}
      />
      <StartStopBtn
        size={size}
        styling={styling}
        isFishing={isFishing}
        status={status}
        setIsEndFishingMenu={setIsEndFishingMenu}
        startAutoFishing={startAutoFishing}
        playerLevel={playerLevel}
      />
      <StartFishing
        isFishingMenu={isFishingMenu}
        setIsFishingMenu={setIsFishingMenu}
        canFish={canFish}
        playerLevel={playerLevel}
      />
      <EndFishingMenu
        setIsEndFishingMenu={setIsEndFishingMenu}
        endingFishing={endingFishing}
        setEndingFishing={setEndingFishing}
        sessionId={sessionId}
        isEndFishingMenu={isEndFishingMenu}
      />
      <ActiveSessionMenu
        isActiveSessionMenu={isActiveSessionMenu}
        setIsActiveSessionMenu={setIsActiveSessionMenu}
        cards={cards}
      />
      <BuyToolMenu
        setIsToolsMenu={setIsToolsMenu}
        isToolsMenu={isToolsMenu}
        isToolsConfirmationMenu={isToolsConfirmationMenu}
        toolMenuData={toolMenuData}
        setToolMenuData={setToolMenuData}
        toolCost={toolCost}
        numberOfRepairs={numberOfRepairs}
        setNumberOfRepairs={setNumberOfRepairs}
        userData={userData}
        consumableData={consumableData}
        wodPrice={wodPrice}
      />
      <PageLoading
        text={"Loading Fisherman's Friend..."}
        styling={styling}
        pageLoading={pageLoading}
      />
      <WelcomeMenu
        isWelcomeMenu={isWelcomeMenu}
        pageLoading={pageLoading}
        size={size}
        setIsWelcomeMenu={setIsWelcomeMenu}
      />
      <SystemMessage
        isSystemMessage={isSystemMessage}
        pageLoading={pageLoading}
        size={size}
        setIsSystemMessage={setIsSystemMessage}
      />
    </div>
  );
};

export default FishermanFriend;
