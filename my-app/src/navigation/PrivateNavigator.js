import React from "react";
import { PrivateRouter } from "../router";
import { DashBoardPrivate } from "../layouts/header";
const PrivateNavigator = ({ setHasUser }) => {
  return (
    <>
      <DashBoardPrivate setHasUser={setHasUser}  />
      <PrivateRouter />
    </>
  );
};

export default PrivateNavigator;
