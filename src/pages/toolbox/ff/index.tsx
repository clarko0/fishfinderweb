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
import { ffStore } from "@/store/ff.store";
import FFGlobalStatistics from "@/components/FFGlobalStatistics";
import { genRanHex } from "@/storage/constants/misc";

const FishermanFriend = () => {
  const [toolMenuData, setToolMenuData] = useState<any>({
    rarities: {
      1: true,
      2: true,
      3: true,
      4: true,
      5: false,
      6: false,
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
  const [clicker, setClicker] = useState<boolean>(false);
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
  const [userData, setUserData] = useState<any>({
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
  const [statisticsData, setStatisticsData] = useState<any>({});
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
      try {
        for (let i = 0; i < Object.keys(userData.items).length; i++) {
          if (toolMenuData.rarities[i + 1]) {
            c +=
              num *
              userData.items[Object.keys(userData.items)[i]].length *
              consumableData[i].price;
          }
        }
      } catch (e) {}
    }
    setToolCost(c);
  };

  useEffect(() => {
    calculateCost();
  }, [numberOfRepairs, clicker]);

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
        <div key={genRanHex(64)} style={{ display: "flex", gap: "30px" }}>
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
    setWodPerHourPrice(Number(total.toFixed(2)) * wodPrice);
    // setWodFarmed(
    //   Number((sessionWod + userData.wodBalance - wodOnSignup).toFixed(2))
    // );
    // setWodFarmedPrice(
    //   Number((sessionWod + userData.wodBalance - wodOnSignup).toFixed(2)) *
    //     wodPrice
    // );
  }, [activeSessionData]);

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
    var timeZoneOffset = new Date().getTimezoneOffset() / 60;
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
    setPageLoading(true);
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
    ffStore().then((res: any) => {
      const items: IItems = {
        common: [],
        uncommon: [],
        rare: [],
        epic: [],
        legendary: [],
        artifact: [],
      };

      for (let i = 0; i < res.items.length; i++) {
        const item = res.items[i];
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
      setPlayerLevel(res.userData.level);
      setUserData({
        username: res.userData.username,
        avatar: res.userData.avatar,
        tools: res.tools.sort((a: any, b: any) =>
          a.rarity > b.rarity ? 1 : -1
        ),
        items: items,
        isReady: true,
        wodBalance: res.totalWod,
      });
      setSessions(res.fishingInfo);
      setActiveSessionData(res.fishingInfo);
      setStatus(res.initPing.status);
      setStatisticsData(res.initPing.global_statistics);
      setConsumableData(res.tools);
      setIsFishing(res.initPing.bool);
      setWodPrice(res.tokenPrice);
      setSessionId(res.initPing.session_id);
      setWodFarmed(res.initPing.wod_farmed);
      setWodFarmedPrice(res.initPing.wod_farmed * res.tokenPrice);
      setNextRepair(res.initPing.next_repair);
      if (
        res.initPing.system_msg.title !== "" &&
        res.initPing.system_msg.msg !== ""
      ) {
        setIsSystemMessage({
          bool: true,
          title: res.initPing.system_msg.title,
          msg: res.initPing.system_msg.msg,
        });
      }
      setPageLoading(false);
    });
    const interval = setInterval(() => {
      ffStore().then((res: any) => {
        const items: IItems = {
          common: [],
          uncommon: [],
          rare: [],
          epic: [],
          legendary: [],
          artifact: [],
        };
        for (let i = 0; i < res.items.length; i++) {
          const item = res.items[i];
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
        setPlayerLevel(res.userData.level);
        setUserData({
          username: res.userData.username,
          avatar: res.userData.avatar,
          tools: res.tools.sort((a: any, b: any) =>
            a.rarity > b.rarity ? 1 : -1
          ),
          items: items,
          isReady: true,
          wodBalance: res.totalWod,
        });
        setSessions(res.fishingInfo);
        setActiveSessionData(res.fishingInfo);
        setStatus(res.initPing.status);
        setConsumableData(res.tools);
        setIsFishing(res.initPing.bool);
        setStatisticsData(res.initPing.global_statistics);
        setWodPrice(res.tokenPrice);
        setSessionId(res.initPing.session_id);
        setWodOnSignup(res.initPing.wod_signup);
        setNextRepair(res.initPing.next_repair);
        if (
          res.initPing.system_msg.title !== "" &&
          res.initPing.system_msg.msg !== ""
        ) {
          setIsSystemMessage({
            bool: true,
            title: res.initPing.system_msg.title,
            msg: res.initPing.system_msg.msg,
          });
        }
        setPageLoading(false);
      });
      timerCountRef.current += 1;
    }, 10000);

    return () => clearInterval(interval);
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
        toolMenuData={toolMenuData}
        status={status}
        gettingSessions={gettingSessions}
        setToolMenuData={setToolMenuData}
        consumableData={consumableData}
        userData={userData}
        fishingTime={fishingTime}
        setIsToolsMenu={setIsToolsMenu}
      />
      <FFGlobalStatistics
        size={size}
        styling={styling}
        statisticsData={statisticsData}
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
        clicker={clicker}
        setClicker={setClicker}
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
