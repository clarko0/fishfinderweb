import { isDocked } from "@/storage/utils/window";

export const ApiLocalStorage = {
  ReadAuthToken(withoutBearer: boolean = false): string {
    let auth: string = "";
    if (isDocked()) {
      const res =
        (!withoutBearer ? "Bearer " : "") +
        window.localStorage.getItem("authorization_token");
      auth = res === null ? "" : res;
    }
    return auth;
  },
  WriteAuthToken(newToken: string) {
    if (isDocked()) {
      window.localStorage.setItem("authorization_token", newToken);
    }
  },
};
