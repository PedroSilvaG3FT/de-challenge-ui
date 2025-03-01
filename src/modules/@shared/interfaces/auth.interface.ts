export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IAuthResponse {
  type: string;
  token: string;
  expiresIn: number;
}
