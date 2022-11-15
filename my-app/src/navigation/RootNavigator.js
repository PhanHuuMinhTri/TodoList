/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import PrivateNavigator from "./PrivateNavigator";
import PublicNavigator from "./PublicNavigator";
import ResolveNavigator from "./ResolveNavigator";
import Web3Context from "../context/Web3Context";
const RootNavigator = () => {
  const {hasUser, setHasUser, disconnectWallet} = Web3Context()
  const location = useLocation();
  const renderUI = useMemo(() => {
    const isLogin = !!localStorage.getItem("isConnectedMetamask");
    if (hasUser) {
      return <PrivateNavigator setHasUser={setHasUser} disconnectWallet={disconnectWallet} />;
    } else if (isLogin) {
      return <ResolveNavigator setHasUser={setHasUser} />;
    }
    return <PublicNavigator />;
  }, [hasUser, location]);

  return <>{renderUI}</>;
};

export default RootNavigator;
