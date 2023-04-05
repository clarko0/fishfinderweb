import { isDocked } from "../utils/window";

export const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const genRanHex = (size: number) => {
  return [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join("");
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const convertImgToB64 = (file: any) => {
  var reader = new FileReader();
  var baseString;
  reader.onloadend = function () {
    baseString = reader.result;
    return baseString;
  };
  reader.readAsDataURL(file);
};

export const getAddressId = () => {
  if (isDocked()) {
    return window.location.pathname.split("/")[2];
  }
  return "";
};
