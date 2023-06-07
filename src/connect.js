import React, { useState } from "react";
import Web3 from "web3";
import { bufferToHex } from "ethereumjs-util";

const ConnectMetamask = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [signature, setSignature] = useState(null);
  const message = "RSN+QStKMGw3dysifXNuKl53NFt3WXJO";

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccounts(accounts);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Please install MetaMask");
    }
  };

  const signMessage = async () => {
    if (web3 && accounts) {
      const messageBuffer = Buffer.from(message);
      const messageHash = bufferToHex(messageBuffer);
      const signature = await web3.eth.personal.sign(
        messageHash,
        accounts[0],
        ""
      );
      setSignature(signature);
    }
  };

  return (
    <div>
      {!accounts && (
        <button onClick={connectMetamask}>Connect to MetaMask</button>
      )}
      {accounts && (
        <div>
          <p>Connected account: {accounts[0]}</p>
          {!signature && <button onClick={signMessage}>Sign Message</button>}
          {signature && <p>Signature: {signature}</p>}
        </div>
      )}
    </div>
  );
};

export default ConnectMetamask;