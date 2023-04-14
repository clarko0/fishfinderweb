import Wod from "public/wod.png";

const DashboardModal = ({
  size,
  timer,
  statusColor,
  sessions,
  setIsActiveSessionMenu,
  wodFarmed,
  wodFarmedPrice,
  wodPerHour,
  wodPerHourPrice,
  status,
  gettingSessions,
}: any) => {
  return (
    <div
      style={{
        width: "440px",
        height: "700px",
        position: "absolute",
        transform: size.width > 600 ? "scale(1)" : "scale(0.8)",
        background: "#000",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        border: "1px solid #16172E",
        borderRadius: "10px",
        top: "50%",
        zIndex: "10",
        marginTop: size.width > 600 ? "-300px" : "-300px",
        marginLeft: size.width > 1150 ? "125px" : "-220px",
        left: size.width > 1150 ? "0px" : "50%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          color: "#fff",
          fontSize: "30px",
          fontWeight: "600",
          width: "160px",
          height: "60px",
          marginLeft: "140px",
          userSelect: "none",
          marginTop: "40px",
        }}
      >
        Dashboard
      </div>
      <div
        style={{
          width: "380px",
          height: "1px",
          background: "#fff",
          marginLeft: "30px",
          marginTop: "20px",
        }}
      ></div>
      <div style={{ display: "flex", marginLeft: "30px", marginTop: "30px" }}>
        <div style={{ color: "#fff", fontWeight: "500", fontSize: "24px" }}>
          Next Repair
        </div>
        <div
          style={{
            color: "#fff",
            fontSize: "16px",
            fontWeight: "700",
            marginLeft: "70px",
          }}
        >
          <div>{timer}</div>
          <div
            style={{
              fontSize: "8px",
              display: "flex",
              fontWeight: "400",
              marginTop: "5px",
            }}
          >
            <div style={{ marginLeft: "-7px" }}>HOURS</div>
            <div style={{ marginLeft: "3px" }}>MINUTES</div>
            <div style={{ marginLeft: "3px" }}>SECONDS</div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "380px",
          height: "1px",
          background: "#fff",
          marginLeft: "30px",
          marginTop: "30px",
        }}
      ></div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>Status</div>
          <div
            style={{
              width: "150px",
              height: "40px",
              borderRadius: "30px",
              border: `1px solid ${statusColor}`,
              display: "flex",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                background: statusColor,
                marginLeft: "20px",
                borderRadius: "999px",
              }}
            ></div>
            <div style={{ marginLeft: "15px" }}>
              {status === "Pending" ? "Starting Up" : status}
            </div>
          </div>
        </div>
      </div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "30px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>
            Sessions Running
          </div>
          <div style={{ fontSize: "14px" }}>
            {sessions !== undefined ? (
              gettingSessions ? (
                <div
                  style={{
                    width: "50px",
                    height: "14px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                sessions.length
              )
            ) : (
              "0"
            )}
            {!gettingSessions && `/15`}
          </div>
          <div
            style={{
              marginLeft: "-30px",
              cursor: "pointer",
              display: gettingSessions ? "none" : "flex",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                setIsActiveSessionMenu(true);
              }}
            >
              <path
                d="M3 21L10.5 13.5M3 21V15.4M3 21H8.6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.0711 3L13.5 10.5M21.0711 3V8.65685M21.0711 3H15.4142"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>$WoD Earned</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <img
              src={Wod.src}
              style={{
                filter: "drop-shadow(0px 0px 10px #808000)",
              }}
            />
            <div style={{ fontSize: "14px" }}>
              {gettingSessions ? (
                <div
                  style={{
                    width: "80px",
                    height: "14px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                wodFarmed
              )}
            </div>
            <div style={{ fontSize: "10px", color: "#4F4F4F" }}>
              {gettingSessions ? (
                <div
                  style={{
                    width: "40px",
                    height: "10px",
                    background: "#4F4F4F",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                `($${wodFarmedPrice.toFixed(2)})`
              )}
            </div>
          </div>
        </div>
      </div>
      <div style={{ color: "#fff", marginLeft: "30px", marginTop: "40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
          <div style={{ fontSize: "20px", fontWeight: "500" }}>$WoD/Hour</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
            }}
          >
            <img
              src={Wod.src}
              style={{
                filter: "drop-shadow(0px 0px 10px #808000)",
              }}
            />
            <div style={{ fontSize: "14px" }}>
              {status === "Pending" ? (
                "Loading..."
              ) : gettingSessions ? (
                <div
                  style={{
                    width: "80px",
                    height: "14px",
                    background: "#fff",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                `${wodPerHour.toFixed(2)}`
              )}
            </div>
            <div style={{ fontSize: "10px", color: "#4F4F4F" }}>
              {gettingSessions ? (
                <div
                  style={{
                    width: "40px",
                    height: "10px",
                    background: "#4F4F4F",
                    borderRadius: "3px",
                  }}
                ></div>
              ) : (
                `($${wodPerHourPrice.toFixed(2)})`
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
