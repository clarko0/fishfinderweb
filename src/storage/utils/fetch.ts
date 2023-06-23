import axios from "axios";
import { GetAuthToken, GetCurrentAddress } from "./local";
import { GetAddress, getChainid } from "./web3";
import { getAddress } from "ethers";
import { IConsumable, IConsumableData, IItem } from "@/interface/ff.interface";

const api = axios.create({
  baseURL: "https://api.worldofdefish.com",
});

export const GetUserdata = async () => {
  return await api.get(`/auth/me`, {
    headers: {
      Authorization: GetAuthToken(),
    },
  });
};

export const GetTools = async () => {
  return await api.get(`/consumables/repairments/user/${GetCurrentAddress()}`, {
    headers: {
      Authorization: GetAuthToken(),
    },
  });
};

export const GetItems = async () => {
  return await api.get(`/users/my-items`, {
    headers: {
      Authorization: GetAuthToken(),
    },
  });
};

export const GetActiveZone = async () => {
  return await api.get(`/zones/active/offchain/select/all`, {
    headers: {
      Authorization: GetAuthToken(),
    },
  });
};

export const getSessionInfo = async (zoneIds: any) => {
  const results: any[] = [];
  for (let i = 0; i < zoneIds.length; i++) {
    const res = await api.get(`/zones/${zoneIds[i]}/expanded-offchain`, {
      headers: {
        Authorization: GetAuthToken(),
      },
    });
    results.push(res.data);
  }
  return results;
};

export const getSingleSession = async (zoneId: any) => {
  return await api.get(`/zones/${zoneId}/expanded-offchain`, {
    headers: {
      Authorization: GetAuthToken(),
    },
  });
};

export const endSession = async (sessionId: string) => {
  await api.post(`/fishing/${sessionId}/end`, {
    headers: {
      Authorization: GetAuthToken(),
    },
  });
};

export const getUsersStats = async () => {
  return await api.get("/users/total-rewards", {
    headers: {
      Authorization: GetAuthToken(),
    },
  });
};

export const getGraphQLData = async () => {
  const address = await GetCurrentAddress();
  return await axios.post("https://api.defish.games/graphql", {
    query: `query GetPageData($user_address1: [Address!]) {
      items(pagination: {}, sort: {}, filter: { owner: $user_address1 }) {
        name
        id
        rendered_image_url
        slot_key
        wod_multiplier
        rarity
        durability
        is_teleported
      }
      fishings(
        pagination: {}
        sort: {}
        filter: { owner: $user_address1, is_ended: false }
      ) {
        id
        wod_multiplier
        last_saved_wod_earned
        zone {
          id
          random_wod_rate
          fishing_pool {
            agents_amount
            wod_multiplier
          }
          fee
        }
        slot_items {
          name
          id
          rendered_image_url
          slot_key
          wod_multiplier
          rarity
          durability
          is_teleported
        }
      }
    }    
      `,
    variables: {
      user_address1: address,
      user_address2: address,
    },
    operationName: "GetPageData",
  });
};

export const getMarketplaceItems = async (page: number) => {
  const chainId = await getChainid();
  try {
    return await api.post(
      chainId === 56
        ? "/marketplace/search/items"
        : "/marketplace/search/items",
      {
        filters: {
          name: "",
          by_owner: false,
          wod_multiplier: { min: 0.8, max: 2 },
          exp_multiplier: { min: 0.8, max: 4 },
          level: { min: 1, max: 15 },
          price: { min: 0, max: null },
          durability: { min: 0, max: 100 },
          rarity: [],
          coll_num: [],
          slot_key: ["-fish"],
          is_new: true,
          is_auction: false,
          is_sale: false,
          not_for_sale: false,
          not_auction: false,
        },
        sort: { sort_by: "price", sort_dir: "ASC" },
        page: page,
      },
      {
        headers: {
          Authorization: GetAuthToken(),
        },
      }
    );
  } catch (e) {
    return { data: { items: [] } };
  }
};

export const getMarketplaceFish = async (page: number) => {
  const chainId = await getChainid();
  return await api.post(
    chainId === 56 ? "/marketplace/search/items" : "/marketplace/search/items",
    {
      filters: {
        name: "",
        by_owner: false,
        wod_multiplier: { min: 0.8, max: 2 },
        exp_multiplier: { min: 0.8, max: 4 },
        quality: { min: 1, max: 10 },
        price: { min: 0, max: null },
        rarity: [],
        coll_num: [],
        slot_key: ["fish"],
        is_new: true,
        is_auction: false,
        is_sale: false,
        not_for_sale: false,
        not_auction: false,
      },
      sort: { sort_by: "price", sort_dir: "ASC" },
      page: page,
    },
    {
      headers: {
        Authorization: GetAuthToken(),
      },
    }
  );
};

export const getMarketplaceMaterials = async (term: string) => {
  const chainId = await getChainid();
  return await api.post(
    chainId === 56
      ? "/marketplace/search/materials"
      : "/marketplace/search/materials",
    {
      filters: {
        name: term,
        by_owner: false,
        price: { min: 0, max: null },
        quality: { min: 0, max: 10 },
        rarity: [],
        is_new: true,
        is_auction: false,
        is_sale: false,
        not_for_sale: false,
        not_auction: false,
      },
      sort: { sort_by: "price", sort_dir: "ASC" },
      page: 1,
    },
    {
      headers: {
        Authorization: GetAuthToken(),
      },
    }
  );
};
export const getMarketplaceZones = async (page: number) => {
  const chainId = await getChainid();
  return await api.post(
    chainId === 56 ? "/marketplace/search/zones" : "/marketplace/search/zones",
    {
      filters: {
        name: "",
        by_owner: false,
        price: { min: 0, max: null },
        quality: { min: 0, max: 10 },
        rarity: [],
        is_new: true,
        is_auction: false,
        is_sale: false,
        not_for_sale: false,
        not_auction: false,
      },
      sort: { sort_by: "price", sort_dir: "ASC" },
      page: page,
    },
    {
      headers: {
        Authorization: GetAuthToken(),
      },
    }
  );
};

