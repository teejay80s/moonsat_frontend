import { lazy } from "react";

const BaseRoutes = [
  {
    path: `/*`,
    component: lazy(() => import("./PublicRoute")),
    useAuth: false,
  },
  {
    path: "/app/*",
    component: lazy(() => import("./LoggedinRoute")),
    useAuth: true,
  },

  {
    path: "*",
    component: lazy(() => import("../modules/NotFound")),
    useAuth: false,
  },
];

export default BaseRoutes;
