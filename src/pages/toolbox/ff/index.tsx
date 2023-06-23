import { CaclulateFishingTime, isDev } from "@/storage/utils/tools";

import { startAutoFishing } from "@/storage/utils/api";

import { useContext, useEffect, useRef, useState } from "react";
import BuyToolMenu from "@/components/FFMenu/BuyTool";
import SystemMessage from "@/components/FFMenu/SystemMessage";
import WelcomeMenu from "@/components/FFMenu/Welcome";
import PageLoading from "@/components/PageLoading";
import ActiveSessionMenu from "@/components/FFMenu/ActiveSessions";
import EndFishingMenu from "@/components/FFMenu/EndFishing";
import StartStopBtn from "@/components/Buttons/StartStopBtn";
import RepairModal from "@/components/FFModal/RepairModal";
import DashboardModal from "@/components/FFModal/DashboardModal";
import { ffStore } from "@/store/ff.store";
import FFGlobalStatistics from "@/components/FFGlobalStatistics";
import { genRanHex } from "@/storage/constants/misc";
import { API } from "@/api/api";
import FishingSettingsModal from "@/components/Modals/FishermanFriend/FishingSettings";
import { IFFData } from "@/interface/storage.interface";
import { StylingContext, WindowSizeContext } from "@/pages/_app";
import { Storage } from "@/utils/src/storage.utils";
import { FF } from "@/utils/src/ff.utils";
import { IActiveSessionData, IItem, ISet } from "@/interface/ff.interface";
import Image from "next/image";
import FishingCard from "@/components/FFFishingCard";

