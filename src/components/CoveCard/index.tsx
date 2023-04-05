import { IStylingObject } from "@/storage/constants/interfaces";
import { STYLING } from "@/storage/constants/styling";
import { CheckTheme } from "@/storage/utils/local";
import { useEffect, useState } from "react";
import Wod from "public/wod.png";
import { isDocked } from "@/storage/utils/window";
import {
  approveTokens,
  buyOrder,
  isUnlimitedApprove,
} from "@/storage/utils/method";
import Image from "next/image";
import {
  convertTier,
  determineCOID,
  determineTRID,
} from "@/storage/utils/tools";

const CoveCard = (props: any) => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [toolTip, setToolTip] = useState<boolean>(false);
  const [titleSelect, setTitleSelected] = useState<boolean>(false);
  const [inBasket, setInBasket] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);

  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
  }, []);
  return (
    <div>
      <div
        style={{
          transition: "0.5s",
          width: "200px",
          height: "200px",
          borderRadius: "16px",
          filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          overflow: "hidden",
          boxShadow: inBasket ? "0px 0px 0px 10px inset #39FF14" : "",
          background: styling.itemGradient,
        }}
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
      >
        <svg
          style={{
            position: "absolute",
            zIndex: "1",
            top: "50%",
            marginTop: "-50px",
            left: "50%",
            marginLeft: "-50px",
            width: inBasket ? "100px" : "0px",
            height: inBasket ? "100px" : "0px",
            transition: "0.5s",
          }}
          viewBox="0 0 15 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 9L4.23309 11.4248C4.66178 11.7463 5.26772 11.6728 5.60705 11.2581L14 1"
            stroke="#39FF14"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>

        <div
          style={{
            transition: "0.5s",
            display: "flex",
            position: "absolute",
            zIndex: "1",
            width: isHovered && !isPending ? "200px" : "0px",
            height: "200px",
            overflow: "hidden",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            gap: "20px",
            filter: "",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "3px",
              color: inBasket ? "red" : "#3B99FC",
              fontWeight: "600",
              textAlign: "center",
              cursor: "pointer",
              background: "#fff",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            onClick={() => {
              if (!inBasket) {
                props.addToBasket(props);
                setIsHovered(false);
                setInBasket(true);
              } else {
                props.removeFromBasket(props);
                setIsHovered(false);
                setInBasket(false);
              }
            }}
          >
            {inBasket ? "Remove from basket" : "Add to basket"}
          </div>
          <div
            style={{
              width: "120px",
              height: "50px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "3px",
              color: "#fff",
              fontWeight: "600",
              background: props.wodBalance >= props.price ? "#3B99FC" : "grey",
              cursor:
                props.wodBalance >= props.price ? "pointer" : "not-allowed",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            onClick={async () => {
              if (props.wodBalance >= props.price) {
                try {
                  setIsPending(true);
                  setIsHovered(false);
                  await props.singleBuy(props);
                  setIsPending(false);
                } catch (e) {
                  setIsPending(false);
                }
              }
            }}
          >
            Buy now
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            transition: "0.5s",
            overflow: "hidden",
            zIndex: "1",
            top: "50%",
            marginTop: "-50px",
            left: "50%",
            marginLeft: "-50px",
            width: isPending ? "100px" : "0px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100px"
            height="100px"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
          >
            <path
              fill="none"
              stroke="#93dbe9"
              strokeWidth="8"
              strokeDasharray="42.76482137044271 42.76482137044271"
              d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
              strokeLinecap="round"
            >
              <animate
                attributeName="stroke-dashoffset"
                repeatCount="indefinite"
                dur="1s"
                keyTimes="0;1"
                values="0;256.58892822265625"
              ></animate>
            </path>
          </svg>
        </div>
        <picture
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "0.5s",
            width: "100%",
            height: "100%",
            overflow: "hidden",
            transform: isHovered && !isPending ? "scale(1.2)" : "scale(1.01)",
            filter:
              isHovered && !isPending
                ? "blur(2px) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
                : "",
            opacity: isPending || inBasket ? "0.2" : "1",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              fontWeight: "600",
              zIndex: "100",
              height: "25px",
              width: "80px",
              color: determineTRID(props) + ",1.0)",
              textShadow: "1px 1px rgba(0, 0, 0, 0.2)",
              fontSize: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: determineTRID(props) + ",0.3)",
              borderRadius: "9000px",
            }}
          >
            {/* {idDDD} */}
            {props.zone
              ? "Tier " +
                (props.tier === 6 ? "Special" : convertTier(props.tier))
              : props.fish
              ? props.stars + " Stars"
              : "Level " + props.level}
          </div>

          <Image
            src={props.image}
            style={{
              borderStyle: "none",
              display: "block",
              objectFit: "contain",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              width: "100%",
              height: "100%",
            }}
            width={1000}
            height={1000}
            alt="img"
            quality={100}
          />
        </picture>
      </div>
      <div
        style={{
          fontWeight: "600",
          marginLeft: "10px",
          marginTop: "10px",
        }}
      >
        <div
          style={{
            transition: "0.5s",
            fontSize: "16px",
            color: titleSelect ? styling.blue_important : "#777E90",
            cursor: "pointer",
            textDecoration: titleSelect ? "underline" : "none",
          }}
          onMouseEnter={() => {
            setTitleSelected(true);
          }}
          onMouseLeave={() => {
            setTitleSelected(false);
          }}
          onClick={() => {
            if (isDocked()) {
              window.open(
                `https://marketplace.worldofdefish.com/${
                  props.zone ? "zone" : "item"
                }/${props.id}`
              );
            }
          }}
        >
          {props.zone ? "#" + props.id : props.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "18px",
            gap: "2px",
            color: styling.font_primary,
            marginTop: "5px",
          }}
        >
          <img src={Wod.src} width="24px" height="24px" />
          {(parseInt(props.price) * 1.00495049505).toFixed(2)}
          <div style={{ fontSize: "12px", fontWeight: "500", color: "grey" }}>
            (${props.tokenPrice})
          </div>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: "1px",
          background: "#fff",
          borderRadius: "999px",
          marginTop: "5px",
          marginBottom: "5px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          height: "30px",
        }}
      >
        <div
          style={{ width: "20px" }}
          onMouseEnter={() => {
            setToolTip(true);
          }}
          onMouseLeave={() => {
            setToolTip(false);
          }}
        >
          {props.icon}
        </div>
        {!props.zone && !props.fish && (
          <div
            style={{
              fontWeight: "600",
              zIndex: "100",
              height: "25px",
              width: "90px",
              color: determineCOID(props) + ",1.0)",
              textShadow: "1px 1px rgba(0, 0, 0, 0.2)",
              fontSize: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderColor: "hsla(0,0%,100%,.12)",
              caretColor: determineCOID(props) + ",1.0)",
              backgroundColor: determineCOID(props) + ", 0.3)",
              borderRadius: "9000px",
            }}
          >
            {"Collection #" + props.collection}
          </div>
        )}
        <div
          style={{
            transition: "0.5s",
            color: styling.font_primary,
            borderRadius: "3px",
            width: toolTip ? "150px" : "0px",
            marginTop: "50px",
            overflow: "hidden",
            height: toolTip ? "30px" : "0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "grey",
            position: "absolute",
            zIndex: "1",
          }}
        >
          {props.type !== undefined &&
            (props.type[0].toUpperCase() + props.type.slice(1)).replace(
              "-",
              " "
            )}
        </div>
      </div>
    </div>
  );
};

export default CoveCard;
