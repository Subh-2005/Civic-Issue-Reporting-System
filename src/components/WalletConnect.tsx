import { useState } from "react";
import { ethers } from "ethers";

export default function WalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      setError("MetaMask not detected");
    }
  }

  return (
    <div className="p-4 rounded-xl bg-white/80 shadow-lg flex flex-col items-center">
      <button
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        onClick={connectWallet}
      >
        {account ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
      </button>
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
}
