import { Fragment, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const privateRoutes = [
  {
    path: "/dashboard",
    element: lazy(() => import("../modules/User/index")),
  },

  {
    path: "*",
    element: lazy(() => import("../modules/NotFound")),
  },
];

function Admin() {
  return (
    <Routes>
      {privateRoutes.map(({ path, element: Element }) => (
        <Fragment key={path}>
          <Route key={path} path={path} element={<Element />} />
        </Fragment>
      ))}
    </Routes>
  );
}

export default Admin;