const FishermanFriend = () => {
  const styling = useContext(StylingContext);

  const windowSize = useContext(WindowSizeContext);

  const [timerCount, setTimerCount] = useState<number>(0);

  const timerCountRef = useRef(0);

  const [pageData, setPageData] = useState<IFFData>({
    page_loading: false,
    global: {
      is_welcome_menu: false,
      repair_mode: 1,
      is_days: false,
      wod_price: 0,
      is_fishing: false,
      fishing_status: 0,
      session_id: "",
    },
    components: {
      system_message: {
        shown: false,
        message: {
          title: "",
          msg: "",
        },
      },
      dashboard: {
        next_repair_counter: "00 : 00 : 00",
        sessions_running: 0,
        estimated_earnings: {
          amount: 0,
          price: 0,
        },
        data: {
          farm_statistics: {
            wod_per_hour: {
              amount: 0,
              price: 0,
            },
            wod_farmed: {
              amount: 0,
              price: 0,
            },
          },
          next_repair: new Date(),
        },
      },
      global_statistics: {
        data: {
          wod_farmed: 0,
          nft_count: 0,
          fisherman_count: 0,
        },
      },
      menu: {
        end_fishing: {
          open: false,
          is_ending: false,
        },
        fishing_settings: {
          open: false,
          form: {
            keep_zones: false,
            keep_sets: false,
            skip_repair: false,
          },
        },
        tool: {
          open: false,
          form: {
            rarities: {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false,
              6: false,
            },
            offchain_wod: false,
            tools: {
              amount: 0,
              price: 0,
              usd: 0,
            },
          },
        },
        fishing: {
          open: false,
          cards: [],
        },
      },
    },
    consumable_data: {
      consumables: [],
      measurements: {
        1: {
          amount: 0,
          repairs: {
            amount: 0,
            in_days: 0,
          },
        },
        2: {
          amount: 0,
          repairs: {
            amount: 0,
            in_days: 0,
          },
        },
        3: {
          amount: 0,
          repairs: {
            amount: 0,
            in_days: 0,
          },
        },
        4: {
          amount: 0,
          repairs: {
            amount: 0,
            in_days: 0,
          },
        },
        5: {
          amount: 0,
          repairs: {
            amount: 0,
            in_days: 0,
          },
        },
        6: {
          amount: 0,
          repairs: {
            amount: 0,
            in_days: 0,
          },
        },
      },
    },
    data: {
      consumable_data: {
        1: [],
        2: [],
        3: [],
      },
      consumable_prices_ids: {
        1: [],
        2: [],
        3: [],
      },
      items: [],
      items_in_sets: [],
      sets: [],
      active_session_data: [],
    },
  });

  const changeActiveToolData = () => {
    const repairMode = pageData.global.repair_mode;
    const consumableData = pageData.data.consumable_data[repairMode];
    updatePageData("consumable_data.consumables", consumableData);

    const newMeasurements: any = {};

    consumableData.forEach((tool) => {
      const { quantity, rarity } = tool;
      const div = repairMode === 1 ? 1 : repairMode === 2 ? 2 : 3;
      const amount =
        quantity /
        pageData.data.items_in_sets.filter(
          (item: IItem) => item.rarity === rarity
        ).length;
      newMeasurements[rarity] = {
        amount: quantity,
        repairs: {
          amount: amount,
          in_days: amount / div,
        },
      };
    });

    [1, 2, 3, 4, 5, 6].forEach((item: number) => {
      if (!newMeasurements[item.toString()]) {
        newMeasurements[item.toString()] = {
          amount: 0,
          repairs: {
            amount: 0,
            in_days: 0,
          },
        };
      }
    });

    updatePageData("consumable_data.measurements", newMeasurements);
  };

  const updateEstimatedEarnings = () => {
    changeActiveToolData();
    const { amount, price } =
      pageData.components.dashboard.data.farm_statistics.wod_per_hour;
    const timeInSeconds = CaclulateFishingTime(
      pageData.data.items_in_sets,
      pageData.consumable_data.consumables
    );

    const timeInHours = timeInSeconds / 3600;

    updatePageData("components.dashboard.estimated_earnings", {
      amount: amount * timeInHours,
      price: price * timeInHours,
    });
  };

  const [pinger, setPinger] = useState<boolean>(false);

  const refetchSiteData = () => {
    setPinger(!pinger);
  };

  useEffect(() => {
    if (!pageData) return;

    updatePageData("page_loading", true);

    ffStore(pageData).then((res: IFFData) => {
      const { components, data, global } = res;

      components.dashboard.sessions_running =
        res.data.active_session_data.length;

      data.sets.push(...FF.createSets(data.items));
      data.items_in_sets.push(...FF.getItemsFromSets(data.sets));
      data.items = FF.removeItemsFromList(data.items_in_sets, data.items);

      let total = 0;
      components.menu.fishing.cards = res.data.active_session_data.map(
        (item: IActiveSessionData) => {
          const wodPerHour =
            item.wod_multiplier *
            item.zone.random_wod_rate *
            3600 *
            (1 - item.zone.fee / 100);
          total += wodPerHour;

          const itemCards = item.slot_items.map((i: IItem) => (
            <Image
              width={80}
              height={120}
              src={i.rendered_image_url}
              alt={i.name}
            />
          ));

          return (
            <FishingCard
              itemCards={itemCards}
              wodEarned={item.last_saved_wod_earned}
              wodPerHour={wodPerHour}
              zoneId={item.zone.id}
            />
          );
        }
      );

      const { wod_price } = global;
      const wodPerHourPrice = total * wod_price;
      const wodFarmedPrice =
        components.dashboard.data.farm_statistics.wod_farmed.amount * wod_price;

      components.dashboard.data.farm_statistics.wod_per_hour = {
        amount: total,
        price: wodPerHourPrice,
      };

      components.dashboard.data.farm_statistics.wod_farmed.price =
        wodFarmedPrice;

      changeActiveToolData();
      setPageData(res);
      updatePageData("page_loading", false);
    });
  }, [pinger]);

  useEffect(() => {
    changeActiveToolData();
  }, [pageData.global.repair_mode]);

  useEffect(() => {
    updateEstimatedEarnings();
  }, [pageData.consumable_data.consumables]);

  const [timer, setTimer] = useState("00 : 00 : 00");

  useEffect(() => {
    var timeZoneOffset = new Date().getTimezoneOffset() / 60;
    var targetTime = pageData.components.dashboard.data.next_repair;
    targetTime.setHours(targetTime.getHours() - timeZoneOffset);
    const targetMS = targetTime.getTime();

    const intervalId = setInterval(() => {
      const now = new Date().getTime();
      const timeToTarget = (targetMS - now) / 1000;

      const hours = `0${Math.floor(timeToTarget / 3600)}`.slice(-2);
      const minutes = `0${Math.floor((timeToTarget % 3600) / 60)}`.slice(-2);
      const seconds = `0${Math.floor(timeToTarget % 60)}`.slice(-2);
      setTimer(hours + " : " + minutes + " : " + seconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [pageData.components.dashboard.data.next_repair]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPinger(!pinger);
    }, 30000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let sum: number = 0;
    let factor = 1;
    const repairMode = pageData.global.repair_mode;
    if (repairMode === 3) {
      factor = 4;
    } else if (repairMode === 2) {
      factor = 2;
    } else if (repairMode === 1) {
    }
    try {
      const rarities: any = pageData.components.menu.tool.form.rarities;

      for (const i in rarities) {
        if (rarities[i]) {
          sum +=
            pageData.data.consumable_prices_ids[
              pageData.global.repair_mode
            ].filter((item: any) => {
              return item.rarity.toString() === i;
            })[0].price *
            pageData.components.menu.tool.form.tools.amount *
            pageData.data.items_in_sets.filter(
              (item) => item.rarity.toString() === i
            ).length;
        }
      }
    } catch (e) {}
    if (pageData.global.is_days) {
      sum = sum * factor;
    }
    updatePageData("components.menu.tool.form.tools.price", sum);
    updatePageData(
      "components.menu.tool.form.tools.usd",
      sum * pageData.global.wod_price
    );
  }, [
    pageData.components.menu.tool.form.tools.amount,
    pageData.global.repair_mode,
    pageData.global.is_days,
    pageData.components.menu.tool.form.rarities[1],
    pageData.components.menu.tool.form.rarities[2],
    pageData.components.menu.tool.form.rarities[3],
    pageData.components.menu.tool.form.rarities[4],
    pageData.components.menu.tool.form.rarities[5],
    pageData.components.menu.tool.form.rarities[6],
  ]);

  if (!pageData) {
    return <></>;
  }

  if (!windowSize) {
    return <></>;
  }

  const { width, height } = windowSize;

  const updatePageData = (key: string, value: any) => {
    Storage.updateData(setPageData, key, value);
  };

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
          display: width > 1650 ? "flex" : "none",
        }}
      >
        Fisherman&apos;s Friend
      </div>
      <DashboardModal
        windowSize={windowSize}
        updatePageData={updatePageData}
        componentData={pageData.components.dashboard}
        consumableData={pageData.consumable_data.measurements}
        repairMode={pageData.global.repair_mode}
        fishingStatus={pageData.global.fishing_status}
        timer={timer}
        isDays={pageData.global.is_days}
      />
      <FFGlobalStatistics
        windowSize={windowSize}
        statisticsData={pageData.components.global_statistics.data}
        styling={styling}
      />
      <StartStopBtn
        windowSize={windowSize}
        styling={styling}
        updatePageData={updatePageData}
        fishingStatus={pageData.global.fishing_status}
      />
      <EndFishingMenu
        windowSize={windowSize}
        updatePageData={updatePageData}
        sessionId={pageData.global.session_id}
        componentData={pageData.components.menu.end_fishing}
        refetchSiteData={refetchSiteData}
      />
      <ActiveSessionMenu
        updatePageData={updatePageData}
        componentData={pageData.components.menu.fishing}
      />

      <BuyToolMenu
        updatePageData={updatePageData}
        repairMode={pageData.global.repair_mode}
        componentData={pageData.components.menu.tool}
        isDays={pageData.global.is_days}
        refetchSiteData={refetchSiteData}
        itemsInSets={pageData.data.items_in_sets}
        consumableData={pageData.consumable_data.measurements}
        consumablePrices={pageData.data.consumable_prices_ids}
      />
      <PageLoading
        text={"Loading Fisherman's Friend..."}
        styling={styling}
        pageLoading={pageData.page_loading}
      />

      <WelcomeMenu
        isWelcomeMenu={pageData.global.is_welcome_menu}
        pageLoading={pageData.page_loading}
        windowSize={windowSize}
        updatePageData={updatePageData}
      />

      <SystemMessage
        systemMessage={pageData.components.system_message}
        pageLoading={pageData.page_loading}
        windowSize={windowSize}
        updatePageData={updatePageData}
      />

      <FishingSettingsModal
        componentData={pageData.components.menu.fishing_settings}
        updatePageData={updatePageData}
        repairMode={pageData.global.repair_mode}
        consumableData={pageData.consumable_data.measurements}
        startAutoFishing={startAutoFishing}
        refetchSiteData={refetchSiteData}
      />
    </div>
  );
};

export default FishermanFriend;
