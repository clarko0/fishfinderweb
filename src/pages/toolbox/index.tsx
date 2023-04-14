import Navbar from "@/components/Navbar";
import Tool from "@/components/Tool";
import { IStylingObject, IUserData } from "@/storage/constants/interfaces";
import { STYLING } from "@/storage/constants/styling";
import { GetAddress, WalletListener } from "@/storage/utils/web3";
import { GetUserdata } from "@/storage/utils/fetch";
import { CheckTheme, GetAuthToken } from "@/storage/utils/local";
import Router from "next/router";
import { useEffect, useState } from "react";
import { isDev } from "@/storage/utils/tools";

const Toolbox = () => {
  const [userData, setUserData] = useState<IUserData>({
    username: "",
    avatar: "",
    tools: [],
    items: {
      common: [],
      uncommon: [],
      rare: [],
      epic: [],
      legendary: [],
      artifact: [],
    },
    isReady: false,
    doublyReady: false,
  });
  const [isDark, setIsDark] = useState<boolean>(false);
  const [styling, setStyling] = useState<IStylingObject>({});

  useEffect(() => {
    if (GetAuthToken() === "") {
      Router.push("/login");
    } else {
      setStyling(STYLING[CheckTheme()]);
      setIsDark(CheckTheme() === "dark");
      GetUserdata().then((res) => {
        setUserData({
          username: "@" + res.data.nickname,
          avatar:
            res.data.avatar_url === null
              ? "https://ynnovate.it/wp-content/uploads/2015/04/default-avatar.png"
              : res.data.avatar_url,
          tools: [],
          items: {
            common: [],
            uncommon: [],
            rare: [],
            epic: [],
            legendary: [],
            artifact: [],
          },
          isReady: true,
          doublyReady: false,
        });
      });
      WalletListener();
    }
  }, []);
  return (
    <div
      style={{
        background: isDev() ? "orange" : styling.background_main,
        width: "100%",
        height: "100vh",
        transition: "0.5s",
      }}
    >
      <Navbar
        avatar={userData.avatar}
        username={userData.username}
        styling={styling}
      />
      <div
        style={{
          display: "flex",
          position: "absolute",
          gap: "60px",
          width: "100%",
          height: "58vh",
          overflow: "auto",
          alignItems: "center",
          justifyContent: "center",
          top: "250px",
          flexWrap: "wrap",
        }}
        className="scrollme"
      >
        <Tool
          svg={
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.3298 8.58472C29.33 8.999 29.2073 9.40401 28.9773 9.74855C28.7473 10.0931 28.4203 10.3617 28.0377 10.5204C27.6551 10.679 27.2341 10.7207 26.8278 10.64C26.4216 10.5593 26.0484 10.3599 25.7554 10.0671C25.4624 9.77429 25.2628 9.40113 25.1819 8.99485C25.1009 8.58856 25.1422 8.16739 25.3006 7.7846C25.459 7.4018 25.7273 7.07457 26.0716 6.84429C26.4159 6.61401 26.8207 6.49102 27.2349 6.49087C27.7903 6.49067 28.323 6.71116 28.7159 7.10383C29.1088 7.4965 29.3296 8.0292 29.3298 8.58472ZM35.9142 23.1573C32.3558 27.6795 26.6326 30.1602 18.9017 30.512L15.275 39.1536C15.1664 39.4064 14.9864 39.6221 14.757 39.7741C14.5277 39.9261 14.259 40.0079 13.9839 40.0093L13.8966 40.0094C13.6074 39.9941 13.3303 39.8882 13.1047 39.7065C12.8791 39.5249 12.7164 39.2768 12.6397 38.9974L10.0537 29.9741L1.03038 27.394C0.750462 27.3159 0.501886 27.1524 0.319308 26.9263C0.13673 26.7001 0.0292514 26.4227 0.0118574 26.1325C-0.00553672 25.8424 0.068021 25.554 0.222274 25.3077C0.376528 25.0614 0.603788 24.8693 0.872368 24.7583L9.50951 21.1246C9.85576 13.3919 12.3144 7.66572 16.8504 4.10325C24.0209 -1.55476 34.1957 0.0823576 37.1452 0.727135C37.6674 0.839309 38.1461 1.09983 38.5239 1.47744C38.9017 1.85504 39.1625 2.33368 39.2751 2.85589C39.9218 5.80556 41.5659 15.9813 35.9142 23.1573ZM36.5529 3.45034C33.9 2.89273 24.7899 1.39487 18.5789 6.30197C17.9204 6.81259 17.3128 7.38567 16.7646 8.01322C16.8017 9.84226 17.5533 11.5841 18.8585 12.8657C20.1636 14.1474 21.9186 14.867 23.7476 14.8706C24.1179 14.8704 24.4731 15.0174 24.735 15.2792C24.9969 15.541 25.1441 15.8961 25.1442 16.2665C25.1491 18.0959 25.8698 19.8507 27.1522 21.1552C28.4345 22.4597 30.1765 23.2102 32.0051 23.246C32.628 22.6929 33.2002 22.0852 33.7147 21.4301C38.6164 15.2143 37.1123 6.10331 36.5529 3.45034Z"
                fill={styling.font_primary}
              />
            </svg>
          }
          name="Fisherman's Friend"
          description="Transform your fishing experience with a tool that does all the hard work for you. Let it cast and reel, so you can sit back, relax and crack open a cold one (or two!). No more long wait times, just effortless fishing
          and plenty of laughs!"
          url="/toolbox/ff"
          styling={styling}
        />
        <Tool
          svg={
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5554 26.4445V33.1111"
                stroke={styling.font_primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M26.4446 26.4445V33.1111"
                stroke={styling.font_primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.44458 17.5555V42"
                stroke={styling.font_primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M37.5554 17.5555V42"
                stroke={styling.font_primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 42H42"
                stroke={styling.font_primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17.5555H42"
                stroke={styling.font_primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M37.5556 10.8891L22 2"
                stroke={styling.font_primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.44458 10.8891L22.0001 2"
                stroke={styling.font_primary}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          name="The Cove"
          description="Bulk buy with a bang! This tool makes it easy to purchase all your items, materials, and fish in a single transaction. No more haggling, no more hassle. Just buy with a smile."
          url="/toolbox/cove"
          styling={styling}
        />
      </div>
    </div>
  );
};

export default Toolbox;
