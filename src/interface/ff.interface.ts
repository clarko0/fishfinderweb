export interface IConsumable {
  quantity: number;
  repairs: IRepairs;
  rarity: 1 | 2 | 3 | 4 | 5 | 6;
  repair_amount: 25 | 50 | 100;
  price: number;
  id: string;
}

export interface IRepairs {
  quantity: number;
  in_days: number;
}

export interface IConsumableData {
  1: IConsumable[];
  2: IConsumable[];
  3: IConsumable[];
}

export interface IGlobalStatistics {
  wod_farmed: number;
  nft_count: number;
  fisherman_count: number;
}

export interface IActiveSessionData {
  items: IItem[];
  wod_multiplier: number;
  zone: IZone;
}

export interface IZone {
  id: number;
  agents: number;
  wod_multiplier: number;
  fee: number;
}

export interface IItem {
  image_url: string;
  rarity: number;
  wod_multiplier: number;
}

export interface ISet {
  rod: IItem;
  line: IItem;
  float: IItem;
  reel: IItem;
  hook: IItem;
  fish_feeders_box?: IItem;
  boat?: IItem;
  bite_indicator?: IItem;
  net?: IItem;
}
