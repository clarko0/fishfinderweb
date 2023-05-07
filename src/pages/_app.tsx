import "../styles/styles.css";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import Router from "next/router";
import {
  Button,
  Input,
  Modal,
  NextUIProvider,
  Text,
  createTheme,
} from "@nextui-org/react";
import "@/styles/globals.css";
import { ClearAuthToken } from "@/storage/utils/local";

import { CreateRerouteUrl } from "@/storage/utils/url";
import { sleep } from "@/storage/utils/tools";
import LoginModal from "@/components/Modals/Authentication/Login";
import SignupModal from "@/components/Modals/Authentication/Signup";
import { ApiLocalStorage } from "@/local/api.local";
import { AuthApi } from "@/api/auth.api";
import { ISignupLoginData } from "@/interface/api.interface";
const inter = Inter({ subsets: ["latin"] });
declare var window: any;

export default function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", async () => {
        ClearAuthToken();
        Router.push(CreateRerouteUrl(window.location.origin + "/login"));
      });
    }
  }, []);

  const [loginData, setLoginData] = useState<any>({
    is_login: false,
    data: {
      email: "",
      password: "",
    },
  });

  const [signupData, setSignupData] = useState<any>({
    is_signup: false,
    data: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const [oltData, setOltData] = useState<any>({
    is_olt: false,
    data: {
      img: "",
      username: "",
      discord: "",
      account: "",
    },
  });

  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isOlt, setIsOlt] = useState<boolean>(false);
  const [loginClicker, setLoginClicker] = useState<boolean>(false);
  const [signupClicker, setSignupClicker] = useState<boolean>(false);

  const [signupHelperEmail, setSingupHelperEmail] = useState<boolean>(false);
  const [signupSamePassword, setSignupSamePassword] = useState<boolean>(false);
  const [signupSecurePassword, setSignupSecurePassword] =
    useState<boolean>(false);

  const [badLogin, setBadLogin] = useState<boolean>(false);

  useEffect(() => {
    setIsLogin(ApiLocalStorage.ReadAuthToken() === "");
  }, []);

  const theme = createTheme({
    type: "dark",
  });

  const isStrongPassword = (password: string): boolean => {
    let expression: RegExp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    return expression.test(password);
  };

  const isEmail = (email: string): boolean => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return expression.test(email);
  };

  const signup = async () => {
    if (isEmail(signupData.data.email)) {
      setSingupHelperEmail(false);
      if (isStrongPassword(signupData.data.password)) {
        setSignupSecurePassword(false);
        if (signupData.data.password === signupData.data.confirm_password) {
          setSignupSamePassword(false);
          const signupD: ISignupLoginData = {
            email: signupData.data.email,
            password: signupData.data.password,
          };
          const res = await AuthApi.signup(signupD);
        } else {
          setSignupSamePassword(true);
        }
      } else {
        setSignupSecurePassword(true);
      }
    } else {
      setSingupHelperEmail(true);
    }
  };

  const login = async () => {
    const loginD: ISignupLoginData = {
      email: loginData.data.email,
      password: loginData.data.password,
    };
    const res = await AuthApi.login(loginD);
    if (res.status !== 200) {
      setBadLogin(true);
      return;
    }
    setBadLogin(false);
  };

  return (
    <>
      <NextUIProvider theme={theme}>
        <Head>
          <link rel="shortcut icon" href="/favicon.png" />
          <title>Fish Finder - #1 QOL tool for WoD</title>
        </Head>
        <div style={{ fontFamily: "inter" }} id="app">
          <Component {...pageProps} />
          <SignupModal
            signupHelperEmail={signupHelperEmail}
            signupSamePassword={signupSamePassword}
            signupSecurePassword={signupSecurePassword}
            signup={signup}
            is_open={isSignup}
            signupClicker={signupClicker}
            setSignupClicker={setSignupClicker}
            setIsLogin={setIsLogin}
            setIsSignup={setIsSignup}
            setSignupData={setSignupData}
            setLoginData={setLoginData}
          />
          <LoginModal
            is_open={isLogin}
            loginClicker={loginClicker}
            setSignupData={setSignupData}
            setLoginClicker={setLoginClicker}
            setIsLogin={setIsLogin}
            login={login}
            badLogin={badLogin}
            setBadLogin={setBadLogin}
            setIsSignup={setIsSignup}
            setLoginData={setLoginData}
          />
        </div>
      </NextUIProvider>
    </>
  );
}
