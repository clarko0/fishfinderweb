import { useState } from "react";

const FFGlobalStatistics = ({ fisherCount, styling, size }: any) => {
  const [toolTip, setToolTip] = useState<any>({
    fisher_count: false,
  });
  return (
    <div
      style={{
        display: size.width > 1250 ? "flex" : "none",
        color: styling.font_primary,
        alignItems: "center",
        position: "absolute",
        flexDirection: "column",
        width: "600px",
        height: "170px",
        marginLeft: "-300px",
        left: size.width > 1650 ? "50%" : "940px",
        top: size.width > 1650 ? "350px" : "200px",
      }}
    >
      <div style={{ fontSize: "20px", fontWeight: "600" }}>
        Global Statistics
      </div>
      <div
        style={{
          width: "600px",
          height: "80px",
          background: "#020609",
          border: "1px solid #120A18",
          borderRadius: "3px",
          marginTop: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            fontWeight: "600",
            fontSize: "20px",
            justifyContent: "center",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              color: "#fff",
              fontWeight: "600",
              fontSize: "20px",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
            }}
            onMouseEnter={() => {
              setToolTip({ ...toolTip, fisher_count: true });
            }}
            onMouseLeave={() => {
              setToolTip({ ...toolTip, fisher_count: false });
            }}
          >
            <svg
              width="40"
              height="28"
              viewBox="0 0 40 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.211 13.75C26.211 10.789 26.9922 7.875 28.4843 5.3125L29.0782 4.27343C27.8282 3.97657 26.5625 3.78907 25.2813 3.71875C23.5703 2.39843 21.0157 0.828134 18.0703 0.335933L16.25 0L17.2968 4.83593C14.0391 5.9375 11.1719 8.1875 9.26562 9.72657C8.89843 9.42187 8.51564 9.11719 8.10939 8.82814C5.00782 6.5625 1.65625 6.34375 1.51563 6.33593L0 6.25L0.210938 7.75782C0.234375 7.91407 0.742188 11.25 2.6875 13.7343C0.742188 16.2187 0.234375 19.5547 0.210938 19.7187L0 21.25L1.51563 21.1407C1.65625 21.1328 5.00782 20.914 8.10939 18.6485C8.50782 18.3593 8.88282 18.0625 9.25 17.7578C11.1563 19.3047 14.0234 21.5547 17.289 22.6563L16.25 27.5L18.0625 27.1718C20.9922 26.6797 23.539 25.1093 25.25 23.789C26.5468 23.711 27.836 23.5235 29.1015 23.2265L28.4843 22.1953C26.9922 19.625 26.2032 16.7187 26.211 13.75Z"
                fill="white"
              />
              <path
                d="M39.0312 11.0782C38.5702 10.3047 37.742 9.13281 36.3592 7.92968C34.9217 6.69531 33.2812 5.71875 31.5155 5.03906L30.6405 6.5625C28.0624 11 28.0624 16.4843 30.6327 20.9297L31.5545 22.461C33.3045 21.789 34.9295 20.8282 36.3514 19.6093C38.828 17.461 39.9999 14.7657 39.9999 13.75C39.9999 12.789 39.3749 11.664 39.0312 11.0782ZM32.4999 13.75C31.8124 13.75 31.2499 13.1875 31.2499 12.5C31.2499 11.8125 31.8124 11.25 32.4999 11.25C33.1874 11.25 33.7499 11.8125 33.7499 12.5C33.7499 13.1875 33.1874 13.75 32.4999 13.75Z"
                fill="white"
              />
            </svg>
            <div>{fisherCount}</div>
          </div>
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              position: "absolute",
              background: "#000",
              fontWeight: "400",
              fontSize: "12px",
              marginTop: !toolTip.fisher_count ? "100px" : "140px",
              opacity: !toolTip.fisher_count ? "0" : "1",
              lineHeight: "16px",
              padding: "12px",
              borderRadius: "8px",
              flex: "none",
              order: "1",
              flexGrow: "0",
              transition: "opacity 0.2s, margin-top 0.25s",
            }}
          >
            <div
              style={{
                width: "16px",
                height: "16px",
                position: "absolute",
                background: "#000",
                marginTop: "-16px",
                borderRadius: "3px",
                transform: "rotate(45deg)",
                flex: "none",
                order: "0",
                flexGrow: "0",
              }}
            ></div>
            People Fishing
          </div>
        </div>
      </div>
    </div>
  );
};

export default FFGlobalStatistics;
