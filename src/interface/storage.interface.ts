import { IItems, IUserData } from "@/storage/constants/interfaces";
import {
  IActiveSessionData,
  IConsumable,
  IConsumableData,
  IItem,
  ISet,
} from "./ff.interface";

export interface IFFData {
  page_loading: boolean;
  global: {
    is_welcome_menu: boolean;
    repair_mode: 1 | 2 | 3;
    is_days: boolean;
    wod_price: number;
    is_fishing: boolean;
    fishing_status: 0 | 1 | 2;
    session_id: string;
  };
  components: {
    system_message: {
      shown: boolean;
      message: {
        title: string;
        msg: string;
      };
    };
    dashboard: {
      next_repair_counter: string;
      sessions_running: number;

      estimated_earnings: {
        amount: number;
        price: number;
      };
      data: {
        farm_statistics: {
          wod_per_hour: {
            amount: number;
            price: number;
          };
          wod_farmed: {
            amount: number;
            price: number;
          };
        };
        next_repair: Date;
      };
    };
    global_statistics: {
      data: {
        wod_farmed: number;
        nft_count: number;
        fisherman_count: number;
      };
    };
    menu: {
      end_fishing: {
        open: boolean;
        is_ending: boolean;
      };
      fishing_settings: {
        open: boolean;
        form: {
          keep_zones: boolean;
          keep_sets: boolean;
          skip_repair: boolean;
        };
      };
      tool: {
        open: boolean;
        form: {
          rarities: {
            1: boolean;
            2: boolean;
            3: boolean;
            4: boolean;
            5: boolean;
            6: boolean;
          };
          offchain_wod: boolean;
          tools: {
            amount: number;
            price: number;
            usd: number;
          };
        };
      };
      fishing: {
        open: boolean;
        cards: any[];
      };
    };
  };

  consumable_data: {
    consumables: IConsumable[];
    measurements: {
      1: {
        amount: number;
        repairs: {
          amount: number;
          in_days: number;
        };
      };
      2: {
        amount: number;
        repairs: {
          amount: number;
          in_days: number;
        };
      };
      3: {
        amount: number;
        repairs: {
          amount: number;
          in_days: number;
        };
      };
      4: {
        amount: number;
        repairs: {
          amount: number;
          in_days: number;
        };
      };
      5: {
        amount: number;
        repairs: {
          amount: number;
          in_days: number;
        };
      };
      6: {
        amount: number;
        repairs: {
          amount: number;
          in_days: number;
        };
      };
    };
  };
  data: {
    consumable_data: {
      1: IConsumable[];
      2: IConsumable[];
      3: IConsumable[];
    };
    consumable_prices_ids: any;
    items: IItem[];
    items_in_sets: IItem[];
    sets: ISet[];
    active_session_data: IActiveSessionData[];
  };
}

export interface IGlobalData {
  components: {
    navbar: {
      shown: boolean;
    };
  };
  user_data: {
    username: "";
    avatar: "";
  };
}

export interface ICoveData {}
