import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";
import { useNavigate } from "react-router";

const CHECK_CONNECT_METAMASK = "isConnectedMetamask";
const { ethereum } = window;

let myWeb3 = null;
if (ethereum) {
  myWeb3 = new Web3(ethereum);
}

export const web3 = myWeb3;

export const InitWeb3Context = createContext();

export default function Web3Context() {
  return useContext(InitWeb3Context);
}

export const getContract = (abi, address) => {
  return { web3Contract: new web3.eth.Contract(abi, address) };
};

export const Web3ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState({
    address: "", // Stores address
    balance: null, // Stores balance
  });

  const navigate = useNavigate();
  const [hasUser, setHasUser] = useState(false);
  const [loading, setLoading] = useState(false);

  const connectMetaMask = () => {
    if (!ethereum) return alert("Please install metamask");
    ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((res) => {
        web3.eth.getBalance(res[0]).then((bal) => {
          setCurrentAccount({
            address: res[0],
            balance: web3.utils.toWei(bal, "ether"),
          });
          setHasUser(true);
          navigate("/");
        });
        localStorage.setItem(CHECK_CONNECT_METAMASK, true);
      });
  };

  const checkWalletConnected = async () => {
    if (!ethereum) return alert("Please install metamask");

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts?.length) {
      web3.eth.getBalance(accounts).then((bal) => {
        setCurrentAccount({
          address: accounts,
          balance: web3.utils.toWei(bal, "ether"),
        });
        setHasUser(true);
      });
    }
  };

  const isAccountConnected = () =>
    !!localStorage.getItem(CHECK_CONNECT_METAMASK);

  useEffect(() => {
    if (isAccountConnected()) {
      checkWalletConnected();
    }
  }, []);

  const disconnectWallet = async () => {
    localStorage.clear();
    setHasUser(false);
    setCurrentAccount({ address: "", balance: null });
    navigate("/login");
  };

  return (
    <InitWeb3Context.Provider
      value={{
        connectMetaMask,
        checkWalletConnected,
        currentAccount,
        hasUser,
        setHasUser,
        disconnectWallet,
        loading,
        setLoading,
      }}
    >
      {children}
    </InitWeb3Context.Provider>
  );
};
