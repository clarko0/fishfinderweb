import axios from "axios";

const api = axios.create({
  baseURL: "https://api.defish.games/graphql",
});

export const Graphql = {
  async getFishingSessions(address: string) {
    const query = "";
    return await api.post();
  },
};
