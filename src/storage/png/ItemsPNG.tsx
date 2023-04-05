import LightItems from "/public/items-light.png";
import DarkItems from "/public/items-dark.png";
import { CheckTheme } from "../utils/local";
const ItemsPNG = () => {
  return <img src={CheckTheme() === "dark" ? DarkItems.src : LightItems.src} />;
};

export default ItemsPNG;
