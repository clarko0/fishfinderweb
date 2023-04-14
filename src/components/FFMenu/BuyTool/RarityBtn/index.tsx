const RarityBtn = ({
  setToolMenuData,
  toolMenuData,
  imgSrc,
  idA,
  idB,
  rarity,
  setClicker,
  clicker,
}: any) => {
  return (
    <div
      style={{
        border: "1px solid #fff",
        overflow: "hidden",
        objectFit: "contain",
        width: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "0.2s",
        opacity: toolMenuData.rarities[rarity] ? "1" : "0.25",
      }}
      onClick={() => {
        const ele = document.getElementById(idB);
        if (ele !== null && toolMenuData.rarities[rarity]) {
          ele.style.width = "0px";
        }
        setClicker(!clicker);
        setToolMenuData((prevData: any) => {
          let newData: any = prevData;
          newData.rarities[rarity] = !newData.rarities[rarity];
          return newData;
        });
      }}
    >
      <svg
        width="24"
        height="24"
        id={idB}
        viewBox="0 0 14 14"
        fill="none"
        style={{
          position: "absolute",
          zIndex: "999",
          width: "0px",
          height: "24px",
          transition: "0.5s",
        }}
        onMouseEnter={(e: any) => {
          const ele = document.getElementById(idA);
          if (ele !== null) {
            ele.style.transform = "scale(1.2)";
            ele.style.filter = " blur(2px)";
          }
          e.target.style.width = "24px";
        }}
        onMouseLeave={(e: any) => {
          const ele = document.getElementById(idA);
          if (ele !== null) {
            ele.style.transform = "scale(1.0)";
            ele.style.filter = " blur(0px)";
          }
          e.target.style.width = "0px";
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 1L1 13"
          stroke="red"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M1 1L13 13"
          stroke="red"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <img
        src={imgSrc}
        id={idA}
        style={{ transition: "0.5s" }}
        onMouseEnter={(e: any) => {
          const ele = document.getElementById(idB);
          if (ele !== null && toolMenuData.rarities[rarity]) {
            ele.style.width = "24px";
          }
          e.target.style.transform = "scale(1.2)";
          e.target.style.filter = " blur(2px)";
        }}
        onMouseLeave={(e: any) => {
          const ele = document.getElementById(idB);
          if (ele !== null) {
            ele.style.width = "0px";
          }
          e.target.style.transform = "scale(1.0)";
          e.target.style.filter = "blur(0px)";
        }}
      />
    </div>
  );
};

export default RarityBtn;
