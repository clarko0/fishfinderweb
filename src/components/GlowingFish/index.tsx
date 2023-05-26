import LargeFish from "public/largefish.png";

let opacity = "1";
const GlowingFish = ({ size, seen, position }: any) => {
  return (
    <div
      style={{
        transition: "0.3s",
        display: "flex",
        alignItems: "center",
        opacity: seen ? "1" : "0",
        justifyContent: "center",
        position: "absolute",
        bottom: position.bottom,
        top: position.top,
        width: size.width,
        height: size.height,
        right: position.right,
        left: position.left,
        zIndex: "0",
      }}
    >
      <img
        src={LargeFish.src}
        style={{
          position: "absolute",
          zIndex: "1",
          left: "0",
          bottom: "0",
        }}
      />
      <div
        style={{
          width: "20%",
          background: "transparent",
          height: "20%",
          borderRadius: "999px",
          filter:
            "drop-shadow(0px 0px 2000.96px #008040) drop-shadow(0px 0px 2229.12px #008040) drop-shadow(0px 0px 1300.32px #008040) drop-shadow(0px 0px 650.16px #008040)",
          boxShadow:
            "0px 0px 50px #008040, 0px 100px 100px #008040, 0px -100px 100px #008040, 100px -100px 100px #008040, -100px -100px 100px #008040 , -100px 100px 100px #008040, 100px 100px 100px #008040",
          zIndex: "0",
        }}
      ></div>
    </div>
  );
};

export default GlowingFish;
