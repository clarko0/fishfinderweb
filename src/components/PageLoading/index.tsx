import MetaMaskLoadingSVG from "@/storage/svg/MetaMaskLoadingSVG";

const PageLoading = ({ text, styling, pageLoading }: any) => {
  return (
    <div
      style={{
        width: pageLoading ? "100vw" : "0px",
        transition: "0.5s",
        overflow: "hidden",
        height: "100vh",
        position: "absolute",
        zIndex: "99",
        background: styling.background_main,
        color: styling.font_primary,
        display: "flex",
        alignItems: "center",
        fontWeight: "600",
        flexDirection: "column",
        fontSize: "30px",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      {text}
      <div>
        <MetaMaskLoadingSVG />
      </div>
    </div>
  );
};

export default PageLoading;
