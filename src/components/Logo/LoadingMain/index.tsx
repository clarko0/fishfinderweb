import logo from "public/logo.png";

const LoadingMainLogo = ({ position, seen }: any) => {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        height: "80px",
        maxWidth: "220px",
        alignContent: "center",
        gap: "15px",
        userSelect: "none",
        opacity: seen ? "1" : "0",
        zIndex: "2",
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
        transition: "0.3s",
      }}
    >
      <img src={logo.src} width="80" height="80" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "30px",
            color: "#fff",
          }}
        >
          fishfinder
        </div>
        <div
          style={{
            fontWeight: "400",
            fontSize: "24px",
            lineHeight: "30px",
            color: "#BB6BD9",
            marginLeft: "-8px",
            marginTop: "-10px",
          }}
        >
          .games
        </div>
      </div>
    </div>
  );
};

export default LoadingMainLogo;
