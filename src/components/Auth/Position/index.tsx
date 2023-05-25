import { useEffect, useState } from "react";

const PositionBar = ({ node, complete, nodes, error, ...props }: any) => {
  const genItems = () => {
    const tempItems = [];
    for (let i = 0; i < nodes; i++) {
      tempItems.push(
        <div
          style={{
            width: "10px",
            transition: "0.3s",
            height: "10px",
            borderRadius: "999px",
            background:
              i == node
                ? complete
                  ? "rgba(0, 255, 128, 1)"
                  : error
                  ? "rgba(255, 0, 153, 1)"
                  : "#D9AD6B"
                : i < node
                ? "rgba(0, 255, 128, 1)"
                : "rgba(187, 107, 217, 1)",
          }}
        ></div>
      );
      tempItems.push(
        <div
          style={{
            width: "48px",
            height: "1px",
            transition: "0.3s",
            background:
              i < node ? "rgba(0, 255, 128, 1)" : "rgba(187, 107, 217, 1)",
          }}
        ></div>
      );
    }
    delete tempItems[tempItems.length - 1];
    return tempItems;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginLeft: "auto",
        height: "10px",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {genItems()}
    </div>
  );
};

export default PositionBar;
