import { IUserProfile } from "@/modules/@shared/interfaces/user.interface";

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignInResponse {
  token: string;
  user: IUserProfile;
}

export interface ISignUp {
  name: string;
  email: string;
  phone?: string;
  password: string;
  birthDate: string;
}