export const getAllMarketplaceItems = async () => {
  let pageIndex: number = 1;
  const firstRes = await getMarketplaceItems(pageIndex);
  let marketItems: any[] = [...firstRes.data.items];
  const calls = [];
  let totalPages = firstRes.data.total_pages;
  pageIndex++;
  while (pageIndex <= totalPages) {
    calls.push(
      getMarketplaceItems(pageIndex).then((res) =>
        marketItems.push(...res.data.items)
      )
    );
    pageIndex++;
  }
  await Promise.all(calls);
  return marketItems;
};
export const getAllMarketplaceFish = async () => {
  let pageIndex: number = 1;
  const firstRes = await getMarketplaceFish(pageIndex);
  let marketItems: any[] = [...firstRes.data.items];
  const calls = [];
  let totalPages = +firstRes.data.total_pages;
  pageIndex++;
  while (pageIndex <= totalPages) {
    calls.push(
      getMarketplaceFish(pageIndex).then((res) =>
        marketItems.push(...res.data.items)
      )
    );
    pageIndex++;
  }
  await Promise.all(calls);
  return marketItems;
};

export const getMarketplaceMaterialsIndex = async (
  term: string,
  index: number
) => {
  const chainId = await getChainid();
  return await api.post(
    chainId === 56
      ? "/marketplace/search/materials"
      : "/marketplace/search/materials",
    {
      filters: {
        name: term,
        by_owner: false,
        price: { min: 0, max: null },
        quality: { min: 0, max: 10 },
        rarity: [],
        is_new: true,
        is_auction: false,
        is_sale: false,
        not_for_sale: false,
        not_auction: false,
      },
      sort: { sort_by: "price", sort_dir: "ASC" },
      page: index,
    },
    {
      headers: {
        Authorization: GetAuthToken(),
      },
    }
  );
};

export const TokenPrice = async () => {
  const res = await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=WOD&tsyms=USD"
  );
  return res.data.USD;
};

export const GetAllZones = async () => {
  let pageIndex: number = 1;
  const firstRes = await getMarketplaceZones(pageIndex);
  let marketItems: any[] = [...firstRes.data.items];
  const calls = [];
  let totalPages = +firstRes.data.total_pages;
  pageIndex++;
  while (pageIndex <= totalPages) {
    calls.push(
      getMarketplaceZones(pageIndex).then((res) =>
        marketItems.push(...res.data.items)
      )
    );
    pageIndex++;
  }
  await Promise.all(calls);
  return marketItems;
};

export const GetConsumablePrice = async (pageIndex: number) => {
  const chainId = await getChainid();
  return await api.post(
    chainId === 56
      ? "/marketplace/search/consumables"
      : "/marketplace/search/consumables",
    {
      filters: {
        name: "",
        by_owner: false,
        price: { min: 0, max: null },
        quality: { min: 0, max: 10 },
        rarity: [],
        is_new: true,
        is_auction: false,
        is_sale: false,
        not_for_sale: false,
        not_auction: false,
      },
      sort: { sort_by: "price", sort_dir: "ASC" },
      page: pageIndex,
    },
    {
      headers: {
        Authorization: GetAuthToken(),
      },
    }
  );
};

export const GetAllConsumablePrices = async () => {
  let pageIndex: number = 1;
  const firstRes = await GetConsumablePrice(pageIndex);
  let marketItems: any[] = [...firstRes.data.items];
  const calls = [];
  let totalPages = firstRes.data.total_pages;
  pageIndex++;
  while (pageIndex <= totalPages) {
    calls.push(
      GetConsumablePrice(pageIndex).then((res) =>
        marketItems.push(...res.data.items)
      )
    );
    pageIndex++;
  }
  await Promise.all(calls);
  marketItems = marketItems.map((item: any) => {
    return {
      id: item.id,
      rarity: item.rarity,
      repairNum: item.repair_amount,
      price: item.price,
    };
  });
  return marketItems;
};

export const BuyTools = async (
  amount: number,
  rarities: any,
  items: IItem[],
  consumableData: any
) => {
  let calls: any[] = [];
  let itemInfo: any = {};
  let toolInfo: any = {};
  items.map((item) => {
    if (itemInfo[item.rarity] === undefined) {
      itemInfo[item.rarity] = 0;
    }
    itemInfo[item.rarity]++;
  });
  for (const i in itemInfo) {
    toolInfo[i] = {
      id: consumableData.filter((item: any) => item.rarity.toString() === i)[0]
        .id,
      amount: itemInfo[i] * amount,
    };
  }
  for (const i in toolInfo) {
    if (!rarities[i]) {
      delete toolInfo[i];
    }
  }
  for (const i in toolInfo) {
    calls.push(
      axios.post(
        "https://api.defish.games/graphql",
        {
          query: `mutation {repairmentCollectionUpdate(input: {consumable_vendor_id: ${parseInt(
            toolInfo[i].id
          )}, amount_to_add: ${toolInfo[i].amount},},) {id}}`,
        },
        {
          headers: {
            Authorization: GetAuthToken(),
          },
        }
      )
    );
  }
  await Promise.all(calls);
};
