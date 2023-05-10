import { getBase64, onFileSelected } from "@/storage/utils/tools";
import { Button, Input, Modal } from "@nextui-org/react";
import Fish2 from "public/fish-2.png";
import { useState } from "react";
import Squid from "public/squid-1.png";

const OneLastThingModal = ({
  is_open,
  oltData,
  setOltData,
  img,
  setOltImage,
  oltImage,
}: any) => {
  const [pfpHovered, setPfpHovered] = useState<boolean>(false);
  const [imgDisplayed, setImgDisplayed] = useState<boolean>(false);

  return (
    <Modal
      width="900px"
      scroll
      blur
      open={is_open}
      preventClose
      css={{
        background: "#0A0808",
        fontFamily: "inter",
        userSelect: "none",
        height: "800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        style={{
          position: "absolute",
          right: "-100px",
          transition: "0.5s",
        }}
        width="200px"
        src={Fish2.src}
        onMouseEnter={(e: any) => {
          e.target.style.right = "-10px";
        }}
        onMouseLeave={(e: any) => {
          e.target.style.right = "-100px";
        }}
      />
      <img
        width="200px"
        src={Squid.src}
        style={{
          position: "absolute",
          left: "-90px",
          bottom: "0",
          transition: "0.3s",
        }}
        onMouseEnter={(e: any) => {
          e.target.style.left = "-10px";
        }}
        onMouseLeave={(e: any) => {
          e.target.style.left = "-100px";
        }}
      />
      <div
        style={{
          fontSize: "40px",
          fontWeight: "600",
          color: "#fff",
          marginTop: "80px",
        }}
      >
        One Last Thing
      </div>
      <div
        style={{
          color: "#949494",
          fontWeight: "600",
          fontSize: "24px",
        }}
      >
        Let the world know who you are!
      </div>
      <div
        style={{
          width: "150px",
          height: "150px",
          transition: "0.3s",
          borderRadius: "600px",
          cursor: "pointer",
          display: "flex",
          marginTop: "50px",
          alignItems: "center",

          justifyContent: "center",
          overflow: "hidden",
          background:
            "linear-gradient(90deg, rgba(228, 150, 231, 1) 0%, rgba(4, 120, 212, 1) 100%)",
          objectFit: "contain",
        }}
        onMouseEnter={() => {
          setPfpHovered(true);
        }}
        onMouseLeave={() => {
          setPfpHovered(false);
        }}
      >
        <input
          type="file"
          accept="image/png, image/jpeg"
          className="pfpInput"
          style={{
            position: "absolute",
            opacity: "0",
            zIndex: "999",
            display: "block",
            height: "150px",
            width: "150px",
            borderRadius: "999px",
            cursor: "pointer",
          }}
          onChange={(e: any) => {
            setOltData((prev: any) => {
              const newData = prev;
              newData.data.img = getBase64(e);
              onFileSelected(e);
              setImgDisplayed(true);
              return newData;
            });
          }}
        />
        <div
          style={{
            textAlign: "center",
            transition: "0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: "1",
            width: "50px",
            opacity: pfpHovered ? "1" : "0",
          }}
        >
          {imgDisplayed ? "CHANGE AVATAR" : "ADD AVATAR"}
        </div>
        <img
          id="pfpImage"
          src={""}
          style={{
            zIndex: "0",
            transition: "0.3s",
            opacity: pfpHovered ? "0.25" : "1",
            width: "100%",
            height: "100%",
            display: !imgDisplayed ? "none" : "block",
            objectFit: "contain",
            cursor: "pointer",
          }}
        />
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            marginTop: "-100px",
            marginRight: "-100px",
          }}
        >
          <rect width="40" height="40" rx="20" fill="#D9D9D9" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.4999 23.5L13.4098 21.5902C14.7554 20.2445 15.4282 19.5717 16.1571 19.5102C16.524 19.4792 16.8924 19.5502 17.2216 19.7152C17.8754 20.043 18.2502 20.9176 18.9999 22.6667L19.0533 22.7913C19.3794 23.5522 19.5424 23.9326 19.8109 24.0988C20.0195 24.228 20.2684 24.2759 20.5101 24.2335C20.821 24.1789 21.1137 23.8862 21.6991 23.3009L21.8122 23.1877C22.5335 22.4664 22.8942 22.1058 23.3031 21.9538C23.7526 21.7867 24.2472 21.7867 24.6967 21.9538C25.1056 22.1058 25.4662 22.4664 26.1876 23.1877L26.9392 23.9394C27.4761 24.4762 28.1641 24.8271 28.9033 24.9506C28.7778 26.2779 28.4898 27.1668 27.8284 27.8282C26.6569 28.9998 24.7712 28.9998 21 28.9998H19C15.2288 28.9998 13.3431 28.9998 12.1716 27.8282C11 26.6567 11 24.771 11 20.9998V18.9998C11 16.1607 11 14.3903 11.4999 13.1887V23.5Z"
            fill="black"
          />
          <path
            d="M20 11H19C15.2288 11 13.3431 11 12.1716 12.1716C11 13.3431 11 15.2288 11 19V21C11 24.7712 11 26.6569 12.1716 27.8284C13.3431 29 15.2288 29 19 29H21C24.7712 29 26.6569 29 27.8284 27.8284C29 26.6569 29 24.7712 29 21V20"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M29 11V10H30V11H29ZM24.6247 15.7809C24.1934 16.1259 23.5641 16.056 23.2191 15.6247C22.8741 15.1934 22.944 14.5641 23.3753 14.2191L24.6247 15.7809ZM28 16V11H30V16H28ZM29 12H24V10H29V12ZM29.6247 11.7809L24.6247 15.7809L23.3753 14.2191L28.3753 10.2191L29.6247 11.7809Z"
            fill="black"
          />
        </svg>
      </div>
      <Input
        size="xl"
        width="350px"
        bordered
        placeholder="Username"
        color="primary"
        css={{ marginTop: "40px" }}
        onChange={(e: any) => {
          setOltData((prev: any) => {
            const newData = prev;
            newData.data.username = e.target.value;
            return newData;
          });
        }}
        contentLeft={
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.8889 22.5774C23.4785 22.4545 23.8295 21.839 23.5571 21.3018C22.7339 19.6783 21.3569 18.2516 19.5628 17.1808C17.3932 15.8859 14.7348 15.1841 12 15.1841C9.26521 15.1841 6.60683 15.8859 4.43717 17.1808C2.64308 18.2515 1.26607 19.6783 0.442898 21.3018C0.170533 21.839 0.521528 22.4545 1.11114 22.5774L3.83913 23.1459C9.22188 24.2677 14.7781 24.2677 20.1609 23.1459L22.8889 22.5774Z"
              fill="white"
            />
            <circle cx="12" cy="6.90184" r="6.90184" fill="white" />
          </svg>
        }
      />
      <Button
        css={{ width: "250px", height: "50px", marginTop: "40px" }}
        color="gradient"
      >
        {" "}
        Create Account
      </Button>
    </Modal>
  );
};

export default OneLastThingModal;
