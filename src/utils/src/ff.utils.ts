import { IActiveSessionData, IItem, ISet } from "@/interface/ff.interface";

const arrangeSets = (items: IItem[], itemsToSet: string[]) => {
  let newSet: any = {
    rod: null,
    hook: null,
    line: null,
    float: null,
    reel: null,
    boat: null,
    "fish-feeders-box": null,
    net: null,
    "bite-indicator": null,
  };
  const itemsIgnore: string[] = [];
  itemsToSet.map((item: string) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id == item) {
        const itemType = items[i].slot_key;
        if (newSet[itemType] === null) {
          newSet[itemType] = items[i];
          itemsIgnore.push(item);
          break;
        }
      }
    }
  });
  return {
    set: newSet,
    ignore: itemsIgnore,
  };
};

const createSets = (items: IItem[]): ISet[] => {
  const required_items = ["rod", "hook", "line", "float", "reel"];
  let itemsIgnore: string[] = [];
  const sets: ISet[] = [];

  while (true) {
    const remainingItems: string[] = [];
    items.map((item) => {
      const itemId = item.id;
      if (!itemsIgnore.includes(itemId)) {
        remainingItems.push(itemId);
      }
    });

    if (remainingItems.length === 0) {
      break;
    }

    const data = arrangeSets(items, remainingItems);
    let newSet = data.set;
    itemsIgnore = [...itemsIgnore, ...data.ignore];
    const anyNull = Object.keys(newSet).map((item) => {
      if (required_items.includes(item) && newSet[item] === null) {
        return true;
      }
      return false;
    });

    if (anyNull.includes(true)) {
      break;
    }
    sets.push(newSet);
  }

  return sets;
};

const getItemsFromSets = (sets: ISet[]): IItem[] => {
  const items: IItem[] = [];
  sets.map((set: any) => {
    for (const i in set) {
      if (set[i] !== null) {
        items.push(set[i]);
      }
    }
  });
  return items;
};

const removeItemsFromList = (items: IItem[], list: IItem[]): IItem[] => {
  const idSet = new Set(items.map((item) => item.id));
  return list.filter((item) => !idSet.has(item.id));
};

export const FF = {
  createSets,
  getItemsFromSets,
  removeItemsFromList,
};
