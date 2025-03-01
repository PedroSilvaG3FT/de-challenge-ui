import { RouteObject } from "react-router-dom";

import SignIn from "./sign-in";
import SignUp from "./sign-up";
import AuthenticationLayout from "../layout";
import ForgotPassword from "./forgot-password";

export const AUTHENTICATION_ROUTES: RouteObject[] = [
  {
    path: "/auth",
    element: <AuthenticationLayout />,
    children: [
      { path: "sign-in", Component: SignIn },
      { path: "sign-up", Component: SignUp },
      { path: "forgot-password", Component: ForgotPassword },
    ],
  },
];
