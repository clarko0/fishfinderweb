import "../styles/styles.css";
import { Inter } from "@next/font/google";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";
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
import { getEmailFromToken, sleep } from "@/storage/utils/tools";
import LoginModal from "@/components/Modals/Authentication/Login";
import SignupModal from "@/components/Modals/Authentication/Signup";
import { ApiLocalStorage } from "@/local/api.local";
import { AuthApi } from "@/api/auth.api";
import { ISignupLoginData } from "@/interface/api.interface";
import OneLastThingModal from "@/components/Modals/Authentication/OneLastThing";
import { UserApi } from "@/api/user.api";

import AuthenticateEmailModal from "@/components/Modals/Authentication/AuthenticateEmail";
import { CryptoUtils } from "@/utils/crypto.utils";
const inter = Inter({ subsets: ["latin"] });
declare var window: any;

let currentOTPIndex: number = 0;
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

  const [oltImage, setOltImage] = useState<string>("");

  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isOlt, setIsOlt] = useState<boolean>(false);
  const [isEmailConfirm, setIsEmailConfirm] = useState<boolean>(false);
  const [loginClicker, setLoginClicker] = useState<boolean>(false);
  const [signupClicker, setSignupClicker] = useState<boolean>(false);
  const [signupEmailInUse, setSignupEmailInUse] = useState<boolean>(false);
  const [signupHelperEmail, setSingupHelperEmail] = useState<boolean>(false);
  const [signupSamePassword, setSignupSamePassword] = useState<boolean>(false);
  const [signupSecurePassword, setSignupSecurePassword] =
    useState<boolean>(false);
  const [badLogin, setBadLogin] = useState<boolean>(false);
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [otpWrong, setOTPWrong] = useState<boolean>(false);

  const handleUserData = async () => {
    try {
      let res: any = await UserApi.getMyData();
      res = res.data.data;
      if (!res.verified) {
        setIsEmailConfirm(true);
      }
    } catch (e) {
      setIsLogin(true);
    }
  };

  useEffect(() => {
    setIsLogin(ApiLocalStorage.ReadAuthToken() === "");
    handleUserData();
    try {
      setEmail(getEmailFromToken());
    } catch (e) {}
  }, []);

  const theme = createTheme({
    type: "dark",
  });

  const handleBackButton = () => {
    ApiLocalStorage.WriteAuthToken("");
    setIsEmailConfirm(false);
    setIsLogin(true);
  };

  const handleEmailPasscode = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP: string[] = [...otp];
    if (value.length === 6 && /^\d+$/.test(value) && currentOTPIndex === 0) {
      for (let i = 0; i < 6; i++) {
        newOTP[i] = value.charAt(i);
      }
      setActiveOTPIndex(5);
    } else {
      newOTP[currentOTPIndex] = value.substring(value.length - 1);
      if (!value) setActiveOTPIndex(currentOTPIndex - 1);
      else setActiveOTPIndex(currentOTPIndex + 1);
    }
    setOtp(newOTP);
    if (newOTP.toString().replaceAll(",", "").length === 6) {
      try {
        setIsLoading(true);
        setOTPWrong(false);
        const res = await AuthApi.completeSignup({
          email: email,
          email_confirmation: newOTP.toString().replaceAll(",", ""),
        });
        let data = res.data;
        setIsEmailConfirm(false);
      } catch (e) {
        setOTPWrong(true);
        setOtp(new Array(6).fill(""));
        currentOTPIndex = 0;
        setActiveOTPIndex(0);
      }
    }
  };

  const handleKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      setActiveOTPIndex(currentOTPIndex - 1);
    }
  };

  const handlePaste = (e: any): any => {
    let value: string = e.clipboardData.getData("Text");
    if (value.length === 6 && /^\d+$/.test(value)) {
      const newOTP: string[] = value.split("");
      setOtp(newOTP);
      setActiveOTPIndex(5);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  const isStrongPassword = (password: string): boolean => {
    let expression: RegExp =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{12,}$/;
    return expression.test(password);
  };

  const isEmail = (email: string): boolean => {
    const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return expression.test(email);
  };

  const signup = async () => {
    setSignupEmailInUse(false);
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
          try {
            let res = await AuthApi.signup(signupD);
            res = res.data;
            ApiLocalStorage.WriteAuthToken(res.data.access_token);
            setEmail(getEmailFromToken());
            setIsSignup(false);
            setIsEmailConfirm(true);
            setIsLogin(false);
            setSignupEmailInUse(false);
          } catch (error) {
            setSignupEmailInUse(true);
          }
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
    try {
      const res = await AuthApi.login(loginD);
      let data = res.data.data;
      setBadLogin(false);
      ApiLocalStorage.WriteAuthToken(data.access_token);
      setIsLogin(false);
      handleUserData();
      try {
        setEmail(getEmailFromToken());
      } catch (e) {}
    } catch (e) {
      setBadLogin(true);
    }
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
          {/* <SignupModal
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
            signupEmailInUse={signupEmailInUse}
          />
          <AuthenticateEmailModal
            is_open={isEmailConfirm}
            email={email}
            handleEmailPasscode={handleEmailPasscode}
            otp={otp}
            inputRef={inputRef}
            isLoading={isLoading}
            activeOTPIndex={activeOTPIndex}
            handleKeyDown={handleKeyDown}
            handlePaste={handlePaste}
            handleBackButton={handleBackButton}
            otpWrong={otpWrong}
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
          <OneLastThingModal
            is_open={false}
            oltData={oltData}
            setOltImage={setOltImage}
            oltImage={oltImage}
            setOltData={setOltData}
          /> */}
        </div>
      </NextUIProvider>
    </>
  );
}
