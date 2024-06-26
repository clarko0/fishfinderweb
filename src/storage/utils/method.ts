import Web3 from "web3";
import { isDocked } from "./window";
import {
  erc20abi,
  erc721abi,
  fishfinderabi,
  fishfindertestabi,
  harborabi,
  marketplaceabi,
  toolabi,
} from "../abi/abi";
import { GetAddress } from "./web3";
import { ethers, getAddress } from "ethers";
import { GetCurrentAddress } from "./local";

declare var window: any;
let web3: any;
export const ItemContractAddress = "0x9b471B2D16578C66B538e4e0a917063095B16667";
const ToolContractAddress = "0x1901F094d31289A3cbCcc0767204eA23b9E7Efb6";
const MarketPlaceContractAddress = "0x9C591CE2108f3a15Be6A17457c29FB68f6b3b69B";

const FishFinderContractAddress = "0x1B0EefC34D05bD4F86A2aC5a4002F92229cB63f1";

//0x9073a2a10405527C888f0Fd1600eE74117040D92
const WodContractAddress = "0x298632D8EA20d321fAB1C9B473df5dBDA249B2b6";

let ItemContract: any;
let MainnetWODContract: any;
let WODContract: any;
let ToolContract: any;
let MarketPlaceContract: any;
let TestWODContract: any;
let FishFinderContract: any;
if (isDocked()) {
  web3 = new Web3(window.ethereum);
  ItemContract = new web3.eth.Contract(erc721abi, ItemContractAddress);
  FishFinderContract = new web3.eth.Contract(
    fishfinderabi,
    FishFinderContractAddress
  );
  MarketPlaceContract = new web3.eth.Contract(
    marketplaceabi,
    MarketPlaceContractAddress
  );
  WODContract = new web3.eth.Contract(erc20abi, WodContractAddress);
  ToolContract = new web3.eth.Contract(toolabi, ToolContractAddress);
}

export const approveAll = async () => {
  let address = GetCurrentAddress();

  await ItemContract.methods
    .setApprovalForAll("0xfCD46702d80141e6380a5E149132cc3a617d42F9", true)
    .send({ from: address });
};

export const isApproveAll = async () => {
  let address = GetCurrentAddress();
  return await ItemContract.methods
    .isApprovedForAll(address, MarketPlaceContractAddress)
    .call({ from: address });
};

export const createOrder = async (id: number, price: string) => {
  let address = GetCurrentAddress();
  return await MarketPlaceContract.methods
    .createOrder(id, price, "0x69746d")
    .send({ from: address });
};

export const buyOrder = async (id: number) => {
  let txhash: string = "";
  let address = GetCurrentAddress();
  await FishFinderContract.methods
    .buyOrder(id)
    .send({ from: address })
    .on("receipt", async (hash: any) => {
      const hashTx: string = await hash.transactionHash;
      txhash = hashTx;
    });
  return txhash;
};

export const approveTokens = async () => {
  let address = GetCurrentAddress();
  let approve_amount =
    "1157920892373161954235709850086879078532699846656405640394575840079131296399";
  return await WODContract.methods
    .approve(FishFinderContractAddress, approve_amount)
    .send({
      from: address,
    });
};

export const isUnlimitedApprove = async () => {
  let address = GetCurrentAddress();
  const allowance = await WODContract.methods
    .allowance(address, FishFinderContractAddress)
    .call({ from: address });
  return allowance > 9999999;
};

export const bulkBuyOrder = async (ids: number[]) => {
  let address = GetCurrentAddress();
  let txhash: string = "";
  if (ids.length !== 0) {
    await FishFinderContract.methods
      .bulkBuy(ids)
      .send({ from: address })
      .on("receipt", async (hash: any) => {
        const hashTx: string = await hash.transactionHash;
        txhash = hashTx;
      });
    return txhash;
  }
};

export const ApprovalForAllWodTools = async () => {
  let address = GetCurrentAddress();
  let approve_amount =
    "115792089237316195423570985008687907853269984665640564039457584007913129639935";
  return await MainnetWODContract.methods
    .approve(ToolContractAddress, approve_amount)
    .send({
      from: address,
    });
};

export const isUnlimitedApproveTools = async () => {
  let address = GetCurrentAddress();
  const allowance = await WODContract.methods
    .allowance(address, ToolContractAddress)
    .call({ from: address });
  return allowance > 9999999999999;
};

export const buyTools = async (
  items: any,
  numberOfRepairs: number,
  rarites: any
) => {
  const address = await GetAddress();
  let toolInfo: any = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  };
  const nonUsedRarites: any = Object.keys(rarites).filter((item: any) => {
    return !rarites[item];
  });

  for (const i in items) {
    try {
      if (!nonUsedRarites.includes(items[i][0].rarity.toString())) {
        toolInfo[Object.keys(items).indexOf(i) + 1] = items[i].length;
      }
    } catch (e) {}
  }

  for (const key in toolInfo) {
    if (toolInfo[key] !== 0) {
      ToolContract.methods
        .buyV3((parseInt(key) - 1) * 3, toolInfo[key] * numberOfRepairs)
        .send({ from: address });
    }
  }
};

export const getWodBalance = async () => {
  let address = GetCurrentAddress();
  if (address === "") {
    return 0;
  }
  return await WODContract.methods.balanceOf(address).call({ from: address });
};
