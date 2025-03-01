import {
  IAuthResponse,
  IAuthCredentials,
} from "@/modules/@shared/interfaces/auth.interface";
import { APP_HTTP_CLIENT } from "@/modules/@shared/http";

export class UserService {
  #path: string = "users";

  public signIn(payload: IAuthCredentials) {
    return APP_HTTP_CLIENT.post<IAuthResponse>(
      `/${this.#path}/authentications/local/login`,
      payload
    );
  }
}
