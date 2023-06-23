import { intToString } from "@/storage/utils/tools";
import { Tooltip } from "@nextui-org/react";

const GlobalItem = ({ content, value, image }: any) => {
  return (
    <Tooltip
      content={content}
      color="invert"
      placement="bottom"
      css={{
        userSelect: "none",
        fontWeight: "400",
        fontFamily: "inter",
      }}
    >
      <div
        style={{
          height: "60px",
          width: "70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1px",
          marginTop: "5px",
        }}
      >
        {image}
        <div style={{ fontWeight: "600", fontSize: "20px" }}>
          {value >= 1000 ? intToString(value) : value}
        </div>
      </div>
    </Tooltip>
  );
};

export default GlobalItem;
