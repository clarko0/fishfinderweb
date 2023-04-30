import "../styles/styles.css";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { useEffect } from "react";
import Router from "next/router";
import { NextUIProvider } from "@nextui-org/react";
import "@/styles/globals.css";
import { ClearAuthToken } from "@/storage/utils/local";
const inter = Inter({ subsets: ["latin"] });
declare var window: any;

export default function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async () => {
        ClearAuthToken();
        Router.push("/login");
      });
    }
  }, []);
  return (
    <>
      <NextUIProvider>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <title>Fish Finder - #1 QOL tool for WoD</title>
        </Head>
        <div style={{ fontFamily: "inter" }} id="app">
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </>
  );
}
