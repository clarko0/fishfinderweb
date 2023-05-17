const LoadingBar = ({ size, index, seen, barText }: any) => {
  const handleCellGeneration = () => {
    const cells: any = [];
    for (let i = 0; i < size; i++) {
      cells.push(
        <div
          style={{
            width: "20px",
            height: "8px",
            borderRadius: "31px",
            background:
              i <= index
                ? "rgba(0, 255, 128, 1)"
                : "linear-gradient(180deg, #BB6BD9 0%, #6B7DD9 100%)",
          }}
        ></div>
      );
    }
    return cells;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        bottom: "100px",
        alignItems: "center",
        gap: "17px",
        opacity: seen ? "1" : "0",
        transition: "0.3s",
      }}
    >
      <div style={{ fontSize: "14px", fontWeight: "400", color: "#BB6BD9" }}>
        {barText}
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        {handleCellGeneration()}
      </div>
    </div>
  );
};

export default LoadingBar;
