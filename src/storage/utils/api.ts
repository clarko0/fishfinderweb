import axios from "axios";
import { genRanHex } from "../constants/misc";
import { GetAuthToken } from "./local";
import { GetAddress } from "./web3";
import { isDocked } from "./window";

let api: any;
if (isDocked()) {
  api = axios.create({
    baseURL: window.location.origin + "/api",
  });
}

export const startAutoFishing = async (
  playerLevel: number,
  keep_sets: boolean,
  keep_zones: boolean
) => {
  const test = await api.post("/ff/start-session", {
    address: await GetAddress(),
    auth: GetAuthToken(),
    level: playerLevel,
    keep_zones: keep_zones,
    keep_sets: keep_sets,
  });
};

export const pingFishing = async (wod_balance: number) => {
  return await api.post("/ff/ping", {
    address: await GetAddress(),
    auth: GetAuthToken(),
    wod_balance: wod_balance,
  });
};

export const endAutoFishing = async (id: string) => {
  await api.post("/ff/end-session", {
    session_id: id,
  });
};
