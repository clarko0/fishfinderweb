import MetaMaskLoadingSVG from "@/storage/svg/MetaMaskLoadingSVG";
import { endAutoFishing } from "@/storage/utils/api";
import {
  GetActiveZone,
  endSession,
  getSessionInfo,
} from "@/storage/utils/fetch";

const EndFishingMenu = ({
  setIsEndFishingMenu,
  RefreshPing,
  endingFishing,
  setEndingFishing,
  sessionId,
  isEndFishingMenu,
}: any) => {
  return (
    <div
      style={{
        width: isEndFishingMenu ? "100vw" : "0px",
        height: "100vh",
        overflow: "hidden",
        transition: "0.5s",
        position: "absolute",
        backdropFilter: "blur(9px)",
        zIndex: "9999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          height: "500px",
          background: "#303030",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "6px",
          color: "#fff",
        }}
      >
        <div
          style={{
            fontSize: "30px",
            fontWeight: "600",
            marginLeft: "20px",
            display: "flex",
            gap: "150px",
            marginTop: "20px",
          }}
        >
          End Fishing
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsEndFishingMenu(false);
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.2928 13.3053C13.4803 13.1178 13.7346 13.0125 13.9998 13.0125C14.265 13.0125 14.5193 13.1178 14.7068 13.3053L19.9998 18.5983L25.2928 13.3053C25.385 13.2098 25.4954 13.1336 25.6174 13.0812C25.7394 13.0288 25.8706 13.0012 26.0034 13C26.1362 12.9989 26.2678 13.0242 26.3907 13.0745C26.5136 13.1247 26.6253 13.199 26.7192 13.2929C26.8131 13.3868 26.8873 13.4984 26.9376 13.6213C26.9879 13.7442 27.0132 13.8759 27.012 14.0087C27.0109 14.1415 26.9833 14.2727 26.9309 14.3947C26.8785 14.5167 26.8023 14.627 26.7068 14.7193L21.4138 20.0123L26.7068 25.3053C26.8889 25.4939 26.9897 25.7465 26.9875 26.0087C26.9852 26.2709 26.88 26.5217 26.6946 26.7071C26.5092 26.8925 26.2584 26.9977 25.9962 27C25.734 27.0022 25.4814 26.9014 25.2928 26.7193L19.9998 21.4263L14.7068 26.7193C14.5182 26.9014 14.2656 27.0022 14.0034 27C13.7412 26.9977 13.4904 26.8925 13.305 26.7071C13.1196 26.5217 13.0144 26.2709 13.0121 26.0087C13.0098 25.7465 13.1106 25.4939 13.2928 25.3053L18.5858 20.0123L13.2928 14.7193C13.1053 14.5318 13 14.2775 13 14.0123C13 13.7471 13.1053 13.4928 13.2928 13.3053Z"
              fill="white"
            />
            <rect
              x="1"
              y="1"
              width="38"
              height="38"
              rx="19"
              stroke="#CCCCCC"
              strokeWidth="2"
            />
          </svg>
        </div>
        {!endingFishing ? (
          <>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "500",
                width: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: "50%",
                marginLeft: "-100px",
                top: "425px",
              }}
            >
              Are you sure?
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "500",
                width: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                left: "50%",
                marginLeft: "-100px",
                top: "500px",
                height: "60px",
                borderRadius: "3px",
                background: "rgba(51, 102, 204, 1)",
                cursor: "pointer",
              }}
              onClick={async () => {
                setEndingFishing(true);
                await endAutoFishing(sessionId);
                await RefreshPing();
                setEndingFishing(false);
                setIsEndFishingMenu(false);
              }}
            >
              Confirm
            </div>
          </>
        ) : (
          <div
            style={{
              marginTop: "100px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              color: "#fff",
              fontWeight: "600",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <MetaMaskLoadingSVG />
            Please wait, ending fishing.
          </div>
        )}
      </div>
    </div>
  );
};

export default EndFishingMenu;
