import { IUserData } from "@/storage/constants/interfaces";
import { GetUserdata } from "@/storage/utils/fetch";

export const globalstore = async () => {
  let userData: IUserData = {
    username: "@",
    avatar: "",
  };
  let calls = [
    GetUserdata().then((res: any) => {
      res = res.data;
      userData.username += res.nickname;
      userData.avatar =
        res.avatar_url === null
          ? "https://ynnovate.it/wp-content/uploads/2015/04/default-avatar.png"
          : res.avatar_url;
    }),
  ];
  await Promise.all(calls);
  return {
    user_data: userData,
  };
};
