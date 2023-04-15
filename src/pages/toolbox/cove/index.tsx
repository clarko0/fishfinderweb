import CoveBasketCard from "@/components/CoveBasketCard";
import CoveCard from "@/components/CoveCard";
import Navbar from "@/components/Navbar";
import {
  IFilters,
  IStylingObject,
  IUserData,
} from "@/storage/constants/interfaces";
import { genRanHex } from "@/storage/constants/misc";
import { STYLING } from "@/storage/constants/styling";
import {
  getAllMarketplaceFish,
  getAllMarketplaceItems,
  GetAllZones,
  getMarketplaceFish,
  getMarketplaceItems,
  getMarketplaceMaterials,
  getMarketplaceMaterialsIndex,
  GetUserdata,
  TokenPrice,
} from "@/storage/utils/fetch";
import { CheckTheme } from "@/storage/utils/local";
import {
  approveTokens,
  bulkBuyOrder,
  buyOrder,
  getWodBalance,
  isUnlimitedApprove,
  ItemContractAddress,
} from "@/storage/utils/method";
import { GetTokenPrice, sleep, useWindowSize } from "@/storage/utils/tools";
import { GetAddress } from "@/storage/utils/web3";
import { useEffect, useRef, useState } from "react";
import Wod from "public/wod.png";
import MaterialCard from "@/components/MaterialCard";
import { isDocked } from "@/storage/utils/window";

