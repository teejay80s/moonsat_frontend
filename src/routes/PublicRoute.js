import React, { Fragment, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { lazy } from "react";
import { BasePaths } from "./path";
import { AuthContext } from "../context";

const paths = [
  {
    path: "/",
    element: lazy(() => import("../modules/Home")),
  },

  {
    path: "/login",
    element: lazy(() => import("../modules/Auth/Login")),
  },
  {
    path: "/register",
    element: lazy(() => import("../modules/Auth/Register")),
  },

  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function Auth() {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to={BasePaths.MAIN} replace />;
  }

  return (
    <Routes>
      {paths.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default Auth;
