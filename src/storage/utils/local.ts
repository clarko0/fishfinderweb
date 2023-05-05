import Router from "next/router";
import { isDocked } from "./window";
//update-text
export const CheckTheme = () => {
  if (isDocked()) {
    const userTheme: any = window.localStorage.getItem("user_theme");
    if (userTheme == null) {
      window.localStorage.setItem("user_theme", "dark");
      return "dark";
    }
    return userTheme;
  }
};

export const ChangeTheme = () => {
  if (isDocked()) {
    if (window.localStorage.getItem("user_theme") === "light") {
      window.localStorage.setItem("user_theme", "dark");
    } else {
      window.localStorage.setItem("user_theme", "light");
    }
  }
};

export const SetCurrentAccount = (address: string, token: string) => {
  if (isDocked()) {
    window.localStorage.setItem("address", address);
    window.localStorage.setItem("auth_token", token);
  }
};

export const GetCurrentAddress = (): any => {
  if (isDocked()) {
    const address = window.localStorage.getItem("address");
    if (address === null || "") {
      Router.push("/login");
    } else {
      return address;
    }
  }
};

export const GetAuthToken = () => {
  if (isDocked()) {
    const authtoken = window.localStorage.getItem("auth_token");
    if (authtoken === null || "") {
      Router.push("/login");
    } else {
      return authtoken;
    }
  }
};

export const ClearAuthToken = () => {
  if (isDocked()) {
    window.localStorage.setItem("auth_token", "");
    window.localStorage.setItem("address", "");
  }
};

export const FFWelcomeMessage = () => {
  if (isDocked()) {
    const status = window.localStorage.getItem("isFFWelcomeMsg");
    if (status === null) {
      window.localStorage.setItem("isFFWelcomeMsg", "false");
      return true;
    } else {
      return false;
    }
  }
};
