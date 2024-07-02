import React, { Suspense } from "react";
import Router from "./route";
import Loader from "../components/loader";

const Layout = () => {

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Router />
      </Suspense>
    </>
  );
};

export default Layout;
