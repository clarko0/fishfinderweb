import axios from "axios";

const api = axios.create({
  baseURL: "https://api.defish.games/graphql/",
});

export const Graphql = {
  async getFishingSessionData(
    address: string,
    with_item_data: boolean = false,
    with_rewards: boolean = false,
    with_zone_data: boolean = false
  ) {
    const query = `{
        fishings(
            pagination: {}
            sort: {}
            filter: {owner: "${address}", is_ended: false}
        ) {
            id,
            ${
              with_item_data
                ? `slot_items {
                id
                rendered_image_url
                wod_multiplier
                rarity
            }`
                : ""
            }
            ${
              with_rewards
                ? `last_saved_wod_earned
                pending_drops {
                    _id
                }
                `
                : ""
            }
            ${
              with_zone_data
                ? `zone {
                    id
                    random_wod_rate
                    fee
                    fishing_pool {
                        agents_amount
                        wod_multiplier
                    }
                }`
                : ""
            }
        }
    }`;
    return (await api.post("", { query: query })).data;
  },
};
