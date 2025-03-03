import React, { useEffect } from "react";
import authStore from "@/store/auth.store";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { SHOPPING_ROUTES } from "@/modules/shopping/pages/routes";

const PUBLIC_ROUTES = [...SHOPPING_ROUTES].map((item) => item.path);

const RouteGuardWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname;
  const isPublicRoute = [
    PUBLIC_ROUTES,
    "/",
    "/auth/sign-in",
    "/auth/sign-up",
  ].includes(pathName);

  const _authStore = authStore((state) => state);

  const checkUserToken = () => {
    if (!_authStore.token) navigate("/");
  };

  useEffect(() => {
    if (!isPublicRoute) checkUserToken();
  }, [_authStore.token, pathName]);

  return <Outlet />;
};

export default RouteGuardWrapper;
