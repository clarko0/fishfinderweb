import { startAutoFishing } from "@/storage/utils/api";
import { sleep } from "@/storage/utils/tools";
import { Animations } from "@/utils/src/animations.utils";
import { UTILS } from "@/utils/utils";
import { Modal } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Ripple from "react-ripplejs";

///t

const FishingSettingsModal = ({
  is_open,
  isCurrentZones,
  setIsCurrentZones,
  isCurrentSets,
  setIsCurrentSets,
  RefreshPing,
  playerLevel,
  setIsFishingSettings,
  isSkipRepair,
  setIsSkipRepair,
  ...props
}: any) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);
  return (
    <Modal
      width="800px"
      blur
      preventClose
      open={is_open}
      style={{ background: "#000", fontFamily: "inter" }}
    >
      <div
        style={{
          userSelect: "none",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <svg
          width="33"
          height="22"
          viewBox="0 0 33 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            left: "20px",
            top: "20px",
            cursor: "pointer",
          }}
          onClick={() => {
            setIsFishingSettings(false);
          }}
        >
          <path
            d="M3 11.3333L1.93934 10.2727L0.87868 11.3333L1.93934 12.394L3 11.3333ZM31 12.8333C31.8284 12.8333 32.5 12.1618 32.5 11.3333C32.5 10.5049 31.8284 9.83333 31 9.83333V12.8333ZM11.2727 0.93934L1.93934 10.2727L4.06066 12.394L13.394 3.06066L11.2727 0.93934ZM1.93934 12.394L11.2727 21.7273L13.394 19.606L4.06066 10.2727L1.93934 12.394ZM3 12.8333H31V9.83333H3V12.8333Z"
            fill="white"
          />
        </svg>
        <div style={{ marginTop: "60px" }}>
          <div style={{ fontSize: "40px", fontWeight: "600", color: "#fff" }}>
            Start Fishing
          </div>
          <div
            style={{ fontSize: "20px", fontWeight: "600", color: "#949494" }}
          >
            Please choose a fishing stratergy
          </div>
        </div>
        <div
          style={{
            width: "300px",
            height: "250px",
            borderRadius: "3px",
            border: "1px solid #fff",
            marginTop: "70px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            cursor: "pointer",
            boxShadow: "0px 0px 39px 0px rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "150px",
              height: "30px",
              background: "linear-gradient(90deg, #16172E 0%, #6700B8 167.67%)",
              borderRight: "1px solid #FFFFFF",
              borderRadius: "3px 0px 0px 3px",
              right: "-1px",
              top: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Recommended
          </div>
          <svg
            style={{ marginTop: "70px" }}
            width="60"
            height="42"
            viewBox="0 0 60 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0.585786 0.585786C0 1.17157 0 2.11438 0 4V38C0 39.8856 0 40.8284 0.585786 41.4142C1.17157 42 2.11438 42 4 42H56C57.8856 42 58.8284 42 59.4142 41.4142C60 40.8284 60 39.8856 60 38V4C60 2.11438 60 1.17157 59.4142 0.585786C58.8284 0 57.8856 0 56 0H4C2.11438 0 1.17157 0 0.585786 0.585786ZM8.9978 7.9978C8.44552 7.9978 7.9978 8.44552 7.9978 8.9978C7.9978 9.55009 8.44552 9.9978 8.9978 9.9978H14.9978C15.5501 9.9978 15.9978 9.55009 15.9978 8.9978C15.9978 8.44552 15.5501 7.9978 14.9978 7.9978H8.9978ZM44 32.9956C44 32.4433 44.4477 31.9956 45 31.9956H51C51.5523 31.9956 52 32.4433 52 32.9956C52 33.5479 51.5523 33.9956 51 33.9956H45C44.4477 33.9956 44 33.5479 44 32.9956ZM37.0022 21.0044C37.0022 24.8704 33.8682 28.0044 30.0022 28.0044C26.1362 28.0044 23.0022 24.8704 23.0022 21.0044C23.0022 17.1384 26.1362 14.0044 30.0022 14.0044C33.8682 14.0044 37.0022 17.1384 37.0022 21.0044ZM39.0022 21.0044C39.0022 25.975 34.9728 30.0044 30.0022 30.0044C25.0316 30.0044 21.0022 25.975 21.0022 21.0044C21.0022 16.0338 25.0316 12.0044 30.0022 12.0044C34.9728 12.0044 39.0022 16.0338 39.0022 21.0044Z"
              fill="white"
            />
          </svg>
          <div style={{ fontWeight: "600", marginTop: "19px" }}>
            Highest $WoD
          </div>
          <div
            style={{
              fontSize: "14px",
              fontWeight: "400",
              textAlign: "center",
              width: "186px",
              color: "#949494",
              marginTop: "5px",
            }}
          >
            Calculates best sets Finds #1 zones to fish in
          </div>
        </div>
        <div
          style={{
            width: "200px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(90deg, #16172E 0%, #6700B8 204.25%)",
            borderRadius: "3px",
            cursor: "pointer",
            marginTop: "50px",
            position: "relative",
            marginBottom: "50px",
          }}
          onClick={async (e: any) => {
            if (!isButtonDisabled) {
              setIsButtonDisabled(true);
              setIsFishingSettings((prev: any) => {
                if (!prev) {
                  return false;
                }
                return false;
              });

              await startAutoFishing(
                playerLevel,
                isCurrentSets,
                isCurrentZones,
                isSkipRepair
              );
              e.target.style.display = "flex";
              await RefreshPing();
            }
          }}
        >
          <Ripple
            style={{ width: "100%", height: "100%", position: "absolute" }}
          ></Ripple>
          Start Fishing
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            fontSize: "16px",
            fontWeight: "400",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div style={{ marginLeft: "-50px" }}>Quick Settings</div>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div
              style={{
                width: "20px",
                height: "20px",
                transition: "0.3s",
                borderRadius: "3px",
                border: "1px solid #fff",
                cursor: "pointer",
                background: isCurrentZones ? "#195FC2" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={async (e: any) => {
                setIsCurrentZones(!isCurrentZones);
                await Animations.Rotation(e);
              }}
            ></div>
            Use current zones
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div
              style={{
                width: "20px",
                transition: "0.3s",
                height: "20px",
                borderRadius: "3px",
                border: "1px solid #fff",
                cursor: "pointer",
                background: isCurrentSets ? "#195FC2" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={async (e: any) => {
                setIsCurrentSets(!isCurrentSets);
                await Animations.Rotation(e);
              }}
            ></div>
            Use current items
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
            <div
              style={{
                width: "20px",
                transition: "0.3s",
                height: "20px",
                borderRadius: "3px",
                border: "1px solid #fff",
                cursor: "pointer",
                background: isSkipRepair ? "#195FC2" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={async (e: any) => {
                setIsSkipRepair(!isSkipRepair);
                await Animations.Rotation(e);
              }}
            ></div>
            Skip repair on startup
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FishingSettingsModal;
