import authStore from "@/store/auth.store";
import loadingStore from "@/store/loading.store";
import React, { createContext, useContext, useEffect } from "react";
import { IUser } from "@/modules/@shared/interfaces/user.interface";
import { UserService } from "@/modules/@shared/services/user.service";

interface IAuthContext {
  user: IUser;
  signOut: () => void;
  signIn: (email: string, password: string) => Promise<void>;
}

interface IAuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  user: {} as IUser,
  signOut: () => {},
  signIn: () => new Promise<void>(() => {}),
});

const _userService = new UserService();

const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const _authStore = authStore((state) => state);
  const _loadingStore = loadingStore((state) => state);

  const signOut = () => _authStore.reset();
  const signIn = async (email: string, password: string) => {
    try {
      _loadingStore.setShow(true);

      const { data: signInResponse } = await _userService.signIn({
        email,
        password,
      });

      _authStore.setToken(signInResponse.token);

      await getUserData();

      _loadingStore.setShow(false);
    } catch (error) {
      _loadingStore.setShow(false);
      throw error;
    }
  };

  const getUserData = async () => {
    try {
      const userResponse = {} as IUser;
      _authStore.setUser(userResponse);

      return userResponse;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (_authStore.token) getUserData();
  }, []);

  const providerValue: IAuthContext = {
    signIn,
    signOut,
    user: _authStore.user,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error("useAuth must be used within a AuthProvider");

  return context;
};
