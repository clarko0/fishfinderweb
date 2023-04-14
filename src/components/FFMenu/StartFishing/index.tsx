import { startAutoFishing } from "@/storage/utils/api";

const StartFishing = ({
  isFishingMenu,
  setIsFishingMenu,
  canFish,
  playerLevel,
}: any) => {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "9999",
        width: isFishingMenu ? "100vw" : "0px",
        overflow: "hidden",
        transition: "0.5s",
        height: "100vh",
        backdropFilter: "blur(9px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "1200px",
          height: "700px",
          background: "#303030",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            color: "#fff",
            fontWeight: "600",
            fontSize: "40px",
            marginTop: "30px",
            marginLeft: "30px",
            display: "flex",
            gap: "830px",
            alignItems: "center",
          }}
        >
          Start Fishing
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setIsFishingMenu(false);
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
        <div style={{ color: "white", marginLeft: "30px", marginTop: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>
            Requirements
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "30px",
              gap: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontWeight: "500",
                fontSize: "14px",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {canFish.hasSets && (
                <svg
                  width="31"
                  height="22"
                  viewBox="0 0 31 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L11 20L29 2"
                    stroke="#00FF00"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {!canFish.hasSets && (
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.564173 0.588263C0.925522 0.227023 1.41555 0.0240898 1.9265 0.0240898C2.43745 0.0240898 2.92747 0.227023 3.28882 0.588263L13.488 10.7874L23.6871 0.588263C23.8648 0.404224 24.0775 0.257427 24.3126 0.15644C24.5476 0.0554523 24.8005 0.00229605 25.0563 7.27544e-05C25.3122 -0.00215055 25.5659 0.0466031 25.8027 0.14349C26.0396 0.240377 26.2547 0.383456 26.4356 0.564378C26.6165 0.745301 26.7596 0.960444 26.8565 1.19725C26.9534 1.43406 27.0022 1.6878 26.9999 1.94365C26.9977 2.19951 26.9445 2.45236 26.8436 2.68745C26.7426 2.92254 26.5958 3.13516 26.4117 3.31291L16.2126 13.512L26.4117 23.7112C26.7627 24.0746 26.957 24.5613 26.9526 25.0666C26.9482 25.5718 26.7455 26.0551 26.3883 26.4124C26.031 26.7696 25.5477 26.9723 25.0425 26.9767C24.5372 26.9811 24.0505 26.7868 23.6871 26.4358L13.488 16.2367L3.28882 26.4358C2.9254 26.7868 2.43866 26.9811 1.93343 26.9767C1.4282 26.9723 0.94491 26.7696 0.587645 26.4124C0.230381 26.0551 0.0277293 25.5718 0.023339 25.0666C0.0189487 24.5613 0.213171 24.0746 0.564173 23.7112L10.7633 13.512L0.564173 3.31291C0.202934 2.95156 0 2.46154 0 1.95059C0 1.43964 0.202934 0.949612 0.564173 0.588263Z"
                    fill="#FF0000"
                  />
                </svg>
              )}
              Have at least one set off-chain/not in a session already
            </div>
            <div
              style={{
                display: "flex",
                fontWeight: "500",
                fontSize: "14px",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {canFish.isRepaired && (
                <svg
                  width="31"
                  height="22"
                  viewBox="0 0 31 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 11L11 20L29 2"
                    stroke="#00FF00"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {!canFish.isRepaired && (
                <svg
                  width="27"
                  height="27"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M0.564173 0.588263C0.925522 0.227023 1.41555 0.0240898 1.9265 0.0240898C2.43745 0.0240898 2.92747 0.227023 3.28882 0.588263L13.488 10.7874L23.6871 0.588263C23.8648 0.404224 24.0775 0.257427 24.3126 0.15644C24.5476 0.0554523 24.8005 0.00229605 25.0563 7.27544e-05C25.3122 -0.00215055 25.5659 0.0466031 25.8027 0.14349C26.0396 0.240377 26.2547 0.383456 26.4356 0.564378C26.6165 0.745301 26.7596 0.960444 26.8565 1.19725C26.9534 1.43406 27.0022 1.6878 26.9999 1.94365C26.9977 2.19951 26.9445 2.45236 26.8436 2.68745C26.7426 2.92254 26.5958 3.13516 26.4117 3.31291L16.2126 13.512L26.4117 23.7112C26.7627 24.0746 26.957 24.5613 26.9526 25.0666C26.9482 25.5718 26.7455 26.0551 26.3883 26.4124C26.031 26.7696 25.5477 26.9723 25.0425 26.9767C24.5372 26.9811 24.0505 26.7868 23.6871 26.4358L13.488 16.2367L3.28882 26.4358C2.9254 26.7868 2.43866 26.9811 1.93343 26.9767C1.4282 26.9723 0.94491 26.7696 0.587645 26.4124C0.230381 26.0551 0.0277293 25.5718 0.023339 25.0666C0.0189487 24.5613 0.213171 24.0746 0.564173 23.7112L10.7633 13.512L0.564173 3.31291C0.202934 2.95156 0 2.46154 0 1.95059C0 1.43964 0.202934 0.949612 0.564173 0.588263Z"
                    fill="#FF0000"
                  />
                </svg>
              )}
              All items are at 100% durability
            </div>
          </div>
        </div>
        <div
          style={{
            width: "300px",
            height: "80px",
            borderRadius: "3px",
            background:
              canFish.hasSets && canFish.isRepaired ? "#8080FF" : "#D9D9D9",
            fontSize: "24px",
            fontWeight: "600",
            color: canFish.hasSets && canFish.isRepaired ? "white" : "grey",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            cursor:
              canFish.hasSets && canFish.isRepaired ? "pointer" : "not-allowed",
            position: "absolute",
            top: "650px",
            left: "50%",
            marginLeft: "-150px",
          }}
          onClick={async () => {
            if (canFish.hasSets && canFish.isRepaired) {
              await startAutoFishing(playerLevel);
              window.location.reload();
            }
          }}
        >
          Start
        </div>
      </div>
    </div>
  );
};

export default StartFishing;