const TheCove = () => {
  const [isConfirmationMenu, setIsConfirmationMenu] = useState<boolean>(false);
  const [isApproval, setIsApproval] = useState<boolean>(false);
  const [isBuy, setIsBuy] = useState<boolean>(false);
  const [purchaseComplete, setPurchaseComplete] = useState<boolean>(false);
  const [txId, setTxId] = useState<any>("");
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
  const [response, setResponse] = useState<any>("");

  const [itemsLoading, setItemsLoading] = useState<boolean>(false);
  const [canAfford, setCanAfford] = useState<boolean>(false);
  const size = useWindowSize();
  const [activeCards, setActiveCards] = useState<any[]>([]);
  const [isMatMenu, setIsMatMenu] = useState<boolean>(false);
  const [matData, setMatData] = useState<any[]>([]);
  const [thumbPosition, setThumbPosition] = useState<number>(0);
  const sliderRef = useRef<any>(null);
  const [wodCost, setWodCost] = useState<string>("0.00");
  const labelRef = useRef<any>(null);
  const [isItemAdded, setIsItemAdded] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<any>({
    currentValue: 1,
    max: 1,
  });
  const [currentType, setCurrentType] = useState<string>("All Types");

  const [loadPercent, setLoadPercent] = useState<number>(0);
  const [wodBalance, setWodBalance] = useState<any>("0.00");

  const [cards, setCards] = useState<any>({
    1: {
      view: [],
      hidden: [],
    },
    2: {
      view: [],
      hidden: [],
    },
    3: {
      view: [],
      hidden: [],
    },
    4: {
      view: [],
      hidden: [],
    },
    5: {
      view: [],
      hidden: [],
    },
    6: {
      view: [],
      hidden: [],
    },
  });

  const [styling, setStyling] = useState<IStylingObject>({});
  const [isDark, setIsDark] = useState<boolean>(false);
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [basket, setBasket] = useState<any[]>([]);
  const [scrollY, setScrollY] = useState<number>(0);
  const [basketCards, setBasketCards] = useState<any[]>([]);
  const [isBasket, setIsBasket] = useState<boolean>(false);
  const [rarityFilter, setRarityFilter] = useState<any>({
    displayed: false,
    options: [
      { text: "All Rarities" },
      { text: "Common" },
      { text: "Uncommon" },
      { text: "Rare" },
      { text: "Epic" },
      { text: "Legendary" },
      { text: "Artifact" },
    ],
  });
  const [typeFilter, setTypeFilter] = useState<any>({
    displayed: false,
    options: [
      { text: "All Types" },
      { text: "Rod" },
      { text: "Hook" },
      { text: "Reel" },
      { text: "Line" },
      { text: "Float" },
      { text: "Net" },
      { text: "Boat" },
      { text: "Bite Indicator" },
      { text: "Fish Feeders Box" },
    ],
  });
  const [filters, setFilters] = useState<IFilters>({
    searchTerm: "",
    rarity: 0,
    type: "",
  });
  const [menu, setMenu] = useState<any>({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [itemData, setItemData] = useState<any>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    length: 0,
  });
  const getIcon = (type: string) => {
    const styling: IStylingObject = STYLING[CheckTheme()];
    if (type === "line") {
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.54782 1.79645C2.90183 1.57576 3.29514 1.55435 3.71517 1.69751C4.1516 1.84627 4.58277 2.16683 4.89886 2.56045C5.21566 2.95498 5.58173 3.85053 5.88128 4.92092C5.91839 5.05349 5.95373 5.18603 5.98721 5.31756C4.29299 6.12718 3.0805 7.44155 2.14234 8.94744C1.4406 10.0738 0.650453 11.6139 0.935038 13.2788C1.07684 14.1084 1.57604 14.666 2.26817 14.8894C2.88972 15.0899 3.56806 14.9914 4.12579 14.7972C5.45718 14.3338 6.35654 13.0308 6.88217 12.1296C7.73057 10.6753 8.05663 9.15255 7.98622 7.50926C7.97238 7.18634 7.92419 6.78487 7.84907 6.34413C8.00859 6.30561 8.17194 6.27515 8.33449 6.25729C8.88931 6.19631 9.29837 6.29342 9.56814 6.54648C9.63947 6.61339 9.71374 6.73905 9.75428 6.98373C9.79511 7.23015 9.79008 7.52907 9.75885 7.85959C9.73841 8.0759 9.71554 8.23994 9.69241 8.40576C9.67551 8.52691 9.65849 8.64909 9.64217 8.79324C9.62702 8.92718 9.61179 9.0937 9.62019 9.24911C9.6244 9.32704 9.63613 9.44104 9.67664 9.56347C9.71637 9.68352 9.80723 9.88142 10.0168 10.0291C10.3075 10.2341 10.6212 10.2037 10.8172 10.1325C10.9838 10.0721 11.1018 9.97427 11.1607 9.92169C11.2861 9.80986 11.4006 9.66438 11.485 9.55324C11.5717 9.43897 11.648 9.33326 11.7245 9.22714C11.8379 9.06978 11.952 8.91136 12.1023 8.72276C12.3336 8.43223 12.5566 8.19739 12.7651 8.0524C12.9699 7.90996 13.0735 7.91223 13.12 7.92186C13.1998 7.93843 13.3479 7.99795 13.5176 8.08466C13.5931 8.12327 13.6593 8.16015 13.7063 8.18723C13.7295 8.20065 13.7476 8.21136 13.7592 8.21832L13.7714 8.22569L13.7726 8.22644C14.1496 8.45977 14.6452 8.34419 14.8791 7.96736C15.1131 7.59028 14.9971 7.0949 14.6201 6.86089L14.1963 7.54366C14.6201 6.86089 14.6201 6.86089 14.6201 6.86089L14.6185 6.85994L14.6161 6.8585L14.6091 6.85422L14.5863 6.84043C14.5675 6.82906 14.5411 6.81344 14.5086 6.79475C14.4442 6.75762 14.3538 6.70724 14.2489 6.65363C14.0577 6.55588 13.7492 6.4111 13.4465 6.34829C12.8068 6.21553 12.2525 6.45135 11.8475 6.73305C11.6817 6.84836 11.5266 6.98086 11.3831 7.11988C11.3756 6.98747 11.3618 6.85375 11.3397 6.72102C11.2653 6.2713 11.0854 5.76618 10.6676 5.37435C9.91113 4.66471 8.9394 4.57402 8.15891 4.65981C7.93534 4.68437 7.71617 4.72439 7.50651 4.77373C7.48137 4.67814 7.45549 4.58272 7.42893 4.4878C7.12836 3.41378 6.69383 2.229 6.15196 1.5542C5.67566 0.961054 5.00214 0.438267 4.23364 0.176337C3.44875 -0.0911754 2.5369 -0.0905753 1.69761 0.43266C0.606999 1.11257 -0.147197 2.4487 0.0243263 3.81267C0.10566 4.45945 0.295006 4.98241 0.659696 5.45524C1.00067 5.89732 1.46391 6.25134 1.98215 6.61698C2.34477 6.87284 2.84613 6.78629 3.10198 6.42366C3.35782 6.06104 3.27128 5.55968 2.90866 5.30383C2.39207 4.93935 2.1108 4.7052 1.93226 4.47373C1.77745 4.27301 1.6723 4.03702 1.61887 3.61216C1.53496 2.9448 1.92225 2.18645 2.54782 1.79645ZM3.50639 9.79725C4.26113 8.58578 5.15883 7.60413 6.31816 6.95521C6.35201 7.19536 6.37325 7.40696 6.38058 7.57807C6.43917 8.94535 6.172 10.1576 5.49398 11.3199C4.97267 12.2135 4.3251 13.0262 3.59753 13.2794C3.2223 13.41 2.92725 13.4133 2.7617 13.3598C2.6906 13.3369 2.65023 13.3066 2.62206 13.2734C2.59307 13.2391 2.54594 13.1646 2.51917 13.0081C2.34346 11.9801 2.82159 10.8965 3.50639 9.79725Z"
            fill={styling.font_primary}
          />
        </svg>
      );
    } else if (type === "boat") {
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 41 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.00846 23.5741L18.0007 1.89274L18.0085 23.5684L2.00846 23.5741ZM9.65711 19.8017L14.0071 19.8001L14.005 13.91L9.65711 19.8017ZM21.0085 23.5673C21.4081 22.6875 21.8409 21.1481 22.3068 18.949C22.7727 16.7498 23.0052 14.5193 23.0044 12.2575C23.0036 9.99574 22.7781 7.67119 22.3279 5.28389C21.8764 2.89659 21.4337 1.13757 21 0.00682538C23.0335 0.571546 25.0592 1.62318 27.0771 3.16174C29.0937 4.7003 30.911 6.53736 32.5291 8.67293C34.1459 10.8085 35.4634 13.1565 36.4816 15.717C37.4986 18.2763 38.0075 20.891 38.0085 23.5612L21.0085 23.5673ZM26.2071 19.7957L33.6071 19.7931C33.0396 17.3744 32.1141 15.1601 30.8307 13.15C29.546 11.14 28.1867 9.42843 26.7529 8.01531C26.8198 8.67498 26.8787 9.3579 26.9296 10.0641C26.9792 10.7715 27.0041 11.5022 27.0044 12.2561C27.0049 13.7326 26.9301 15.0991 26.7799 16.3557C26.631 17.6123 26.4401 18.759 26.2071 19.7957ZM14.0122 33.9364C12.8122 33.9368 11.6954 33.6702 10.6619 33.1365C9.62838 32.6029 8.7448 31.9278 8.01117 31.1113C7.54468 31.5827 7.03683 32.0226 6.48765 32.4312C5.93713 32.8398 5.32858 33.1699 4.662 33.4214C3.49504 32.6051 2.50335 31.592 1.68691 30.3822C0.869143 29.1737 0.309999 27.847 0.00948021 26.4021L40.0095 26.3877C39.71 27.8329 39.1525 29.16 38.3369 30.3691C37.52 31.5794 36.5284 32.5932 35.362 33.4104C34.6952 33.1593 34.0871 32.8297 33.5376 32.4215C32.9868 32.0133 32.478 31.5737 32.0112 31.1027C31.2448 31.9197 30.3537 32.5954 29.3379 33.1298C28.3208 33.6642 27.2122 33.9317 26.0122 33.9321C24.8122 33.9325 23.6954 33.6659 22.6619 33.1322C21.6284 32.5986 20.7448 31.9235 20.0112 31.107C19.2781 31.924 18.395 32.5997 17.3619 33.1341C16.3288 33.6685 15.2122 33.936 14.0122 33.9364ZM0.0148975 41.4808L0.0135432 37.7111L2.01354 37.7104C3.08021 37.71 4.12149 37.5525 5.13737 37.238C6.15459 36.9235 7.11309 36.452 8.01287 35.8234C8.91309 36.4513 9.87193 36.9147 10.8894 37.2134C11.9055 37.5108 12.9469 37.6593 14.0135 37.6589C15.0802 37.6586 16.1135 37.5093 17.1134 37.2111C18.1133 36.9117 19.0798 36.4477 20.0129 35.8191C20.9131 36.447 21.8719 36.9104 22.8894 37.209C23.9055 37.5065 24.9469 37.655 26.0135 37.6546C27.0802 37.6542 28.1135 37.505 29.1134 37.2068C30.1133 36.9074 31.0798 36.4434 32.0129 35.8148C32.9464 36.4427 33.9133 36.9136 34.9134 37.2273C35.9135 37.5411 36.9469 37.6978 38.0135 37.6974L40.0135 37.6967L40.0149 41.4664L38.0149 41.4671C36.9816 41.4675 35.9649 41.3497 34.9648 41.1139C33.9647 40.8792 32.9812 40.5265 32.0144 40.0556C31.0479 40.5272 30.0647 40.8806 29.0648 41.116C28.0649 41.3526 27.0482 41.4711 26.0149 41.4714C24.9816 41.4718 23.9649 41.354 22.9648 41.1182C21.9647 40.8836 20.9812 40.5308 20.0144 40.06C19.0479 40.5315 18.0647 40.885 17.0648 41.1203C16.0649 41.3569 15.0482 41.4754 14.0149 41.4757C12.9816 41.4761 11.9649 41.3584 10.9648 41.1225C9.96468 40.8879 8.98122 40.5351 8.01439 40.0643C7.04789 40.5358 6.06469 40.8893 5.06477 41.1246C4.06485 41.3612 3.04823 41.4797 2.0149 41.48L0.0148975 41.4808Z"
            fill={styling.font_primary}
          />
        </svg>
      );
    } else if (type === "rod") {
      return (
        <svg
          width="17"
          height="15"
          viewBox="0 0 14 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.15385 19.4615L1.93567 15.9708C1.42864 7.85819 7.87157 1 16 1V1L14.5954 2.12369C11.8367 4.33065 10.2308 7.67196 10.2308 11.2048V11.2048C10.2308 13.6728 7.9552 15.5124 5.54203 14.9953L2.15385 14.2692"
            stroke={styling.font_primary}
            strokeWidth="2"
          />
        </svg>
      );
    } else if (type === "hook") {
      return (
        <svg
          width="14"
          height="18"
          viewBox="0 0 12 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.66953 5.64716C8.22895 5.64716 9.49311 4.383 9.49311 2.82358C9.49311 1.26416 8.22895 0 6.66953 0C5.11011 0 3.84595 1.26416 3.84595 2.82358C3.84595 4.383 5.11011 5.64716 6.66953 5.64716Z"
            fill={styling.font_primary}
          ></path>
          <path
            data-v-b39c1c56=""
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.30618 13.2963C6.88988 11.3104 7.3839 7.47106 7.52081 5.96271C7.24953 6.03613 6.96429 6.07549 6.66981 6.07549C6.09834 6.07549 5.56136 5.92789 5.09469 5.66901C4.99304 6.89549 4.61097 10.2453 3.39163 11.7742C2.35178 13.0779 1.44131 14.4405 1.01296 15.9565C-0.58137 21.5984 4.20969 24.9124 8.81545 23.7787C14.4133 22.4008 13.1856 17.1486 13.1856 12.7271L8.10812 17.8045H10.7416C10.7416 21.2985 6.26249 23.4551 3.81484 19.9043C3.14781 18.7075 3.08286 17.6256 3.36782 16.6171C3.68573 15.4919 4.43741 14.3854 5.30618 13.2963Z"
            fill={styling.font_primary}
          ></path>
        </svg>
      );
    } else if (type === "fish-feeders-box") {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12H10V14H14V12H20V18H4V12Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
          <path
            d="M11 11H13V13H11V11Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
          <path
            d="M15 8V6H9V8H4V11H10V10H14V11H20V8H15ZM10 8V7H14V8H10Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
        </svg>
      );
    } else if (type === "net") {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 16C18 17.105 17.105 18 16 18C14.895 18 14 17.105 14 16C14 14.895 14.895 14 16 14C17.105 14 18 14.895 18 16Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
          <path
            d="M15.7 20C14.9 20 14.1 19.8 13.4 19.3L7.2 16C6.7 15.6 6.3 15.4 5.9 15C4.7 13.8 4 12.1 4 10.4C4 8.7 4.7 7.1 5.9 5.9C7.1 4.7 8.7 4 10.4 4C12.1 4 13.7 4.7 15 5.9C15.4 6.3 15.6 6.6 16 7.1L19.5 13.5C20.5 15.2 20.2 17.3 18.8 18.7C17.9 19.6 16.9 20 15.7 20ZM10.4 5C9 5 7.6 5.6 6.6 6.6C5.6 7.6 5 9 5 10.4C5 11.9 5.6 13.2 6.6 14.2C6.9 14.5 7.2 14.7 7.7 15L14 18.4C14.6 18.8 15.2 18.9 15.8 18.9C16.7 18.9 17.5 18.6 18.1 17.9C19.2 16.8 19.4 15.2 18.6 13.9L15.1 7.5C14.8 7.1 14.6 6.8 14.3 6.5C13.2 5.6 11.9 5 10.4 5Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
          <path
            d="M15 11V10L13.6 9.5C13.5 9.3 13.5 9.2 13.4 9L14 7.7L13.3 7L12 7.6C11.8 7.5 11.7 7.5 11.5 7.4L11 6H10L9.5 7.4C9.3 7.5 9.2 7.5 9 7.6L7.7 7L7 7.7L7.6 9C7.5 9.2 7.5 9.3 7.4 9.5L6 10V11L7.4 11.5C7.5 11.7 7.5 11.8 7.6 12L7 13.3L7.7 14L9 13.4C9.2 13.5 9.3 13.6 9.5 13.6L10 15H11L11.5 13.6C11.7 13.5 11.8 13.5 12 13.4L13.3 14L14 13.3L13.4 12C13.5 11.8 13.6 11.7 13.6 11.5L15 11ZM10.5 12C9.7 12 9 11.3 9 10.5C9 9.7 9.7 9 10.5 9C11.3 9 12 9.7 12 10.5C12 11.3 11.3 12 10.5 12Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
        </svg>
      );
    } else if (type === "float") {
      return (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.125 9.4375C13.125 5.81313 10.1869 2.875 6.5625 2.875C2.93813 2.875 0 5.81313 0 9.4375C0 13.0619 2.93813 16 6.5625 16C10.1869 16 13.125 13.0619 13.125 9.4375ZM1.8125 9.4375C1.8125 10.0613 1.93536 10.6789 2.17407 11.2552C2.41278 11.8315 2.76266 12.3552 3.20374 12.7963C3.64482 13.2373 4.16846 13.5872 4.74475 13.8259C5.32105 14.0646 5.93872 14.1875 6.5625 14.1875C7.11479 14.1875 7.5625 13.7398 7.5625 13.1875C7.5625 12.6352 7.11479 12.1875 6.5625 12.1875C6.20137 12.1875 5.84377 12.1164 5.51012 11.9782C5.17648 11.84 4.87332 11.6374 4.61796 11.382C4.3626 11.1267 4.16003 10.8235 4.02183 10.4899C3.88363 10.1562 3.8125 9.79864 3.8125 9.4375C3.8125 8.88522 3.36478 8.4375 2.8125 8.4375C2.26022 8.4375 1.8125 8.88522 1.8125 9.4375Z"
            fill={styling.font_primary}
          />
          <path
            d="M15 1L13.125 2.875"
            stroke={styling.font_primary}
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    } else if (type === "reel") {
      return (
        <svg
          width="15"
          height="15"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="8.5" cy="8.5" r="8" stroke={styling.font_primary} />
          <path
            d="M12.4775 4.52252C11.4226 3.46763 9.99184 2.875 8.5 2.875C7.00816 2.875 5.57742 3.46763 4.52252 4.52252C3.46763 5.57742 2.875 7.00816 2.875 8.5C2.875 9.99184 3.46763 11.4226 4.52252 12.4775L8.5 8.5L12.4775 4.52252Z"
            fill={styling.font_primary}
          />
        </svg>
      );
    } else if (type === "bite-indicator") {
      return (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 9H11V14H15V13L12.07 13.07L12 9Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
          <path
            d="M9.46002 4.87016C9.07302 4.34816 8.46002 4.01416 7.76802 4.01416C7.35802 4.01416 6.97502 4.13216 6.65102 4.33516L5.66002 5.10016C5.25002 5.48416 4.99402 6.02916 4.99402 6.63416C4.99402 7.13016 5.16602 7.58516 5.45302 7.94416L9.46002 4.87016Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
          <path
            d="M18.3399 5.10016L17.3399 4.33016C17.0249 4.13216 16.6419 4.01416 16.2319 4.01416C15.5399 4.01416 14.9269 4.34816 14.5439 4.86416L18.5399 7.94016C18.8269 7.58416 18.9999 7.12716 18.9999 6.62816C18.9999 6.02616 18.7469 5.48316 18.3409 5.10016H18.3399Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
          <path
            d="M16.87 18C18.178 16.732 18.992 14.962 19 13.002C18.972 9.146 15.855 6.029 12.003 6C8.146 6.028 5.028 9.145 5 12.997C5.008 14.962 5.822 16.732 7.128 17.998L6.19 18.94C6.115 19.042 6.07 19.171 6.07 19.31C6.07 19.658 6.352 19.94 6.7 19.94C6.839 19.94 6.968 19.895 7.072 19.818L8.07 18.819C9.162 19.577 10.516 20.03 11.975 20.03C13.434 20.03 14.788 19.577 15.903 18.804L16.88 19.819C16.982 19.894 17.111 19.939 17.25 19.939C17.598 19.939 17.88 19.657 17.88 19.309C17.88 19.17 17.835 19.041 17.758 18.937L16.87 18ZM6.87 13C6.898 10.178 9.178 7.898 11.997 7.87C14.822 7.898 17.102 10.178 17.13 12.997C17.102 15.822 14.822 18.102 12.003 18.13C9.178 18.102 6.898 15.822 6.87 13.003V13Z"
            fill={styling.font_primary}
            fill-opacity="0.6"
          />
        </svg>
      );
    }
  };
  const handleFocus = (event: any) => {
    event.target.style.outline = "none";
  };

  const elementRef = useRef(null);

  const singleBuyMat = async (props: any) => {
    try {
      setIsConfirmationMenu(true);
      let result: any = await getMarketplaceMaterials(props.name);
      result = result.data.items[0];
      if (!(await isUnlimitedApprove())) {
        setIsApproval(true);
        await approveTokens();
        setIsApproval(false);
      }
      setIsBuy(true);
      const hash: string = await buyOrder(result.order._id);
      setTxId("https://bscscan.com/tx/" + hash);
      setIsBuy(false);
      setPurchaseComplete(true);
    } catch (e) {
      setIsConfirmationMenu(false);
      setIsApproval(false);
      setPurchaseComplete(false);
      setIsBuy(false);
    }
  };

  const addToMatBasket = () => {
    const newItems: any[] = [];
    const blacklistedIds: any[] = [];
    for (let i = 0; i < basket.length; i++) {
      blacklistedIds.push(basket[i].orderId);
    }
    for (let i = 0; i < sliderValue.currentValue; i++) {
      if (blacklistedIds.indexOf(matData[i].orderId) === -1) {
        newItems.push(matData[i]);
      }
    }
    setBasket((prevBasket: any[]) => [...prevBasket, ...newItems]);
  };

  const openMatMenu = async (props: any) => {
    setIsMatMenu(true);
    setMatData([]);
    setWodCost("0.00");
    setSliderValue({ max: 1, currentValue: 1 });
    getMarketplaceMaterials(props.name).then(async (res: any) => {
      const tp = await GetTokenPrice(1);
      setWodCost("0.00");
      res = res.data;
      setSliderValue((prevSliderValue: any) => ({
        ...prevSliderValue,
        max: res.total_items,
      }));
      for (let i = 1; i <= res.total_pages; i++) {
        const data: any = [];
        let result: any;
        try {
          result = await getMarketplaceMaterialsIndex(props.name, i);
        } catch (e) {
          await sleep(10000);
          result = await getMarketplaceMaterialsIndex(props.name, i);
        }
        for (let z = 0; z < result.data.items.length; z++) {
          const element = result.data.items[z];
          data.push({
            orderId: element.order._id,
            objectId: genRanHex(64),
            id: element._id,
            price: (element.order.price * 1.015).toFixed(2),
            image: element.pic_url,
            name: element.name,
            contractAddress: "0xD3b11c9633dA3A7d0BCAd89c6c706037EE79a769",
            tokenPrice: (tp * element.order.price).toFixed(2),
          });
        }
        if (i === 1) {
          setWodCost(data[0].price);
        }
        setMatData((prevMatData) => [...prevMatData, ...data]);
      }
    });
  };

  useEffect(() => {
    const element: any = elementRef.current;
    let timeoutId: any;
    function debounce() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrollY(element.scrollTop);
      }, 100); // delay execution for 100ms after last scroll event
    }
    element.addEventListener("scroll", debounce);
    return () => {
      element.removeEventListener("scroll", debounce);
    };
  }, []);

  const updateItemAdded = async () => {
    setIsItemAdded(true);
    await sleep(2000);
    setIsItemAdded(false);
  };

  useEffect(() => {
    const newCards: any[] = [];

    for (let i = 0; i < basket.length; i++) {
      const element: any = basket[i];
      newCards.push(
        <CoveBasketCard
          id={element.id}
          contractAddress={element.contractAddress}
          image={element.image}
          name={element.name}
          styling={styling}
          price={element.price}
          type={element.type}
          tokenPrice={element.tokenPrice}
          orderId={element.orderId}
          singleBuy={singleBuy}
          objectId={element.objectId}
          addToBasket={addToBasket}
          removeFromBasket={removeFromBasket}
        />
      );
    }
    setBasketCards(newCards);
    setCanAfford(
      wodBalance >=
        basket.reduce(
          (accumulator, item) => accumulator + parseFloat(item.price) * 0.01,
          0
        ) +
          basket.reduce(
            (accumulator, item) => accumulator + parseFloat(item.price),
            0
          ) && basket.length >= 1
    );
  }, [basket]);

  const singleBuy = async (props: any) => {
    setIsConfirmationMenu(true);
    try {
      if (!(await isUnlimitedApprove())) {
        setIsApproval(true);
        await approveTokens();
        setIsApproval(false);
      }
      setIsBuy(true);
      const hash: any = await buyOrder(props.orderId);
      setIsBuy(false);
      setPurchaseComplete(true);
      setTxId("https://bscscan.com/tx/" + hash);
      setActiveCards((prevCards: any[]) =>
        prevCards.filter((item: any) => {
          if (item.props.orderId !== props.orderId) {
            return true;
          }
        })
      );
    } catch (e) {
      setIsConfirmationMenu(false);
      setIsApproval(false);
      setPurchaseComplete(false);
      setIsBuy(false);
    }
  };

  const addToBasket = (props: any) => {
    updateItemAdded();
    setBasket((prevBasket: any[]) => [...prevBasket, props]);
  };

  const removeFromBasket = (props: any) => {
    setBasket((prevBasket: any[]) =>
      prevBasket.filter((item: any) => item.objectId !== props.objectId)
    );
  };

  const updateMenu = (id: string) => {
    let newMenu: any = {
      1: true,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false,
    };
    for (const i in newMenu) {
      newMenu[i] = false;
    }
    newMenu[id] = true;
    setMenu(newMenu);
  };

  useEffect(() => {
    for (const i in menu) {
      if (menu[i]) {
        if (cards[i]) {
          if (cards[i].view.length !== 0) {
            let filtered: any;
            if (i !== "4") {
              filtered = cards[i].view.filter((item: any) => {
                if (
                  (filters.searchTerm === "" ||
                    item.props.name
                      .toString()
                      .toLowerCase()
                      .includes(filters.searchTerm.toLowerCase())) &&
                  (filters.rarity === 0 ||
                    item.props.rarity === filters.rarity) &&
                  (filters.type === "all-types" ||
                    filters.type === "" ||
                    item.props.type === filters.type)
                ) {
                  return true;
                }
              });
            } else {
              filtered = cards[i].view.filter((item: any) => {
                if (
                  filters.searchTerm === "" ||
                  item.props.id.includes(filters.searchTerm.toLowerCase())
                ) {
                  return true;
                }
              });
            }
            console.log(filtered);
            const newCards = [];
            const max =
              Math.ceil(scrollY / 200) * 6 +
              (filtered.length >= 24 ? 24 : filtered.length);
            const min = activeCards.length < 120 ? 0 : max - 120;
            for (let z = 0; z < max; z++) {
              if (z < min) {
                newCards.push(
                  <div style={{ width: "200px", height: "270px" }}></div>
                );
              } else {
                newCards.push(filtered[z]);
              }
            }
            if (newCards.length === 0) {
              setResponse(
                <div
                  style={{
                    fontSize: "24px",
                    color: styling.font_primary,
                    fontWeight: "600",
                    marginLeft: "430px",
                    marginTop: "30px",
                  }}
                >
                  No items found under those filters...
                </div>
              );
            } else {
              setResponse(newCards);
            }
          }
        }
      }
    }
  }, [cards, scrollY, filters]);

  useEffect(() => {
    setActiveCards([]);
    setLoadPercent(0); // 123456AB
    setResponse(
      <div
        style={{
          width: "1300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="400px"
          height="400px"
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
    );
    if (menu["1"]) {
      let tp: any;
      let wodBalance: any;
      getAllMarketplaceItems().then(async (res) => {
        try {
          wodBalance = (await getWodBalance()) / 10 ** 18;
        } catch (e) {
          wodBalance = (await getWodBalance()) / 10 ** 18;
        }
        try {
          tp = await TokenPrice();
        } catch (e) {}

        res = res.sort((a, b) => (a.order.price < b.order.price ? -1 : 1));
        const newCards = res.map((element) => (
          <CoveCard
            id={element.id}
            icon={getIcon(element.slot_key)}
            collection={element.coll.metadata.coll_num}
            image={element.image}
            name={element.name}
            level={element.chain_state.level}
            styling={styling}
            contractAddress={ItemContractAddress}
            price={(element.order.price * 1.01).toFixed(2)}
            type={element.slot_key}
            rarity={element.rarity}
            tokenPrice={(element.order.price * 1.015 * tp).toFixed(2)}
            orderId={element.order._id}
            singleBuy={singleBuy}
            objectId={genRanHex(64)}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            wodBalance={wodBalance}
            key={genRanHex(64)}
          />
        ));
        setCards((prevState: any) => {
          const updatedCards = { ...prevState };
          updatedCards[1].view = newCards;
          return updatedCards;
        });
        setResponse("");
      });
    } else if (menu["2"]) {
      let tp: any;
      let wodBalance: any;
      getAllMarketplaceFish().then(async (res) => {
        wodBalance = (await getWodBalance()) / 10 ** 18;
        try {
          tp = await TokenPrice();
        } catch (e) {}
        res = res.sort((a, b) => (a.order.price < b.order.price ? -1 : 1));
        const newCards = res.map((element) => (
          <CoveCard
            id={element.id}
            image={element.image}
            name={element.name}
            type="fish"
            fish={true}
            stars={element.params.stars}
            styling={styling}
            contractAddress={"0x9b471B2D16578C66B538e4e0a917063095B16667"}
            price={(element.order.price * 1.01).toFixed(2)}
            rarity={element.rarity}
            tokenPrice={(element.order.price * 1.015 * tp).toFixed(2)}
            orderId={element.order._id}
            singleBuy={singleBuy}
            objectId={genRanHex(64)}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            wodBalance={wodBalance}
            key={genRanHex(64)}
          />
        ));
        setCards((prevState: any) => {
          const updatedCards = { ...prevState };
          updatedCards[2].view = newCards;
          return updatedCards;
        });
        setResponse("");
      });
    } else if (menu["3"]) {
      const lookupTerms: string[] = [
        "good wood",
        "bad wood",
        "normal wood",
        "chips",
        "junk",
        "scrap",
        "rope",
        "metal cable",
        "silicon rope",
        "hard metal",
        "cracked metal",
        "good metal",
        "good plastic",
        "default plastic",
        "hard plastic",
        "cristal",
        "banana line",
        "magic cube",
      ];
      for (let i = 0; i < lookupTerms.length; i++) {
        if (i === 0) {
          setCards((prevCards: any) => {
            let updatedCards = { ...prevCards };
            updatedCards["3"].view = [];
            return updatedCards;
          });
        }
        getMarketplaceMaterials(lookupTerms[i]).then((res: any) => {
          res = res.data;
          let found: boolean = true;
          for (let z = 0; z < cards["3"].view.length; z++) {
            if (cards["3"].view[z].props.name === res.items[0].name) {
              found = false;
            }
          }
          if (found) {
            setCards((prevCards: any) => {
              const updatedCards = { ...prevCards };
              updatedCards["3"].view = [
                ...updatedCards["3"].view,
                <MaterialCard
                  name={res.items[0].name}
                  rarity={res.items[0].rarity}
                  image={res.items[0].pic_url}
                  amount={res.total_items}
                  key={genRanHex(64)}
                  floorPrice={(res.items[0].order.price * 1.015).toFixed(2)}
                  singleBuyMat={singleBuyMat}
                  openMatMenu={openMatMenu}
                />,
              ];
              return updatedCards;
            });
          }
        });
        setLoadPercent(Math.floor(i / lookupTerms.length + 0.06) * 100);
      }
      setResponse("");
    } else if (menu["4"]) {
      let tp: any;
      let wodBalance: any;
      GetAllZones().then(async (res) => {
        wodBalance = (await getWodBalance()) / 10 ** 18;
        try {
          tp = await TokenPrice();
        } catch (e) {}
        res = res.sort((a, b) => (a.order.price < b.order.price ? -1 : 1));
        const newCards = res.map((element) => (
          <CoveCard
            id={element.id}
            image={element.image}
            name={element.name}
            styling={styling}
            icon={
              <svg
                width="19"
                height="13"
                viewBox="0 0 19 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="15"
                  cy="2"
                  r="1"
                  stroke={styling.font_primary}
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M2.18601 13H11.814C12.7609 13 13.3348 11.9546 12.8264 11.1557L8.01239 3.5909C7.54085 2.84991 6.45915 2.84991 5.98761 3.59091L1.17361 11.1557C0.665242 11.9546 1.2391 13 2.18601 13Z"
                  fill={styling.font_primary}
                />
                <path
                  d="M9.24222 13H16.7578C17.7162 13 18.2879 11.9318 17.7562 11.1344L13.9985 5.49769C13.5235 4.78521 12.4765 4.78521 12.0015 5.49769L8.24376 11.1344C7.71212 11.9318 8.28379 13 9.24222 13Z"
                  fill={styling.font_primary}
                />
              </svg>
            }
            contractAddress={""}
            tier={element.tier}
            price={(element.order.price * 1.01).toFixed(2)}
            type={"zone"}
            rarity={element.rarity}
            tokenPrice={(element.order.price * 1.015 * tp).toFixed(2)}
            orderId={element.order._id}
            singleBuy={singleBuy}
            objectId={genRanHex(64)}
            addToBasket={addToBasket}
            removeFromBasket={removeFromBasket}
            wodBalance={wodBalance}
            zone={true}
            key={genRanHex(64)}
          />
        ));
        setCards((prevState: any) => {
          const updatedCards = { ...prevState };
          updatedCards[4].view = newCards;
          return updatedCards;
        });
        setResponse("");
      });
    } else if (menu["5"]) {
    } else if (menu["6"]) {
    } else {
    }
  }, [menu]);
  useEffect(() => {
    setStyling(STYLING[CheckTheme()]);
    setIsDark(CheckTheme() === "dark");
    getWodBalance().then((res: any) => {
      const balance = (res / 10 ** 18).toFixed(2);
      setWodBalance(balance);
    });
    GetUserdata().then((res: any) => {
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
  }, []);

  useEffect(() => {
    let newCost = 0;
    for (let i = 0; i < sliderValue.currentValue; i++) {
      if (matData[i] === undefined) {
        return;
      }
      const price: number = parseFloat(matData[i].price);
      newCost += price;
    }
    setWodCost(newCost.toFixed(2));
  }, [matData, sliderValue]);
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: styling.background_main,
        transition: "0.5s",
        userSelect: "none",
        overflow: "hidden",
      }}
      className="cove"
    >
      <Navbar
        avatar={userData.avatar}
        username={userData.username}
        styling={styling}
      />
      <div
        style={{
          fontWeight: "700",
          fontSize: "48px",
          display: "flex",
          alignItems: "center",
          position: "absolute",
          left: "50%",
          marginLeft: "-300px",
          justifyContent: "center",
          color: styling.font_primary,
          userSelect: "none",
          top: "200px",
          width: "600px",
        }}
      >
        The Cove
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          color: styling.font_primary,
          fontSize: "20px",
          gap: "22px",
          fontWeight: "500",
          position: "absolute",
          top: "50%",
          marginTop: "-100px",
          marginLeft: "75px",
          left: size.width > 850 ? "0" : "-100%",
        }}
      >
        <div
          style={{
            cursor: "pointer",
            fontWeight: menu["1"] ? "600" : "500",
            textDecoration: menu["1"] ? "underline" : "none",
          }}
          id="1"
          onClick={() => {
            updateMenu("1");
          }}
        >
          ITEMS
        </div>
        <div
          style={{
            cursor: "pointer",
            fontWeight: menu["2"] ? "600" : "500",
            textDecoration: menu["2"] ? "underline" : "none",
          }}
          id="2"
          onClick={() => {
            updateMenu("2");
          }}
        >
          FISH
        </div>
        <div
          style={{
            cursor: "pointer",
            fontWeight: menu["3"] ? "600" : "500",
            textDecoration: menu["3"] ? "underline" : "none",
          }}
          id="3"
          onClick={() => {
            updateMenu("3");
          }}
        >
          MATERIALS
        </div>
        <div
          style={{
            cursor: "pointer",
            fontWeight: menu["4"] ? "600" : "500",
            textDecoration: menu["4"] ? "underline" : "none",
          }}
          id="4"
          onClick={() => {
            updateMenu("4");
          }}
        >
          ZONES
        </div>
        <div
          style={{
            cursor: "pointer",
            fontWeight: menu["5"] ? "600" : "500",
            textDecoration: menu["5"] ? "underline" : "none",
          }}
          id="5"
          onClick={() => {
            updateMenu("5");
          }}
        >
          CONSUMABLES
        </div>
        <div
          style={{
            width: "1px",
            height: "600px",
            background: styling.font_primary,
            position: "absolute",
            left: "275px",
            marginTop: "-50px",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: "35%",
          left: size.width > 830 ? "400px" : "50%",
          marginLeft: size.width > 830 ? "0px" : "-200px",
          alignItems: "center",
          borderBottom: "1px solid grey",
          paddingBottom: "5px",
          paddingLeft: "10px",
          maxWidth: "450px",
          minWidth: "400px",
          zIndex: "1",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: styling.font_primary,
            fontSize: "16px",
            fontWeight: "600",
            position: "absolute",
            top: "-40px",
            marginLeft: "-10px",
          }}
        >
          Your balance:
          <img src={Wod.src} />
          {wodBalance}
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.9055 14.3195C11.298 15.5674 9.2753 16.1557 7.24926 15.9647C5.22322 15.7737 3.34611 14.8178 2.00005 13.2916C0.654 11.7653 -0.0598121 9.78345 0.00392902 7.74943C0.0676701 5.7154 0.904172 3.78213 2.34315 2.34315C3.78213 0.904172 5.7154 0.0676701 7.74943 0.00392902C9.78345 -0.0598121 11.7653 0.654 13.2916 2.00005C14.8178 3.34611 15.7737 5.22322 15.9647 7.24926C16.1557 9.2753 15.5674 11.298 14.3195 12.9055L19.7065 18.2925C19.8887 18.4811 19.9895 18.7337 19.9872 18.9959C19.9849 19.2581 19.8797 19.5089 19.6943 19.6943C19.5089 19.8797 19.2581 19.9849 18.9959 19.9872C18.7337 19.9895 18.4811 19.8887 18.2925 19.7065L12.9055 14.3195ZM13.9995 7.9995C13.9995 9.5908 13.3674 11.1169 12.2421 12.2421C11.1169 13.3674 9.5908 13.9995 7.9995 13.9995C6.4082 13.9995 4.88208 13.3674 3.75686 12.2421C2.63164 11.1169 1.9995 9.5908 1.9995 7.9995C1.9995 6.4082 2.63164 4.88208 3.75686 3.75686C4.88208 2.63164 6.4082 1.9995 7.9995 1.9995C9.5908 1.9995 11.1169 2.63164 12.2421 3.75686C13.3674 4.88208 13.9995 6.4082 13.9995 7.9995Z"
            fill="#777E90"
          />
        </svg>
        <input
          placeholder="Lookup Item..."
          id="inputbox"
          style={{
            color: "#353945",
            background: "none",
            border: "0px",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "inherit",
            marginLeft: "20px",
            width: "250px",
          }}
          onChange={(event: any) => {
            setFilters({ ...filters, searchTerm: event.target.value });
          }}
          onFocus={(event: any) => {
            handleFocus(event);
          }}
        />
        <svg
          onClick={() => {
            setIsBasket(true);
          }}
          width="39"
          height="38"
          viewBox="0 0 39 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: "absolute",
            left: "90%",
            top: "-10px",
            cursor: "pointer",
          }}
        >
          <path
            d="M1.64784 2.26168e-07C0.737762 2.26168e-07 0 0.737764 0 1.64783C0 2.55792 0.737762 3.29568 1.64784 3.29568H4.57983C4.81976 3.29568 5.05359 3.37117 5.24822 3.51146C5.44284 3.65175 5.58841 3.84972 5.66426 4.07733L11.0972 20.3792C11.3384 21.1029 11.3691 21.8823 11.1841 22.6224L10.7367 24.4151C10.0803 27.0406 12.1241 29.6611 14.8306 29.6611H34.6046C35.5147 29.6611 36.2525 28.9234 36.2525 28.0132C36.2525 27.1032 35.5147 26.3655 34.6046 26.3655H14.8306C14.1889 26.3655 13.777 25.8389 13.9326 25.2165L14.27 23.869C14.3272 23.6406 14.4589 23.4381 14.6445 23.2932C14.83 23.1484 15.0587 23.0697 15.294 23.0697H32.9568C33.6664 23.0702 34.2964 22.6163 34.521 21.9433L38.9141 8.76058C39.2701 7.69314 38.4751 6.59085 37.35 6.59135H10.8011C10.5612 6.59135 10.3273 6.51587 10.1327 6.37559C9.93804 6.23531 9.79248 6.03733 9.71662 5.80973L8.15552 1.12645C7.93097 0.453411 7.30087 -0.000369832 6.59136 2.26168e-07H1.64784ZM13.1827 31.309C11.3626 31.309 9.88704 32.7845 9.88704 34.6047C9.88704 36.4249 11.3626 37.9003 13.1827 37.9003C15.0029 37.9003 16.4784 36.4249 16.4784 34.6047C16.4784 32.7845 15.0029 31.309 13.1827 31.309ZM32.9568 31.309C31.1367 31.309 29.6611 32.7845 29.6611 34.6047C29.6611 36.4249 31.1367 37.9003 32.9568 37.9003C34.777 37.9003 36.2525 36.4249 36.2525 34.6047C36.2525 32.7845 34.777 31.309 32.9568 31.309Z"
            fill={styling.font_primary}
          />
        </svg>
        <div
          style={{
            width: "14px",
            height: "14px",
            fontWeight: "600",
            background: styling.blue_important,
            display: "flex",
            borderRadius: "999px",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            left: "97%",
            fontSize: "10px",
            top: "-11px",
          }}
        >
          {basket.length}
        </div>
      </div>
      <div
        style={{
          display: menu["3"] ? "hidden" : "block",
          position: "absolute",
          top: "300px",
          width: "180px",
          left: "900px",
        }}
      >
        <div
          style={{
            color: "#777E90",
            marginLeft: "5px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          RARITY
        </div>
        <div
          style={{
            border: "1px solid #777E90",
            fontSize: "16px",
            width: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "5px",

            height: "40px",
            borderRadius: "15px",
            color: styling.font_primary,
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => {
            setRarityFilter({
              ...rarityFilter,
              displayed: !rarityFilter.displayed,
            });
            setTypeFilter({
              ...typeFilter,
              displayed: false,
            });
          }}
        >
          {rarityFilter.options[filters.rarity].text}
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.20704 0.793031C9.01951 0.60556 8.76521 0.500244 8.50004 0.500244C8.23488 0.500244 7.98057 0.60556 7.79304 0.793031L5.00004 3.58603L2.20704 0.793031C2.01844 0.610873 1.76584 0.510078 1.50364 0.512357C1.24144 0.514635 0.990631 0.619804 0.805223 0.805212C0.619815 0.99062 0.514645 1.24143 0.512367 1.50363C0.510088 1.76583 0.610883 2.01843 0.793041 2.20703L4.29304 5.70703C4.48057 5.8945 4.73488 5.99982 5.00004 5.99982C5.26521 5.99982 5.51951 5.8945 5.70704 5.70703L9.20704 2.20703C9.39451 2.0195 9.49983 1.76519 9.49983 1.50003C9.49983 1.23487 9.39451 0.980558 9.20704 0.793031Z"
              fill={styling.font_primary}
            />
          </svg>
        </div>
        <div
          style={{
            width: "250px",
            background: "grey",
            height: rarityFilter.displayed ? "300px" : "0px",
            marginTop: "5px",
            borderRadius: "3px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            overflow: "hidden",
            zIndex: "999",
            transition: "0.5s",
          }}
        >
          {rarityFilter.options.map((item: any) => {
            return (
              <div
                onClick={() => {
                  setFilters({
                    ...filters,
                    rarity: rarityFilter.options.indexOf(item),
                  });
                  setRarityFilter({ ...rarityFilter, displayed: false });
                }}
                key={genRanHex(64)}
                style={{
                  cursor: "pointer",
                  fontWeight: "500",
                  color: "white",
                  fontSize: "20px",
                  marginTop: "16px",
                }}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          display: menu["3"] ? "hidden" : "block",
          position: "absolute",
          top: "300px",
          width: "180px",
          left: "1100px",
        }}
      >
        <div
          style={{
            color: "#777E90",
            marginLeft: "5px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          ITEM TYPE
        </div>
        <div
          style={{
            border: "1px solid #777E90",
            fontSize: "16px",
            width: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "5px",

            height: "40px",
            borderRadius: "15px",
            color: styling.font_primary,
            fontWeight: "600",
            cursor: "pointer",
          }}
          onClick={() => {
            setTypeFilter({
              ...typeFilter,
              displayed: !typeFilter.displayed,
            });
            setRarityFilter({
              ...rarityFilter,
              displayed: false,
            });
          }}
        >
          {currentType}
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M9.20704 0.793031C9.01951 0.60556 8.76521 0.500244 8.50004 0.500244C8.23488 0.500244 7.98057 0.60556 7.79304 0.793031L5.00004 3.58603L2.20704 0.793031C2.01844 0.610873 1.76584 0.510078 1.50364 0.512357C1.24144 0.514635 0.990631 0.619804 0.805223 0.805212C0.619815 0.99062 0.514645 1.24143 0.512367 1.50363C0.510088 1.76583 0.610883 2.01843 0.793041 2.20703L4.29304 5.70703C4.48057 5.8945 4.73488 5.99982 5.00004 5.99982C5.26521 5.99982 5.51951 5.8945 5.70704 5.70703L9.20704 2.20703C9.39451 2.0195 9.49983 1.76519 9.49983 1.50003C9.49983 1.23487 9.39451 0.980558 9.20704 0.793031Z"
              fill={styling.font_primary}
            />
          </svg>
        </div>
        <div
          style={{
            width: "250px",
            background: "grey",
            height: typeFilter.displayed ? "410px" : "0px",
            marginTop: "5px",
            borderRadius: "3px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            overflow: "hidden",
            zIndex: "999",
            transition: "0.5s",
          }}
        >
          {typeFilter.options.map((item: any) => {
            return (
              <div
                onClick={() => {
                  setFilters({
                    ...filters,
                    type: item.text.replace(/\s+/g, "-").toLowerCase(),
                  });
                  setTypeFilter({ ...typeFilter, displayed: false });
                  setCurrentType(item.text);
                }}
                key={genRanHex(64)}
                style={{
                  cursor: "pointer",
                  fontWeight: "500",
                  color: "white",
                  fontSize: "20px",
                  marginTop: "16px",
                }}
              >
                {item.text}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          transition: "0.2s",
          whiteSpace: "nowrap",
          overflow: "hidden",
          color: styling.font_primary,
          position: "absolute",
          fontWeight: "500",
          border: `${isItemAdded ? "1" : "0"}px solid ${
            styling.blue_important
          } `,
          borderRadius: "3px",
          width: isItemAdded ? "200px" : "0px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          fontSize: "20px",
          top: "310px",
          left: "1100px",
          gap: "5px",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 31 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ marginLeft: "20px" }}
        >
          <path
            d="M2 11L11 20L29 2"
            stroke="#00FF00"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Item Added!
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          position: "absolute",
          flexFlow: "row wrap",
          top: "380px",
          left: size.width > 850 ? "400px" : "50%",
          rowGap: "20px",
          maxWidth: "1445px",
          marginLeft: size.width > 850 ? "0px" : "-722.5px",
          height: "560px",
          columnGap: "25px",
          overflow: "scroll",
        }}
        className="cove"
        ref={elementRef}
      >
        {response}
      </div>
      <div
        style={{
          transition: "0.5s",
          width: isBasket ? "100%" : "0px",
          height: "100%",
          overflow: "hidden",
          position: "absolute",
          backdropFilter: isBasket ? "blur(9px)" : "blur(0px)",
          zIndex: "9999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "1200px",
            height: "600px",
            background: "#161616",
            borderRadius: "10px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "40px",
              fontWeight: "600",
              width: "150px",
              height: "50px",
              position: "absolute",
              left: "50%",
              marginLeft: "-75px",
              top: "30px",
            }}
          >
            Basket
          </div>
          <svg
            onClick={() => {
              setIsBasket(false);
            }}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              marginTop: "30px",
              right: "30px",
              cursor: "pointer",
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.2928 13.3053C13.4803 13.1178 13.7346 13.0125 13.9998 13.0125C14.265 13.0125 14.5193 13.1178 14.7068 13.3053L19.9998 18.5983L25.2928 13.3053C25.385 13.2098 25.4954 13.1336 25.6174 13.0812C25.7394 13.0288 25.8706 13.0012 26.0034 13C26.1362 12.9989 26.2678 13.0242 26.3907 13.0745C26.5136 13.1247 26.6253 13.199 26.7192 13.2929C26.8131 13.3868 26.8873 13.4984 26.9376 13.6213C26.9879 13.7442 27.0132 13.8759 27.012 14.0087C27.0109 14.1415 26.9833 14.2727 26.9309 14.3947C26.8785 14.5167 26.8023 14.627 26.7068 14.7193L21.4138 20.0123L26.7068 25.3053C26.8889 25.4939 26.9897 25.7465 26.9875 26.0087C26.9852 26.2709 26.88 26.5217 26.6946 26.7071C26.5092 26.8925 26.2584 26.9977 25.9962 27C25.734 27.0022 25.4814 26.9014 25.2928 26.7193L19.9998 21.4263L14.7068 26.7193C14.5182 26.9014 14.2656 27.0022 14.0034 27C13.7412 26.9977 13.4904 26.8925 13.305 26.7071C13.1196 26.5217 13.0144 26.2709 13.0121 26.0087C13.0098 25.7465 13.1106 25.4939 13.2928 25.3053L18.5858 20.0123L13.2928 14.7193C13.1053 14.5318 13 14.2775 13 14.0123C13 13.7471 13.1053 13.4928 13.2928 13.3053Z"
              fill="white"
            />
            <rect
              x="1"
              y="1"
              width="38"
              height="38"
              rx="19"
              stroke="#CCCCCC"
              strokeWidth="2"
            />
          </svg>
          <div style={{ display: "flex" }}>
            <div
              className="cove"
              style={{
                position: "absolute",
                marginTop: "-200px",
                top: "50%",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                left: "100px",
                overflow: "scroll",
                height: "400px",
              }}
            >
              {basketCards}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                right: "100px",
                alignItems: "center",
                marginTop: "100px",
                gap: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                Summary
              </div>
              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{ fontSize: "16px", color: "#fff", fontWeight: "600" }}
                >
                  Item Cost
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <img src={Wod.src} />
                  <div style={{ color: "#fff", fontWeight: "500" }}>
                    {basket
                      .reduce(
                        (accumulator, item) =>
                          accumulator + parseFloat(item.price),
                        0
                      )
                      .toFixed(2)}
                  </div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    ($
                    {basket
                      .reduce(
                        (accumulator, item) =>
                          accumulator + parseFloat(item.tokenPrice),
                        0
                      )
                      .toFixed(2)}
                    )
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "0px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{ fontSize: "16px", color: "#fff", fontWeight: "600" }}
                >
                  Our Fee (1%)
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <img src={Wod.src} />
                  <div style={{ color: "#fff", fontWeight: "500" }}>
                    {basket
                      .reduce(
                        (accumulator, item) =>
                          accumulator + parseFloat(item.price) * 0.01,
                        0
                      )
                      .toFixed(2)}
                  </div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    ($
                    {basket
                      .reduce(
                        (accumulator, item) =>
                          accumulator + parseFloat(item.tokenPrice) * 0.01,
                        0
                      )
                      .toFixed(2)}
                    )
                  </div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "0px",
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{ fontSize: "16px", color: "#fff", fontWeight: "600" }}
                >
                  Total Cost
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  <img src={Wod.src} />
                  <div style={{ color: "#fff", fontWeight: "500" }}>
                    {(
                      basket.reduce(
                        (accumulator, item) =>
                          accumulator + parseFloat(item.price) * 0.01,
                        0
                      ) +
                      basket.reduce(
                        (accumulator, item) =>
                          accumulator + parseFloat(item.price),
                        0
                      )
                    ).toFixed(2)}
                  </div>
                  <div
                    style={{
                      color: "grey",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {" "}
                    ($
                    {(
                      basket.reduce(
                        (accumulator, item) =>
                          accumulator + parseFloat(item.tokenPrice) * 0.01,
                        0
                      ) +
                      basket.reduce(
                        (accumulator, item) =>
                          accumulator + parseFloat(item.tokenPrice),
                        0
                      )
                    ).toFixed(2)}
                    )
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: "24px",
                  color: "#fff",
                  fontWeight: "600",
                  width: "320px",
                  height: "50px",
                  background: canAfford ? "#3B99FC" : "grey",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  borderRadius: "3px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: canAfford ? "pointer" : "not-allowed",
                  marginTop: "50px",
                }}
                onClick={async () => {
                  try {
                    if (canAfford) {
                      setIsConfirmationMenu(true);
                      setIsBasket(false);
                      if (!(await isUnlimitedApprove())) {
                        setIsApproval(true);
                        await approveTokens();
                        setIsApproval(false);
                      }
                      const ids = [];
                      const costs = [];
                      const itemIds = [];
                      const contractAddresses = [];
                      for (let i = 0; i < basket.length; i++) {
                        ids.push(basket[i].orderId);
                        costs.push(basket[i].price);
                        itemIds.push(basket[i].id);
                        contractAddresses.push(basket[i].contractAddress);
                      }
                      setIsBuy(true);
                      const hash = await bulkBuyOrder(ids);
                      setIsBuy(false);
                      setTxId("https://bscscan.com/tx/" + hash);
                      setPurchaseComplete(true);
                      setIsBasket(false);
                      setBasket([]);
                    }
                  } catch (e) {
                    setIsConfirmationMenu(false);
                    setIsBuy(false);
                    setIsApproval(false);
                    setIsBasket(true);
                    setPurchaseComplete(false);
                  }
                }}
              >
                Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          transition: "0.5s",
          width: isMatMenu ? "100%" : "0px",
          height: "100%",
          overflow: "hidden",
          position: "absolute",
          backdropFilter: isMatMenu ? "blur(9px)" : "blur(0px)",
          zIndex: "9999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "900px",
            height: "500px",
            background: "#161616",
            borderRadius: "10px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              color: "#fff",
              fontWeight: "600",
              marginTop: "40px",
            }}
          >
            Select Amount
          </div>
          <svg
            onClick={() => {
              setIsMatMenu(false);
            }}
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: "absolute",
              marginTop: "30px",
              right: "30px",
              cursor: "pointer",
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.2928 13.3053C13.4803 13.1178 13.7346 13.0125 13.9998 13.0125C14.265 13.0125 14.5193 13.1178 14.7068 13.3053L19.9998 18.5983L25.2928 13.3053C25.385 13.2098 25.4954 13.1336 25.6174 13.0812C25.7394 13.0288 25.8706 13.0012 26.0034 13C26.1362 12.9989 26.2678 13.0242 26.3907 13.0745C26.5136 13.1247 26.6253 13.199 26.7192 13.2929C26.8131 13.3868 26.8873 13.4984 26.9376 13.6213C26.9879 13.7442 27.0132 13.8759 27.012 14.0087C27.0109 14.1415 26.9833 14.2727 26.9309 14.3947C26.8785 14.5167 26.8023 14.627 26.7068 14.7193L21.4138 20.0123L26.7068 25.3053C26.8889 25.4939 26.9897 25.7465 26.9875 26.0087C26.9852 26.2709 26.88 26.5217 26.6946 26.7071C26.5092 26.8925 26.2584 26.9977 25.9962 27C25.734 27.0022 25.4814 26.9014 25.2928 26.7193L19.9998 21.4263L14.7068 26.7193C14.5182 26.9014 14.2656 27.0022 14.0034 27C13.7412 26.9977 13.4904 26.8925 13.305 26.7071C13.1196 26.5217 13.0144 26.2709 13.0121 26.0087C13.0098 25.7465 13.1106 25.4939 13.2928 25.3053L18.5858 20.0123L13.2928 14.7193C13.1053 14.5318 13 14.2775 13 14.0123C13 13.7471 13.1053 13.4928 13.2928 13.3053Z"
              fill="white"
            />
            <rect
              x="1"
              y="1"
              width="38"
              height="38"
              rx="19"
              stroke="#CCCCCC"
              strokeWidth="2"
            />
          </svg>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              marginTop: "50px",
              justifyContent: "center",
            }}
          >
            <input
              type="number"
              ref={labelRef}
              min="1"
              value={sliderValue.currentValue}
              max={matData.length}
              style={{
                color: "#fff",
                fontSize: "24px",
                fontWeight: "500",
                border: "1px solid #fff",
                width: "50px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                borderRadius: "3px",
                textAlign: "center",
                background: "transparent",
              }}
              onChange={(e) => {
                let searchVal: number = 0;
                setSliderValue((prevValue: any) => {
                  const newValue = { ...prevValue };
                  if (parseInt(e.target.value, 10) >= matData.length) {
                    newValue.currentValue = matData.length;
                    searchVal = matData.length;
                  } else {
                    e.target.value === ""
                      ? (newValue.currentValue = "")
                      : (newValue.currentValue = e.target.valueAsNumber);
                  }
                  return newValue;
                });
              }}
              placeholder={sliderValue.currentValue}
            />
            <input
              id="mySlider"
              type="range"
              ref={sliderRef}
              min="1"
              value={sliderValue.currentValue}
              max={sliderValue.max}
              onChange={(e) => {
                setSliderValue((prevValue: any) => {
                  const newValue = { ...prevValue };
                  newValue.currentValue = e.target.valueAsNumber;
                  return newValue;
                });
                let newCost = 0;
                for (let i = 0; i < e.target.valueAsNumber; i++) {
                  const price: number = parseFloat(matData[i].price);
                  newCost += price;
                  setWodCost(newCost.toFixed(2));
                }
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: "20px", fontWeight: "700" }}>COST</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "600",
              }}
            >
              <img src={Wod.src} />
              {wodCost}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "300px",
              height: "70px",
              background: styling.blue_important,
              borderRadius: "3px",
              color: "#fff",
              fontSize: "24px",
              fontWeight: "600",
              marginTop: "60px",
              cursor: "pointer",
            }}
            onClick={() => {
              addToMatBasket();
              setIsMatMenu(false);
            }}
          >
            Add to basket
          </div>
        </div>
      </div>
      <div
        style={{
          width: isConfirmationMenu ? "100vw" : "0px",
          height: "100vh",
          backdropFilter: "blur(9px)",
          position: "absolute",
          zIndex: "9999",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          transition: "0.5s",
        }}
      >
        <div
          style={{
            width: "350px",
            height: "500px",
            background: "#161616",
            borderRadius: "10px",
            filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          id="uniqueID"
        >
          <div
            style={{
              color: "#fff",
              fontSize: "24px",
              fontWeight: "600",
              marginTop: "30px",
              display: "flex",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "300px",
                left: "30px",
                top: "30px",
              }}
            >
              {purchaseComplete ? "" : "Confirm Purchase"}
            </div>
            <svg
              onClick={() => {
                if (purchaseComplete) {
                  if (isDocked()) {
                    window.location.reload();
                  }
                }
                setIsApproval(false);
                setIsBuy(false);
                setIsConfirmationMenu(false);
                setPurchaseComplete(false);
              }}
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                marginTop: "30px",
                right: "30px",
                cursor: "pointer",
              }}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.2928 13.3053C13.4803 13.1178 13.7346 13.0125 13.9998 13.0125C14.265 13.0125 14.5193 13.1178 14.7068 13.3053L19.9998 18.5983L25.2928 13.3053C25.385 13.2098 25.4954 13.1336 25.6174 13.0812C25.7394 13.0288 25.8706 13.0012 26.0034 13C26.1362 12.9989 26.2678 13.0242 26.3907 13.0745C26.5136 13.1247 26.6253 13.199 26.7192 13.2929C26.8131 13.3868 26.8873 13.4984 26.9376 13.6213C26.9879 13.7442 27.0132 13.8759 27.012 14.0087C27.0109 14.1415 26.9833 14.2727 26.9309 14.3947C26.8785 14.5167 26.8023 14.627 26.7068 14.7193L21.4138 20.0123L26.7068 25.3053C26.8889 25.4939 26.9897 25.7465 26.9875 26.0087C26.9852 26.2709 26.88 26.5217 26.6946 26.7071C26.5092 26.8925 26.2584 26.9977 25.9962 27C25.734 27.0022 25.4814 26.9014 25.2928 26.7193L19.9998 21.4263L14.7068 26.7193C14.5182 26.9014 14.2656 27.0022 14.0034 27C13.7412 26.9977 13.4904 26.8925 13.305 26.7071C13.1196 26.5217 13.0144 26.2709 13.0121 26.0087C13.0098 25.7465 13.1106 25.4939 13.2928 25.3053L18.5858 20.0123L13.2928 14.7193C13.1053 14.5318 13 14.2775 13 14.0123C13 13.7471 13.1053 13.4928 13.2928 13.3053Z"
                fill="white"
              />
              <rect
                x="1"
                y="1"
                width="38"
                height="38"
                rx="19"
                stroke="#CCCCCC"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            style={{
              color: "#fff",
              marginTop: "50px",
              fontSize: "30px",
              textAlign: "center",
              fontWeight: "600",
              display: "flex",
              overflow: "hidden",
              height: purchaseComplete ? "1000px" : "0px",
              alignItems: "center",
              gap: "20px",
              flexDirection: "column",
              zIndex: "5",
              position: "absolute",
              top: "40px",
            }}
          >
            <div>Purchase Complete!</div>
            <div>
              <svg
                width="100"
                height="100"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.78 1.16667H3.22579C2.08829 1.16667 1.16663 2.08833 1.16663 3.22583V10.7742C1.16663 11.9117 2.08829 12.8333 3.22579 12.8333H10.78C11.9116 12.8333 12.8333 11.9117 12.8333 10.7742V3.22583C12.8333 2.08833 11.9116 1.16667 10.78 1.16667ZM10.8091 4.97583L6.14246 9.6425C6.05496 9.73 5.94413 9.77083 5.83329 9.77083C5.72246 9.77083 5.61163 9.73 5.52413 9.6425L3.19079 7.30917C3.02163 7.14 3.02163 6.86 3.19079 6.69084C3.35996 6.52167 3.63996 6.52167 3.80913 6.69084L5.83329 8.715L10.1908 4.3575C10.36 4.18834 10.64 4.18834 10.8091 4.3575C10.9783 4.52667 10.9783 4.80667 10.8091 4.97583Z"
                  fill={"#00FF0A"}
                />
              </svg>
            </div>
            <div
              style={{
                color: styling.blue_important,
                textDecoration: "underline",
                fontSize: "24px",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={() => {
                if (isDocked()) {
                  window.open(txId);
                }
              }}
            >
              View Transaction
            </div>
          </div>
          <div
            style={{
              width: "300px",
              transition: "0.5s",
              opacity: purchaseComplete ? "0" : "1",
              marginTop: "50px",
              color: "#fff",
              border: "1px solid grey",
              borderRadius: "10px",
            }}
          >
            <div>
              <div
                style={{
                  borderBottom: "1px solid grey",
                  height: "40px",
                  display: "flex",
                  color: isApproval ? "#fff" : "#7D7D7D",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                  gap: "10px",
                }}
              >
                1. Approve WOD Spending Limit
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.78 1.16667H3.22579C2.08829 1.16667 1.16663 2.08833 1.16663 3.22583V10.7742C1.16663 11.9117 2.08829 12.8333 3.22579 12.8333H10.78C11.9116 12.8333 12.8333 11.9117 12.8333 10.7742V3.22583C12.8333 2.08833 11.9116 1.16667 10.78 1.16667ZM10.8091 4.97583L6.14246 9.6425C6.05496 9.73 5.94413 9.77083 5.83329 9.77083C5.72246 9.77083 5.61163 9.73 5.52413 9.6425L3.19079 7.30917C3.02163 7.14 3.02163 6.86 3.19079 6.69084C3.35996 6.52167 3.63996 6.52167 3.80913 6.69084L5.83329 8.715L10.1908 4.3575C10.36 4.18834 10.64 4.18834 10.8091 4.3575C10.9783 4.52667 10.9783 4.80667 10.8091 4.97583Z"
                    fill={isApproval ? "#fff" : "#00FF0A"}
                  />
                </svg>
              </div>
              <div
                style={{
                  textAlign: "center",
                  height: isApproval ? "200px" : "0px",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  borderBottom: isApproval ? "1px solid grey" : "",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",

                    width: "200px",
                    textAlign: "center",
                    marginTop: "30px",
                  }}
                >
                  Approve this so that we can use your WOD to purchase the
                  selected item{basket.length === 0 ? "" : "s"}.
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "200px",
                    marginTop: "40px",
                    borderRadius: "100px",
                    background: styling.blue_important,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "500",
                    fontSize: "14px",
                    gap: "10px",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        x1="8.042%"
                        y1="0%"
                        x2="65.682%"
                        y2="23.865%"
                        id="a"
                      >
                        <stop stopColor="#fff" stopOpacity="0" offset="0%" />
                        <stop
                          stopColor="#fff"
                          stopOpacity=".631"
                          offset="63.146%"
                        />
                        <stop stopColor="#fff" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)">
                        <path
                          d="M36 18c0-9.94-8.06-18-18-18"
                          id="Oval-2"
                          stroke="url(#a)"
                          strokeWidth="2"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <circle fill="#fff" cx="36" cy="18" r="1">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </g>
                  </svg>
                  Awaiting Transaction
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  borderBottom: isBuy ? "1px solid grey" : "",
                  height: "40px",
                  display: "flex",
                  color: isBuy ? "#fff" : "#7D7D7D",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "600",
                  gap: "10px",
                }}
              >
                2. Purchase item{basket.length === 0 ? "" : "s"}
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.78 1.16667H3.22579C2.08829 1.16667 1.16663 2.08833 1.16663 3.22583V10.7742C1.16663 11.9117 2.08829 12.8333 3.22579 12.8333H10.78C11.9116 12.8333 12.8333 11.9117 12.8333 10.7742V3.22583C12.8333 2.08833 11.9116 1.16667 10.78 1.16667ZM10.8091 4.97583L6.14246 9.6425C6.05496 9.73 5.94413 9.77083 5.83329 9.77083C5.72246 9.77083 5.61163 9.73 5.52413 9.6425L3.19079 7.30917C3.02163 7.14 3.02163 6.86 3.19079 6.69084C3.35996 6.52167 3.63996 6.52167 3.80913 6.69084L5.83329 8.715L10.1908 4.3575C10.36 4.18834 10.64 4.18834 10.8091 4.3575C10.9783 4.52667 10.9783 4.80667 10.8091 4.97583Z"
                    fill={isBuy || isApproval ? "#fff" : "#00FF0A"}
                  />
                </svg>
              </div>
              <div
                style={{
                  textAlign: "center",
                  height: isBuy ? "200px" : "0px",
                  fontSize: "16px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    width: "200px",
                    textAlign: "center",
                    marginTop: "30px",
                  }}
                >
                  Approve this transaction to complete the purchase of your
                  selected item{basket.length === 0 ? "" : "s"}.
                </div>
                <div
                  style={{
                    height: "50px",
                    width: "200px",
                    marginTop: "40px",
                    borderRadius: "100px",
                    background: styling.blue_important,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "500",
                    fontSize: "14px",
                    gap: "10px",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 38 38"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        x1="8.042%"
                        y1="0%"
                        x2="65.682%"
                        y2="23.865%"
                        id="a"
                      >
                        <stop stopColor="#fff" stopOpacity="0" offset="0%" />
                        <stop
                          stopColor="#fff"
                          stopOpacity=".631"
                          offset="63.146%"
                        />
                        <stop stopColor="#fff" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                      <g transform="translate(1 1)">
                        <path
                          d="M36 18c0-9.94-8.06-18-18-18"
                          id="Oval-2"
                          stroke="url(#a)"
                          strokeWidth="2"
                        >
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </path>
                        <circle fill="#fff" cx="36" cy="18" r="1">
                          <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.9s"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    </g>
                  </svg>
                  Awaiting Transaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheCove;
