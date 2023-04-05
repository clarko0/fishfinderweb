import { IStylingObject } from "@/storage/constants/interfaces";
import { STYLING } from "@/storage/constants/styling";
import { CheckTheme } from "@/storage/utils/local";
import Image from "next/image";
import Wod from "public/wod.png";
import Common from "public/common.png";
import Uncommon from "public/uncommon.png";
import Rare from "public/rare.png";
import Epic from "public/epic.png";
import Legendary from "public/legendary.png";
import Artifact from "public/artifact.png";
import { useEffect, useState } from "react";

const MaterialCard = (props: any) => {
  const [styling, setStyling] = useState<IStylingObject>({});
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [toolTip, setToolTip] = useState<boolean>(false);
  const [icon, setIcon] = useState<any>(<></>);
  const [titleSelect, setTitleSelected] = useState<boolean>(false);
  const [inBasket, setInBasket] = useState<boolean>(false);
  const [isPending, setIsPending] = useState<boolean>(false);
  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
    switch (props.rarity) {
      case 1:
        setIcon(
          <Image
            width="30"
            height="30"
            alt=""
            style={{ position: "absolute", marginLeft: "-27px" }}
            src={Common.src}
          />
        );
        break;
      case 2:
        setIcon(
          <Image
            width="30"
            height="30"
            alt=""
            src={Uncommon.src}
            style={{ position: "absolute", marginLeft: "-27px" }}
          />
        );
        break;
      case 3:
        setIcon(
          <Image
            width="30"
            height="30"
            alt=""
            src={Rare.src}
            style={{ position: "absolute", marginLeft: "-27px" }}
          />
        );
        break;
      case 4:
        setIcon(
          <Image
            width="30"
            height="30"
            alt=""
            src={Epic.src}
            style={{ position: "absolute", marginLeft: "-27px" }}
          />
        );
        break;
      case 5:
        setIcon(
          <Image
            width="30"
            height="30"
            alt=""
            src={Legendary.src}
            style={{ position: "absolute", marginLeft: "-27px" }}
          />
        );
        break;
      case 6:
        setIcon(
          <Image
            width="30"
            height="30"
            alt=""
            src={Artifact.src}
            style={{ position: "absolute", marginLeft: "-27px" }}
          />
        );
        break;
    }
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: styling.font_primary,
        fontWeight: "600",
        fontSize: "18px",
      }}
    >
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
            stroke-width="2"
            stroke-linecap="round"
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
                props.openMatMenu(props);
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
              background: "#3B99FC",
              cursor: "pointer",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            }}
            onClick={async () => {
              try {
                setIsPending(true);
                setIsHovered(false);
                await props.singleBuyMat(props);
                setIsPending(false);
              } catch (e) {
                console.log(e);
                setIsPending(false);
              }
            }}
          >
            Buy one
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
              stroke-width="8"
              stroke-dasharray="42.76482137044271 42.76482137044271"
              d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
              stroke-linecap="round"
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
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginLeft: "10px",
          width: "130px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            marginLeft: "24px",
            fontSize: "14px",
          }}
        >
          {icon}
          {props.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
          }}
        >
          <Image src={Wod.src} height={24} width={24} alt="" />
          {props.floorPrice}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <div
            style={{
              fontSize: "16px",
              color: "grey",
              fontWeight: "500",
            }}
          >
            QTY
          </div>
          {props.amount}
        </div>
      </div>
    </div>
  );
};

export default MaterialCard;
