import { isDocked } from "@/storage/utils/window";
import Wod from "public/wod.png";

interface IFishingCardProps {
  itemCards: any[];
  zoneId: number;
  wodPerHour: number;
  wodEarned: number;
}

const FishingCard: React.FC<IFishingCardProps> = ({
  itemCards,
  zoneId,
  wodPerHour,
  wodEarned,
}: IFishingCardProps) => {
  return (
    <div style={{ display: "flex", gap: "30px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>{itemCards}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "500" }}>ZONE</div>
          <div
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              if (isDocked()) {
                window.open(
                  `https://game.worldofdefish.com/zone/${zoneId}/fishing`
                );
              }
            }}
          >
            {zoneId}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "500" }}>$WoD/HOUR</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              width="20px"
              src={Wod.src}
              style={{
                filter: "drop-shadow(0px 0px 10px #808000)",
              }}
            />
            {wodPerHour.toFixed(2)}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "500" }}>$WoD EARNED</div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={Wod.src}
              width="20px"
              style={{
                filter: "drop-shadow(0px 0px 10px #808000)",
              }}
            />
            <div>{wodEarned.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FishingCard;
