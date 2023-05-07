export interface IUpdateUserdata {
  new_username: string;
  new_pfp: string;
  new_discord: string;
  new_account: {
    address: string;
    token: string;
  };
}

export interface ILeaderboardData {
  filters: {
    descending: boolean;
    sort_by: string;
  };
  take: number;
}

export interface ISignupLoginData {
  email: string;
  password: string;
}

export interface INewPasswordData {
  new_password: string;
  confirm_key: number;
}

export interface INewEmailData {
  new_email: string;
  confirm_key: number;
}
