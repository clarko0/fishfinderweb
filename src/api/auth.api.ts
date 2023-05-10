import {
  ICompleteSignUpData,
  INewEmailData,
  INewPasswordData,
  ISignupLoginData,
} from "@/interface/api.interface";
import { ApiLocalStorage } from "@/local/api.local";
import axios from "axios";
import { env } from "process";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL + "/auth",
});

export const AuthApi = {
  async signup(data: ISignupLoginData) {
    return await api.post("/signup", data);
  },
  async completeSignup(data: ICompleteSignUpData) {
    return await api.post("/signup/complete", data);
  },
  async login(data: ISignupLoginData) {
    return await api.post("/login", data);
  },
  async changePassword(data: INewPasswordData) {
    return await api.post("/change-password", data, {
      headers: {
        Authorization: ApiLocalStorage.ReadAuthToken(),
      },
    });
  },
  async changeEmail(data: INewEmailData) {
    return await api.post("/change-email", data, {
      headers: {
        Authorization: ApiLocalStorage.ReadAuthToken(),
      },
    });
  },
};
