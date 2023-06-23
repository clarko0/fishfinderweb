const StartStopBtn = ({
  windowSize,
  styling,
  updatePageData,
  fishingStatus,
}: any) => {
  const { width, height } = windowSize;
  return (
    <div
      style={{
        width: "400px",
        transform: width > 600 ? "scale(1)" : "scale(0.8)",
        height: "80px",
        cursor: "pointer",
        userSelect: "none",
        position: "fixed",
        zIndex: "10",
        left: width > 1650 ? "50%" : width > 1150 ? "845px" : "50%",
        marginLeft: "-200px",
        top: "70%",
        marginTop:
          width > 1650
            ? "0px"
            : width > 600
            ? "120px"
            : width > 800
            ? "50px"
            : "100px",
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
      onClick={() => {
        if ([2, 1].includes(fishingStatus)) {
          updatePageData("components.menu.end_fishing.open", true);
        } else {
          updatePageData("components.menu.fishing_settings.open", true);
        }
      }}
    >
      {[2, 1].includes(fishingStatus) ? "End Fishing" : "Start Fishing"}
    </div>
  );
};
export default StartStopBtn;
