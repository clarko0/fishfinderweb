import axios from "axios";
import { useEffect, useState } from "react";
import { IItem, IItems, ITool } from "../constants/interfaces";
import { isDocked } from "./window";
import { type } from "os";
import { ApiLocalStorage } from "@/local/api.local";

export const CaclulateFishingTime = (items: IItems, tools: ITool[]) => {
  let k = 0;
  for (const i in items) {
    if (items[i].length === 0) {
      k++;
    }
  }
  if (k === 5) {
    return { string: "00 : 00 : 00 : 00 : 00", seconds: 0 };
  }
  let repairs: any = [];
  let smallest = {
    number_of_repairs: 0,
  };
  try {
    for (const k in items) {
      if (items[k].length === 0) {
        continue;
      }
      for (let i = 0; i < tools.length; i++) {
        if (items[k][0].rarity === tools[i].rarity) {
          repairs.push({
            rarity: k,
            number_of_repairs: Math.floor(tools[i].quantity / items[k].length),
          });
        }
      }
    }
    smallest = repairs[0];
    for (let i = 0; i < repairs.length; i++) {
      if (repairs[i].number_of_repairs < smallest.number_of_repairs) {
        smallest = repairs[i];
      }
    }
  } catch (e) {}
  const monthInSeconds = 2628000;
  const dayInSeconds = 86400;
  const hourInSeconds = 3600;
  const minuteInSeconds = 60;
  if (smallest === undefined) {
    return { string: "00 : 00 : 00 : 00 : 00", seconds: 0 };
  }
  let seconds = 83700 + 21150 * smallest.number_of_repairs;
  let months = Math.floor(seconds / monthInSeconds);
  seconds = seconds % monthInSeconds;

  let days = Math.floor(seconds / dayInSeconds);
  seconds = seconds % dayInSeconds;

  let hours = Math.floor(seconds / hourInSeconds);
  seconds = seconds % hourInSeconds;

  let minutes = Math.floor(seconds / minuteInSeconds);
  seconds = seconds % minuteInSeconds;

  return {
    string:
      `${months.toString().padStart(2, "0")} : ` +
      `${days.toString().padStart(2, "0")} : ` +
      `${hours.toString().padStart(2, "0")} : ` +
      `${minutes.toString().padStart(2, "0")} : ` +
      `${seconds.toString().padStart(2, "0")}`,
    seconds: 83700 + 21150 * smallest.number_of_repairs,
  };
};

export const GetTokenPrice = async (tokens: number) => {
  const res = await axios.get(
    "https://min-api.cryptocompare.com/data/price?fsym=WOD&tsyms=USD"
  );
  const tokenPrice = res.data.USD;
  return tokenPrice * tokens;
};

export const toBytes = (text: string): number[] => {
  const buffer = Buffer.from(text, "utf8");
  const result = Array(buffer.length);
  for (let i = 0; i < buffer.length; ++i) {
    result[i] = buffer[i];
  }
  return result;
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<any>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
}

export const determineTRID = (props: any) => {
  if (props.zone) {
    switch (props.tier) {
      case 1:
        return "rgba(160, 162, 193";
      case 2:
        return "rgba(255, 255, 255";
      case 3:
        return "rgba(65, 171, 225";
      case 4:
        return "rgba(196, 99, 255";
      case 5:
        return "rgba(254, 177, 29";
      case 6:
        return "rgba(244, 67, 54";
    }
  } else if (props.fish) {
    return "rgba(254, 177, 29";
  } else {
    return "rgba(65, 171, 225";
  }
};

export const determineCOID = (props: any) => {
  switch (props.collection) {
    case 1:
      return "rgb(64, 140, 255";
    case 2:
      return "rgb(62, 181, 138";
    case 3:
      return "rgb(213, 0, 249";
    case 4:
      return "rgb(224, 159, 28";
  }
};

export const convertTier = (tier: any) => {
  switch (tier) {
    case 1:
      return 5;
    case 2:
      return 4;
    case 3:
      return 3;
    case 4:
      return 2;
    case 5:
      return 1;
  }
};

export const calculateToolCost = (
  numberOfRepairs: any,
  cData: any,
  percent: any,
  items: IItems
) => {
  let price: number = 0;
  let z: number = 1;
  for (const key in items) {
    price +=
      items[key].length *
      numberOfRepairs *
      cData[percent].filter((item: any) => {
        return item.rarity === z;
      })[0].price;
    z++;
  }
  return price;
};

export const compareArrays = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const getSubdomain = () => {
  if (isDocked()) {
    var host = window.location.host;
    var subdomain = host.split(".")[0];
    return subdomain;
  }
};

export const isDev = () => {
  return getSubdomain() === "dev";
};

export const intToString = (num: any) => {
  try {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num.toFixed(2);
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (
      (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
      si[index].s
    );
  } catch (e) {
    return 0;
  }
};

export const getBase64 = (event: any) => {
  let me = this;
  let file = event.target.files[0];
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    //me.modelvalue = reader.result;
    return reader.result;
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
};

export function onFileSelected(event: any) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag: any = document.getElementById("pfpImage");
  imgtag.title = selectedFile.name;

  reader.onload = function (event) {
    if (event.target) imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
}

export function getEmailFromToken() {
  let token = ApiLocalStorage.ReadAuthToken().replace("Bearer ", "");
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload).email;
}
