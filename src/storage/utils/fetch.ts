import axios from "axios";
import { GetAuthToken } from "./local";
import { GetAddress, getChainid } from "./web3";

const api = axios.create({
  baseURL: "https://api.worldofdefish.com",
  headers: {
    Authorization: GetAuthToken(),
  },
});

export const GetUserdata = async () => {
  return await api.get(`/auth/me`);
};

export const GetTools = async () => {
  return await api.get(`/consumables/repairments/user/${await GetAddress()}`);
};

export const GetItems = async () => {
  return await api.get(`/users/my-items`);
};

export const GetActiveZone = async () => {
  return await api.get(`/zones/active/offchain/select/all`);
};

export const getSessionInfo = async (zoneIds: any) => {
  const results: any[] = [];
  for (let i = 0; i < zoneIds.length; i++) {
    const res = await api.get(`/zones/${zoneIds[i]}/expanded-offchain`);
    results.push(res.data);
  }
  return results;
};

export const endSession = async (sessionId: string) => {
  await api.post(`/fishing/${sessionId}/end`);
};

export const getUsersStats = async () => {
  return await api.get("/users/total-rewards");
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
