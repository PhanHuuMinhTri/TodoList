import React from "react";
import { PublicRouter } from "../router";
import { DashBoardPublic } from "../layouts/header";
const PublicNavigator = () => {
  return (
    <>
      <DashBoardPublic />
      <PublicRouter />
    </>
  );
};

export default PublicNavigator;
