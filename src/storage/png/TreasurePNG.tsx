import LightTreasure from "/public/treasure-light.png";
import DarkTreasure from "/public/treasure-dark.png";
import { CheckTheme } from "../utils/local";
const TreasurePNG = () => {
  return (
    <img src={CheckTheme() === "dark" ? DarkTreasure.src : LightTreasure.src} />
  );
};

export default TreasurePNG;
