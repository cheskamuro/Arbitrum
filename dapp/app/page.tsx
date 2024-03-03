"use client";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContract } from "../config";

export default function Home() {
  // State for wallet connection
  const [walletKey, setWalletKey] = useState("");

  // State for minting
  const [mintingAmount, setMintingAmount] = useState<number>();
  const [submitted, setSubmitted] = useState(false);
  const [transactionHash, setTransactionHash] = useState("");

  // State for staking
  const [stakingAmount, setStakingAmount] = useState<number>();

  // State for withdrawing
  const [withdrawingAmount, setWithdrawingAmount] = useState<number>();

  // Function to connect wallet
  const connectWallet = async () => {
    const { ethereum } = window as any;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setWalletKey(accounts[0]);
  };

  // Function to handle minting
  const mintCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.mint(signer, mintingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      // Handle minting error
      const decodedError = contract.interface.parseError(e.data);
      alert(`Minting failed: ${decodedError?.args}`);
    }
  };

  // Function to handle staking
  const stakeCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.stake(stakingAmount);
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      // Handle staking error
      const decodedError = contract.interface.parseError(e.data);
      alert(`Staking failed: ${decodedError?.args}`);
    }
  };

  // Function to handle withdrawing
  const withdrawCoin = async () => {
    const { ethereum } = window as any;
    const provider = new BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = getContract(signer);

    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setSubmitted(true);
      setTransactionHash(tx.hash);
    } catch (e: any) {
      // Handle withdrawing error
      const decodedError = contract.interface.parseError(e.data);
      alert(`Withdrawal failed: ${decodedError?.args}`);
    }
  };

  // Function to handle changes in minting amount input
  const mintAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setMintingAmount(undefined);
    } else if (!isNaN(Number(inputValue))) {
      setMintingAmount(Number(inputValue));
    }
  };

  // Function to handle changes in staking amount input
  const stakeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue === "") {
      setStakingAmount(undefined);
    } else if (!isNaN(Number(inputValue))) {
      setStakingAmount(Number(inputValue));
    }
  };

  return (
<main style={{display:'flex',flexDirection:'column',alignItems:'flex-start',justifyContent:'center',minHeight:'100vh',backgroundImage:"url('https://wallpaperset.com/w/full/2/f/c/466272.jpg')",backgroundSize:'cover',backgroundPosition:'center',backgroundAttachment:'fixed'}}>
  <div style={{background:'url(https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148549780.jpg?size=626&ext=jpg) center center / cover',border:'solid black',padding:'180px',textAlign:'center'}}>
    <button onClick={connectWallet} className="p-3 bg-violet-800 text-white rounded">{walletKey || 'Connect wallet'}</button>
    <div style={{display:'flex',flexDirection:'column'}}><br/><input type="text" value={mintingAmount} onChange={(e)=>mintAmountChange(e)} style={{color:'Black'}} placeholder="Mint amount here"/><button onClick={mintCoin} className="p-3 bg-violet-800 text-white rounded">Mint</button></div><br/>
    <div style={{display:'flex',flexDirection:'column'}}><input type="text" value={stakingAmount} onChange={(e)=>stakeAmountChange(e)} style={{color:'Black'}} placeholder="Stake amount here"/><button onClick={stakeCoin} className="p-3 bg-violet-800 text-white rounded">Stake</button></div>
    <div style={{textAlign:'center'}}><br/><br/><button onClick={withdrawCoin} className="p-2 bg-violet-800 text-white rounded">Withdraw</button></div>
  </div>
</main>

  );
}
