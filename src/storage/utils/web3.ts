import Router from "next/router";
import { isDocked } from "./window";
import { delay } from "../constants/misc";
import Web3 from "web3";
import Web3Token from "web3-token";

declare var window: any;

let web3: any;
if (isDocked()) {
  web3 = new Web3(window.ethereum);
}

export const GetAddress = async () => {
  return new Promise(async (resolve) => {
    let addresses;

    addresses = await web3.eth.getAccounts();

    while (addresses === undefined) {
      await new Promise((r) => setTimeout(r, 100));
      addresses = await web3.eth.getAccounts();
    }

    resolve(addresses[0]);
  });
};

export const AbreviateAddress = () => {
  try {
    let address: any;
    GetAddress().then((res: any) => {
      address = res;
    });
    return (
      address[0] +
      address[1] +
      address[2] +
      address[3] +
      "..." +
      address[address.length - 4] +
      address[address.length - 3] +
      address[address.length - 2] +
      address[address.length - 1]
    );
  } catch (e) {}
};

export const MetaMaskConnect = async () => {
  if (isDocked()) {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }
};

export const WalletListener = async () => {
  if (isDocked()) {
    while (true) {
      await delay(1000);
      let address = await GetAddress();
      if (address === null) {
        await Router.push("/login");
      }
    }
  }
};

export const GenerateAuth = async () => {
  let token: string = "Web3-Token ";
  let address = await GetAddress();
  await Web3Token.sign(
    async (msg: any) => await web3.eth.personal.sign(msg, address),
    {
      domain: "worldofdefish.com",
      expires_in: "365d",
    }
  ).then(async (s) => {
    token += s;
  });
  return token;
};

export const VerifyAuth = async (token: string, address: string) => {
  token = token.replace("Web3-Token ", "");
  const sender = Web3Token.verify(token);
  return sender.address === address;
};

export const getChainid = () => {
  return new Promise(async (resolve) => {
    let chainId;

    chainId = await web3.eth.getChainId();

    while (chainId === undefined) {
      await new Promise((r) => setTimeout(r, 100));
      chainId = await web3.eth.getChainId();
    }

    resolve(chainId);
  });
};
