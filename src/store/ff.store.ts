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
import { API } from "@/api/api";
import { GetAddress } from "@/storage/utils/web3";

// test
export const ffStore = async () => {
  let items: any[] = [];
  let tools: any = {
    1: [],
    2: [],
    3: [],
  };
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
  const address: any = await GetAddress();
  let calls: any = [
    GetItems().then(async (res: any) => {
      res = res.data;
      for (let i = 0; i < res.length; i++) {
        if (res[i].is_teleported) {
          items.push(res[i]);
        }
      }
    }),
    API.External.WorldOfDefish.Graphql.getFishingSessionData(
      address,
      true,
      true,
      true
    ).then(async (res: any) => {
      for (let i = 0; i < res.data.fishings.length; i++) {
        const session = res.data.fishings[i];
        items = items.concat(session.slot_items);
        fishingInfo.push(session);
      }
    }),
    // GetActiveZone().then(async (res: any) => {
    //   let subCalls: any = [];
    //   for (let i = 0; i < res.data.length; i++) {
    //     subCalls.push(
    //       getSingleSession(res.data[i]).then((response: any) => {
    //         response = response.data;
    //         response.fishing_session !== null &&
    //           (items = items.concat(response.fishing_session.slot_items));
    //         fishingInfo.push(response);
    //       })
    //     );
    //   }
    //   await Promise.all(subCalls);
    // }),
    GetTools().then(async (res: any) => {
      res = res.data;

      for (let i = 0; i < res.length; i++) {
        let repair_amount = res[i].repair_amount;

        if (repair_amount !== 75) {
          if (repair_amount === 25) {
            repair_amount = 3;
          } else if (repair_amount === 50) {
            repair_amount = 2;
          } else {
            repair_amount = 1;
          }
          tools[repair_amount].push({
            quantity: res[i].quantity,
            rarity: res[i].rarity,
            repair_amount: repair_amount,
          });
        }
      }

      for (const i in tools) {
        tools[i].sort((a: any, b: any) => (a.rarity > b.rarity ? 1 : -1));
      }

      let rawData = await GetAllConsumablePrices();
      for (let i = 0; i < rawData.length; i++) {
        let repair_amount = rawData[i].repairNum;
        if (repair_amount !== 75) {
          if (repair_amount === 25) {
            repair_amount = 3;
          } else if (repair_amount === 50) {
            repair_amount = 2;
          } else if (repair_amount === 100) {
            repair_amount = 1;
          }
          for (let x = 0; x < tools[repair_amount].length; x++) {
            let ele = tools[repair_amount][x];
            if (ele.rarity === rawData[i].rarity) {
              ele.price = rawData[i].price;
              ele.id = rawData[i].id;
            }
          }
        }
      }

      console.log(tools);
    }),

    //   for (let i = 0; i < rawData.length; i++) {
    //     if (rawData[i].repairNum === 25) {
    //       for (let x = 0; x < tools.length; x++) {
    //         if (tools[x].rarity === rawData[i].rarity) {
    //           tools[x].price = rawData[i].price;
    //         }
    //       }
    //     }
    //   }
    // }),
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
