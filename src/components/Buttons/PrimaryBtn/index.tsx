import React, { useEffect, useState } from "react";
import Ripple from "react-ripplejs";

const PrimaryBtn = ({ width, height, css, text, onClick, ...props }: any) => {
  const [btnStyle, setBtnStyle] = useState({
    width: width ? width : "100%",
    height: height ? height : "75px",
    cursor: "pointer",
    background: "linear-gradient(180deg, #BB6BD9 0%, #6B7DD9 100%)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    fontWeight: "500",
    transition: "0.3s",
    overflow: "hidden",
  });

  useEffect(() => {
    setBtnStyle((prev) => ({ ...prev, ...css }));
  }, [css]);

  return (
    <div
      style={{ ...btnStyle, position: "relative" }}
      onMouseDown={(e: any) => {}}
      onMouseUp={(e: any) => {}}
      onClick={() => {
        onClick();
      }}
    >
      <Ripple
        style={{ width: "100%", height: "100%", position: "absolute" }}
      ></Ripple>
      {text}
    </div>
  );
};

export default PrimaryBtn;
