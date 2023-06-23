import Artifact from "public/artifact.png";
import Legendary from "public/legendary.png";
import Epic from "public/epic.png";
import Rare from "public/rare.png";
import Uncommon from "public/uncommon.png";
import Common from "public/common.png";
import { useEffect, useState } from "react";
import { genRanHex } from "@/storage/constants/misc";

const images: any = [
  Common.src,
  Uncommon.src,
  Rare.src,
  Epic.src,
  Legendary.src,
  Artifact.src,
];
const ToolBar = ({ consumableData }: any) => {
  // const [values, setValues] = useState<any>([]);
  // useEffect(() => {
  //   // consumableData &&
  //   //   consumableData.map((item: any) => {
  //   //     console.log(userData.items);
  //   //     for (const i in userData.items) {
  //   //       console.log(userData.items[i]);
  //   //     }
  //   //   });
  //   const temp = [];
  //   for (const i in userData.items) {
  //     const firstEle = userData.items[i][0];
  //     for (let x = 0; x < consumableData.length; x++) {
  //       if (firstEle.rarity === consumableData[x].rarity) {
  //         temp.push({
  //           amount: Number(
  //             Math.floor(consumableData[x].quantity / userData.items[i].length)
  //           ),
  //           image: images[consumableData[x].rarity],
  //         });
  //       }
  //     }
  //   }
  //   setValues(temp);
  // }, [consumableData]);
  return (
    <div style={{ display: "flex", gap: "" }}>
      {Object.keys(consumableData)
        .map((item: any, index: number) => {
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
              <img src={images[index]} />
              <div
                style={{
                  background:
                    consumableData[item].repairs.amount < 11
                      ? "#FF0000"
                      : "transparent",
                  paddingTop:
                    consumableData[item].repairs.amount < 11 ? "4px" : "",
                  paddingBottom:
                    consumableData[item].repairs.amount < 11 ? "4px" : "",
                  paddingLeft:
                    consumableData[item].repairs.amount < 11 ? "10px" : "",
                  paddingRight:
                    consumableData[item].repairs.amount < 11 ? "10px" : "",
                  borderRadius: "40px",
                }}
              >
                {Math.floor(consumableData[item].repairs.amount)}
              </div>
            </div>
          );
        })
        .reverse()}
    </div>
  );
};

export default ToolBar;
