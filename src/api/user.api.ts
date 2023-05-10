import { IUpdateUserdata } from "@/interface/api.interface";
import { ApiLocalStorage } from "@/local/api.local";
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.dev.fishfinder.games/api" + "/users",
});

export const UserApi = {
  async getMyData() {
    return await api.get("/me", {
      headers: {
        Authorization: ApiLocalStorage.ReadAuthToken(),
      },
    });
  },
  async updateMyData(data: Partial<IUpdateUserdata>) {
    return await api.post("/me/update-data", data, {
      headers: { Authorization: ApiLocalStorage.ReadAuthToken() },
    });
  },
};
