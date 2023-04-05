import Wod from "public/wod.png";

const CoveBasketCard = (props: any) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img width={"60px"} height={"90px"} src={props.image} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "7px",
          marginLeft: "10px",
        }}
      >
        <div style={{ color: "#777E90", fontWeight: "600" }}>{props.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <img src={Wod.src} />
          <div style={{ color: "#fff", fontWeight: "600" }}>{props.price}</div>
          <div style={{ color: "grey", fontWeight: "500", fontSize: "12px" }}>
            (${props.tokenPrice})
          </div>
        </div>
      </div>
      <svg
        style={{ marginLeft: "20px", cursor: "pointer" }}
        onClick={() => {
          props.removeFromBasket(props);
        }}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M6.64639 6.65264C6.74016 6.55891 6.86731 6.50625 6.99989 6.50625C7.13248 6.50625 7.25963 6.55891 7.35339 6.65264L9.99989 9.29914L12.6464 6.65264C12.6925 6.60489 12.7477 6.5668 12.8087 6.54059C12.8697 6.51439 12.9353 6.5006 13.0017 6.50002C13.0681 6.49944 13.1339 6.51209 13.1954 6.53723C13.2568 6.56237 13.3126 6.5995 13.3596 6.64645C13.4065 6.69339 13.4437 6.74922 13.4688 6.81067C13.4939 6.87212 13.5066 6.93796 13.506 7.00434C13.5054 7.07073 13.4916 7.13634 13.4654 7.19735C13.4392 7.25835 13.4011 7.31352 13.3534 7.35964L10.7069 10.0061L13.3534 12.6526C13.4445 12.7469 13.4949 12.8732 13.4937 13.0043C13.4926 13.1354 13.44 13.2608 13.3473 13.3536C13.2546 13.4463 13.1292 13.4988 12.9981 13.5C12.867 13.5011 12.7407 13.4507 12.6464 13.3596L9.99989 10.7131L7.35339 13.3596C7.25909 13.4507 7.13279 13.5011 7.00169 13.5C6.87059 13.4988 6.74519 13.4463 6.65248 13.3536C6.55978 13.2608 6.5072 13.1354 6.50606 13.0043C6.50492 12.8732 6.55531 12.7469 6.64639 12.6526L9.29289 10.0061L6.64639 7.35964C6.55266 7.26588 6.5 7.13873 6.5 7.00614C6.5 6.87356 6.55266 6.74641 6.64639 6.65264Z"
          fill="#FF0000"
        />
        <rect
          x="1"
          y="1"
          width="18"
          height="18"
          rx="9"
          stroke="#FF0000"
          stroke-width="2"
        />
      </svg>
    </div>
  );
};

export default CoveBasketCard;
