const RaritySegment = ({ image, quantity, repairs }: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "55px",
        height: "65px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img src={image} width={"36"} height={"36"} />
      <div style={{ color: "#fff", fontWeight: "500", fontSize: "14px" }}>
        {parseInt(repairs)}
      </div>
      <div
        style={{
          width: "15px",
          height: "1px",
          background: "#fff",
          marginTop: "3px",
          color: "transparent",
        }}
      >
        .
      </div>
      <div
        style={{
          fontWeight: "300",
          fontSize: "10px",
          color: "#727272",
          lineHeight: "12px",
          height: "12px",
          marginTop: "3px",
        }}
      >
        {parseInt(quantity)}
      </div>
    </div>
  );
};

export default RaritySegment;
