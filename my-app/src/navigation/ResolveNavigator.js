/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Web3Context from "../context/Web3Context";
import { useLocation } from "react-router-dom";
const ResolveNavigator = ({ setHasUser }) => {
  const location = useLocation()
 const { connectMetaMask }= Web3Context()
  useEffect(() => {
    const token = !!localStorage.getItem("isConnectedMetamask");

    if (token) {
      connectMetaMask()
      setHasUser(true);
    }
  }, [location]);
  return (
    <>
      <h1>LOADING</h1>
    </>
  );
};
export default ResolveNavigator;
