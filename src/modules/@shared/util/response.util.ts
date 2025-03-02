import { AxiosError } from "axios";
import { ToastUtil } from "./toast.util";
import authStore from "@/store/auth.store";
import { toast, ToastOptions } from "react-toastify";

export class ResponseUtil {
  public static handleError(
    error: AxiosError,
    toastOptions: ToastOptions<unknown> = {},
    defaultMessage = `Ocorreu um erro ao processar a solicitação`
  ) {
    const status = error.response?.status || 0;

    const _showMessage = (message: string) => {
      if (status === 401) {
        authStore.getState().setToken("");

        const toastId = "unauthorized";
        if (!toast.isActive(toastId)) {
          ToastUtil.info("Sessão expirada, faça login novamente", {
            ...toastOptions,
            toastId,
          });
        }
      } else ToastUtil.error(message, toastOptions);
    };

    const data = error.response?.data as any;
    let message = data.message || defaultMessage;

    _showMessage(message);
  }
}
