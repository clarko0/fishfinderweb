import { pingFishing } from "@/storage/utils/api";
import {
  GetActiveZone,
  GetAllConsumablePrices,
  GetItems,
  GetTools,
  GetUserdata,
  TokenPrice,
  getSingleSession,
  getUsersStats,
} from "@/storage/utils/fetch";

export const ffStore = async () => {
  let items: any[] = [];
  let tools: any[] = [];
  let fishingInfo: any[] = [];
  let totalWod: number = 0;
  let tokenPrice: number = 0;
  let initPing: any = {};
  let userData: any = {
    username: "@",
    avatar:
      " https://ynnovate.it/wp-content/uploads/2015/04/default-avatar.png",
    level: 0,
  };
  let calls: any = [
    GetItems().then(async (res: any) => {
      res = res.data;
      for (let i = 0; i < res.length; i++) {
        if (res[i].is_teleported) {
          items.push(res[i]);
        }
      }
    }),
    GetActiveZone().then(async (res: any) => {
      let subCalls: any = [];
      for (let i = 0; i < res.data.length; i++) {
        subCalls.push(
          getSingleSession(res.data[i]).then((response: any) => {
            response = response.data;
            items = items.concat(response.fishing_session.slot_items);
            fishingInfo.push(response);
          })
        );
      }
      await Promise.all(subCalls);
    }),
    GetTools().then(async (res: any) => {
      res = res.data;

      for (let i = 0; i < res.length; i++) {
        if (res[i].repair_amount === 25) {
          tools.push({
            quantity: res[i].quantity,
            rarity: res[i].rarity,
          });
        }
      }
      let rawData = await GetAllConsumablePrices();
      for (let i = 0; i < rawData.length; i++) {
        if (rawData[i].repairNum === 25) {
          for (let x = 0; x < tools.length; x++) {
            if (tools[x].rarity === rawData[i].rarity) {
              tools[x].price = rawData[i].price;
            }
          }
        }
      }
    }),
    getUsersStats().then((res: any) => {
      res = res.data;
      totalWod = res.total_wod;
    }),
    TokenPrice().then((res: any) => {
      tokenPrice = res;
    }),
    GetUserdata().then((res: any) => {
      res = res.data;
      userData.level = res.character.level;
      userData.username += res.nickname;
      userData.avatar =
        res.avatar_url === null
          ? "https://ynnovate.it/wp-content/uploads/2015/04/default-avatar.png"
          : res.avatar_url;
    }),
    pingFishing(totalWod).then((res) => {
      res = res.data;
      initPing = res;
    }),
  ];
  await Promise.all(calls);
  return {
    totalWod: totalWod,
    tools: tools,
    items: items,
    tokenPrice: tokenPrice,
    userData: userData,
    fishingInfo: fishingInfo,
    initPing: initPing,
  };
};
