export interface ILink {
  fullUrl: string;
  shortUrl: string;
  isPrivate: boolean;
  userId: string | undefined;
}

export interface IUser {
  userId: string;
  userEmail: string;
}

export interface ILoginUser {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ILoginUserResponse {
  email: string;
  password: string;
  rememberMe: boolean;
  userId: string;
}

export interface IRegisterUser {
  email: string;
  password: string;
  year: string;
}

export interface IUserEmailId {
  newEmail: string;
  userId: string;
}

export interface IUserPasswordId {
  newPassword: string;
  userId: string;
}
