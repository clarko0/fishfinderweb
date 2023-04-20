const StartStopBtn = ({
  size,
  styling,
  isFishing,
  status,
  setIsEndFishingMenu,
  startAutoFishing,
  playerLevel,
}: any) => {
  return (
    <div
      style={{
        width: "400px",
        transform: size.width > 600 ? "scale(1)" : "scale(0.8)",
        height: "80px",
        cursor: "pointer",
        userSelect: "none",
        position: "fixed",
        zIndex: "10",
        left: size.width > 1650 ? "50%" : size.width > 1150 ? "845px" : "50%",
        marginLeft: "-200px",
        top: "70%",
        marginTop:
          size.width > 1650 ? "0px" : size.width > 600 ? "120px" : "50px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        background: styling.inverse_btn_primary,
        borderRadius: "3px",
        fontSize: "30px",
        boxShadow: styling.inverse_btn_glow,
      }}
      onClick={async () => {
        if (isFishing || status === "Pending") {
          setIsEndFishingMenu(true);
        } else {
          await startAutoFishing(playerLevel);
          window.location.reload();
        }
      }}
    >
      {isFishing || status === "Pending" ? "End Fishing" : "Start Fishing"}
    </div>
  );
};
export default StartStopBtn;
