const RarityBtn = ({ updatePageData, rarity, imgSrc, rarities }: any) => {
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
        opacity: rarities[rarity] ? "1" : "0.25",
      }}
      onClick={() => {
        updatePageData(
          `components.menu.tool.form.rarities.${rarity}`,
          !rarities[rarity]
        );
      }}
    >
      <img
        src={imgSrc}
        style={{ transition: "0.5s" }}
        onMouseEnter={(e: any) => {
          e.target.style.transform = "scale(1.2)";
          e.target.style.filter = " blur(2px)";
        }}
        onMouseLeave={(e: any) => {
          e.target.style.transform = "scale(1.0)";
          e.target.style.filter = "blur(0px)";
        }}
      />
    </div>
  );
};

export default RarityBtn;
