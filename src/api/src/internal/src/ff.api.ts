import { ILeaderboardData } from "@/interface/api.interface";
import { ApiLocalStorage } from "@/local/api.local";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.API_BASE_URL + "/users",
});

export const FF = {
  async endFishing(sessionId: string) {
    return await api.post(
      "/end-fishing",
      { session_id: sessionId },
      { headers: { Authorization: ApiLocalStorage.ReadAuthToken() } }
    );
  },
  async leaderboard(data: Partial<ILeaderboardData>) {
    return await api.post("/leaderboard", data, {
      headers: {
        Authorization: ApiLocalStorage.ReadAuthToken(),
      },
    });
  },
  async getGlobalStats() {
    return await api.get("/global-stats", {
      headers: {
        Authorization: ApiLocalStorage.ReadAuthToken(),
      },
    });
  },
};
