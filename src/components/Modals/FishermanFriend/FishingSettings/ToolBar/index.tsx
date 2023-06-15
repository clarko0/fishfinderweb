import Artifact from "public/artifact.png";
import Legendary from "public/legendary.png";
import Epic from "public/epic.png";
import Rare from "public/rare.png";
import Uncommon from "public/uncommon.png";
import Common from "public/common.png";
import { useEffect, useState } from "react";
import { genRanHex } from "@/storage/constants/misc";

const images: any = {
  6: Artifact.src,
  5: Legendary.src,
  4: Epic.src,
  3: Rare.src,
  2: Uncommon.src,
  1: Common.src,
};
const ToolBar = ({ consumableData, userData, ...props }: any) => {
  const [values, setValues] = useState<any>([]);
  useEffect(() => {
    // consumableData &&
    //   consumableData.map((item: any) => {
    //     console.log(userData.items);
    //     for (const i in userData.items) {
    //       console.log(userData.items[i]);
    //     }
    //   });
    const temp = [];
    const usedRarities: any[] = [];
    for (const i in userData.items) {
      const firstEle = userData.items[i][0];
      if (!firstEle) {
        continue;
      }
      for (let x = 0; x < consumableData.length; x++) {
        if (firstEle.rarity === consumableData[x].rarity) {
          temp.push({
            amount: Number(
              Math.floor(consumableData[x].quantity / userData.items[i].length)
            ),
            image: images[consumableData[x].rarity],
            rarity: consumableData[x].rarity,
          });
          usedRarities.push(consumableData[x].rarity);
        }
      }
    }
    const numbers = [1, 2, 3, 4, 5, 6];
    const notUsedRarities: any[] = numbers.filter(
      (num) => !usedRarities.includes(num)
    );
    for (let i = 0; i < notUsedRarities.length; i++) {
      temp.push({
        amount: 0,
        noItems: true,
        image: images[notUsedRarities[i]],
        rarity: notUsedRarities[i],
      });
    }
    setValues(temp.sort((a: any, b: any) => b.rarity - a.rarity));
  }, [consumableData]);
  return (
    <div style={{ display: "flex", gap: "" }}>
      {values.map((item: any) => {
        return (
          <div
            key={genRanHex(24)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "500",
              gap: "-10px",
            }}
          >
            <img src={item.image} />
            <div
              style={{
                background:
                  item.amount < 11 && !item.noItems ? "#FF0000" : "transparent",
                paddingTop: item.amount < 11 && !item.noItems ? "4px" : "",
                paddingBottom: item.amount < 11 && !item.noItems ? "4px" : "",
                paddingLeft: item.amount < 11 && !item.noItems ? "10px" : "",
                paddingRight: item.amount < 11 && !item.noItems ? "10px" : "",
                borderRadius: "40px",
              }}
            >
              {item.amount}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToolBar;
