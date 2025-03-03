import ShoppingSearchPage from "./search";
import { RouteObject } from "react-router-dom";
import AppBaseLayoutComponent from "@/modules/@shared/components/layout/app-base-layout.component";

export const SHOPPING_ROUTES: RouteObject[] = [
  {
    path: "",
    element: <AppBaseLayoutComponent />,
    children: [{ path: "", Component: ShoppingSearchPage }],
  },
];
