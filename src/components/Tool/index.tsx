import { IStylingObject } from "@/storage/constants/interfaces";
import { useWindowSize } from "@/storage/utils/tools";
import Router from "next/router";
import { useEffect, useState } from "react";

const Tool = (props: any) => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const size = useWindowSize();
  useEffect(() => {
    setStyling(props.styling);
  }, [props]);
  return (
    <div
      style={{
        transition: "0.3s",
        width: size.width > 600 ? "500px" : "400px",
        height: "300px",
        borderRadius: "3px",
        border: `1px solid ${styling.btn_primary}`,
        userSelect: "none",
        color: styling.font_primary,
        left: "400px",
        cursor: "pointer",
      }}
      onClick={() => {
        Router.push(props.url);
      }}
    >
      <div style={{ marginLeft: "40px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            height: "50px",
            marginTop: "30px",
          }}
        >
          <div>{props.svg}</div>
          <div
            style={{
              fontSize: size.width > 600 ? "30px" : "24px",
              fontWeight: "600",
            }}
          >
            {props.name}
          </div>
        </div>
        <div
          style={{
            marginTop: "30px",
            width: size.width > 600 ? "410px" : "325px",
            fontWeight: "500",
            fontSize: size.width > 600 ? "14px" : "12px",
          }}
        >
          {props.description}
        </div>
        <div
          onMouseEnter={(e: any) => {
            e.target.style.textShadow = styling.txt_glow;
          }}
          onMouseLeave={(e: any) => {
            e.target.style.textShadow = "";
          }}
          style={{
            border: `1px solid ${styling.font_primary}`,
            width: "200px",
            transition: "0.3s",
            height: "50px",
            borderRadius: "3px",
            fontSize: "24px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: size.width > 600 ? "100px" : "60px",
            marginTop: "30px",
          }}
        >
          View
        </div>
      </div>
    </div>
  );
};

export default Tool;
