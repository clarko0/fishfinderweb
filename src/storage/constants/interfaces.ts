export interface IStylingObject {
  [key: string]: any;
}

export interface ITool {
  name: string;
  quantity: number;
  rarity: number;
}

export interface IItem {
  name: string;
  id: string;
  rendered_image_url: string;
  slot_key: string;
  wod_multiplier: number;
  rarity: number;
  durability: number;
  is_teleported: boolean;
}

export interface IUserData {
  username: string;
  avatar: string;
}

export interface IFilters {
  searchTerm: string;
  type: string;
  rarity: number;
}

export interface IItems {
  [key: string]: any;
  common: IItem[];
  uncommon: IItem[];
  rare: IItem[];
  epic: IItem[];
  legendary: IItem[];
  artifact: IItem[];
}

export interface IItemSet {
  [key: string]: any;
}

export interface ICanFish {
  hasSets: boolean;
  isRepaired: boolean;
}
