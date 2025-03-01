import { IUser } from "@/modules/@shared/interfaces/user.interface";
import { createStore } from "./_base.store";

interface State {
  user: IUser;
  token: string;

  reset: () => void;
  setUser: (value: IUser) => void;
  setToken: (value: string) => void;
}

export default createStore<State>({
  name: "auth",
  state: (set) => ({
    token: "",
    user: {} as IUser,

    setUser: (user) => set(() => ({ user })),
    setToken: (token) => set(() => ({ token })),
    reset: () => {
      set(() => ({
        token: "",
        user: {} as IUser,
      }));
    },
  }),
});
