import Seahorse from "public/lowpolyseahorse.png";
import Fish from "public/lowpolyfish.png";

const WelcomeMenu = ({
  isWelcomeMenu,
  pageLoading,
  windowSize,
  updatePageData,
}: any) => {
  const { width, height } = windowSize;

  return (
    <div
      style={{
        transition: "backdrop-filter 0.3s",
        width: isWelcomeMenu && !pageLoading ? "100vw" : "0px",
        overflow: "hidden",
        height: "100vh",
        backdropFilter:
          isWelcomeMenu && !pageLoading ? "blur(9px)" : "blur(0px)",
        position: "absolute",
        zIndex: "99999",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "900px",
          transition: "0.5s",
          height: "500px",
          background: "#161616",
          position: "relative",
          display: "flex",
          marginLeft: isWelcomeMenu && !pageLoading ? "0px" : "-10000px",
          flexDirection: "column",
          borderRadius: "10px",
          alignItems: "center",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
      >
        <img
          src={Seahorse.src}
          style={{
            position: "absolute",
            transition: "0.5s",
            left: "-100px",
            bottom: "-100px",
            display: width > 1050 ? "flex" : "none",
            marginLeft: isWelcomeMenu && !pageLoading ? "0px" : "-10000px",
          }}
        />
        <img
          src={Fish.src}
          style={{
            position: "absolute",
            transition: "0.5s",
            right: "-100px",
            top: "-100px",
            display: width > 1050 ? "flex" : "none",
            marginLeft: isWelcomeMenu && !pageLoading ? "0px" : "-10000px",
          }}
        />
        <div
          style={{
            fontWeight: "600",
            color: "#fff",
            fontSize: "30px",
            lineHeight: "36px",
            marginTop: "33px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          Welcome to Fisherman&apos;s Friend!
        </div>
        <div
          style={{
            width: "400px",
            height: "170px",
            borderRadius: "3px",
            background: "#1E1E1E",
            marginTop: "65px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              lineHeight: "29px",
              color: "#fff",
              fontWeight: "600",
            }}
          >
            Fully automate your game.
          </div>
          <div
            style={{
              textAlign: "center",
              width: "270px",
              color: "rgba(182, 182, 182, 1)",
              lineHeight: "19px",
              fontWeight: "400",
            }}
          >
            Just click{" "}
            <span style={{ fontWeight: "600", color: "#fff" }}>
              Start Fishing
            </span>
            , relax and leave all the work to our bot.{" "}
            <span style={{ fontWeight: "600", color: "#fff" }}>
              Remember to keep those 25% repair tools topped up!
            </span>
          </div>
        </div>
        <div
          style={{
            width: "200px",
            height: "50px",
            background: "rgba(25, 95, 194, 1)",
            color: "#fff",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "3px",
            marginTop: "65px",
            cursor: "pointer",
          }}
          onClick={() => {
            updatePageData("global.is_welcome_menu", false);
          }}
        >
          Continue
        </div>
      </div>
    </div>
  );
};

export default WelcomeMenu;
