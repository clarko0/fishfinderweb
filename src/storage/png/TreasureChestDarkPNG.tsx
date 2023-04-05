import TreasureChestDark from "../../../public/background-dark.png";
import TreasureChestLight from "../../../public/background-light.png";
import { CheckTheme } from "../utils/local";

const TreasureChestDarkPNG = () => {
  return (
    <img
      src={
        CheckTheme() === "dark" ? TreasureChestDark.src : TreasureChestLight.src
      }
      alt="treasure"
      width={"2000px"}
      style={{}}
    />
  );
};

export default TreasureChestDarkPNG;
