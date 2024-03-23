import { Routes, Route, BrowserRouter } from "react-router-dom";
import AuthGuard from "./AuthGuard"; // Import your AuthGuard component
import { PublicPaths } from "./path";
import BaseRoutes from "./base";
import { Fragment, Suspense } from "react";
import { Loader } from "../components";
import NotFound from "../modules/NotFound";


const RoutesWrapper = () => {
 
  return (
    <BrowserRouter>
      <Routes>
        {BaseRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Fragment>
                <Suspense fallback={<Loader />}>
                  {route.useAuth ? (
                    <AuthGuard allowedRoles={route.allowedRoles}>
                      <route.component />
                    </AuthGuard>
                  ) : (
                    <route.component />
                  )}
                </Suspense>
              </Fragment>
            }
          />
        ))}
        <Route path={PublicPaths.UNAUTHORIZEd} element={<NotFound />} />
        {/* Add your other routes here */}
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesWrapper;
