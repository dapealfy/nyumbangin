"use client";

import React, { createContext, useState, ReactNode } from 'react';
import { ethers } from 'ethers';
import { useRouter } from 'next/navigation';
import userAbi from '../artifacts/contracts/User.sol/UserContract.json';
import trxAbi from '../artifacts/contracts/Transaction.sol/TransactionContract.json';

export const ContractContext = createContext();

export const ContractProvider = ({ children }) => {
  const router = useRouter();

  const userAddress = '0x5b1D9fA0078DE22A942C5e7D1A0f0120338B423B';
  const trxAddress = '0x2d92502Eae514a049753d0579cACA532451d4871';

  // get all data
  const [allUser, setAllUser] = useState([]);
  const [allIncomingTrx, setAllIncomingTrx] = useState([]);
  const [allOutgoingTrx, setAllOutgoingTrx] = useState([]);

  // condition
  const [isRegist, setIsRegist] = useState(true);

  // data user
  const [userData, setUserData] = useState({
    email: '',
    wallet: '',
    username: '',
    bio: '',
    ava: '',
    fb: '',
    twt: '',
    ig: '',
    yt: '',
    twitch: '',
    quickAmount: ['', '', '', ''],
  });
  const [initialData, setInitialData] = useState({ ...userData });

  // data transaction
  const [transactionData, setTransactionData] = useState({
    amount: '',
    username: '',
    message: '',
    receiver: '',
  })

  const checkIsUser = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();

    const contract = new ethers.Contract(userAddress, userAbi.abi, signer);
    try {
      if(signerAddress === address) {
        const isUser = await contract.isUser(address);
        if (isUser) {
          setIsRegist(true);
        } else {
          setIsRegist(false);
        }
      }
    } catch (error) {
      console.log('CheckIsUser', error);
      alert('Terjadi kesalahan');
    }
  };

  const checkIsUsernameTaken = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(userAddress, userAbi.abi, signer);
    try {
      if(signerAddress === address) {
        const isTaken = await contract.isUsernameTaken(userData.username);        
        if (isTaken && userData.username !== loggedInUser) {
          alert('Username sudah diambil');
        }
      }
    } catch (error) {
      console.log('CheckIsUsernameTaken', error);
      alert('Terjadi kesalahan');
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(userAddress, userAbi.abi, signer);
    
    try {
      if (signerAddress === address) {
        const tx = await contract.addUser(
          userData.email,
          userData.username,
          userData.bio,
          userData.ava,
          userData.fb,
          userData.twt,
          userData.ig,
          userData.yt,
          userData.twitch,
          userData.quickAmount
        );
        checkIsUsernameTaken();
        alert('Pendaftaran anda sedang diproses');
        await tx.wait();
        alert('Pendaftaran anda berhasil');
        router.push('/');
      }
    } catch (error) {
      console.log('RegisterUser', error);
      alert('Terjadi kesalahan');
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(userAddress, userAbi.abi, signer);
    
    try {
      if (signerAddress === address) {
        const changedData = {};
        for (const key in userData) {
          if (userData[key] !== initialData[key]) {
            changedData[key] = userData[key];
          }
        }
        const tx = await contract.editUser(
          userData.email,
          userData.username,
          userData.bio,
          userData.ava,
          userData.fb,
          userData.twt,
          userData.ig,
          userData.yt,
          userData.twitch,
          userData.quickAmount
        );
        checkIsUsernameTaken();
        alert('Profil anda sedang diproses');
        await tx.wait();
        alert('Profil anda sudah selesai!');
        router.push('/');
      }
    } catch (error) {
      console.log('EditUser', error);
      alert('Terjadi kesalahan');
    }
  };

  const getUserData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(userAddress, userAbi.abi, signer);
    try {
      if (signerAddress === address) {
        const userDataResult = await contract.getUser(address); 
        const userData = {
          email: userDataResult[0],
          // wallet: userDataResult[1],
          username: userDataResult[1],
          bio: userDataResult[2],
          ava: userDataResult[3],
          fb: userDataResult[4],
          twt: userDataResult[5],
          ig: userDataResult[6],
          yt: userDataResult[7],
          twitch: userDataResult[8],
          quickAmount: userDataResult[9]
        };
        setUserData(userData);
      }
    } catch (error) {
      console.log('getUserData', error);
      alert('Terjadi kesalahan');
    }
  };

  const getAllUserData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(userAddress, userAbi.abi, signer);
    try {
      if (signerAddress === address) {
        const userDataResult = await contract.getAllUsers(); 
        setAllUser(userDataResult);
      }
    } catch (error) {
      console.log('getUserData', error);
      alert('Terjadi kesalahan');
    }
  };

  const handleTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(trxAddress, trxAbi.abi, signer);
    const transactionAmount = ethers.utils.parseEther(transactionData.amount);
    try {
      if (signerAddress === address) {
        const tx = await contract.addTransactionAndSendEther(
          transactionData.receiver,
          transactionData.username,
          transactionData.message,
          transactionAmount,
          {
            value: transactionAmount
          }
        );
        alert('Pembayaran anda sedang diproses');
        await tx.wait();
        alert('Pembayaran anda berhasil');
        router.push('/');
      }
    } catch (error) {
      console.log('handleTransaction', error);
      alert('Terjadi kesalahan');
    }
  };

  const getIncomingTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(trxAddress, trxAbi.abi, signer);
    try {
      if (signerAddress === address) {
        const incomingTrx = await contract.getIncomingTransactionHistory(address); 
        setAllIncomingTrx(incomingTrx);
      }
    } catch (error) {
      console.log('get incoming transaction', error);
      alert('Terjadi kesalahan');
    }
  };

  const getOutgoingTransaction = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const loggedInUser = localStorage.getItem('address');
    const address = loggedInUser ? JSON.parse(loggedInUser) : '';
    const signerAddress = await signer.getAddress();
    const contract = new ethers.Contract(trxAddress, trxAbi.abi, signer);
    try {
      if (signerAddress === address) {
        const outgoingTrx = await contract.getOutgoingTransactionHistory(address); 
        setAllOutgoingTrx(outgoingTrx);
      }
    } catch (error) {
      console.log('get outgoing transaction', error);
      alert('Terjadi kesalahan');
    }
  };

  return (
    <ContractContext.Provider value={{
      allUser, 
      setAllUser, 
      allIncomingTrx, 
      setAllIncomingTrx, 
      allOutgoingTrx, 
      setAllOutgoingTrx, 
      isRegist, 
      setIsRegist, 
      userData, 
      setUserData, 
      transactionData, 
      setTransactionData,
      checkIsUser,
      checkIsUsernameTaken,
      handleAddUser,
      handleEditUser,
      getUserData,
      getAllUserData,
      handleTransaction,
      getIncomingTransaction,
      getOutgoingTransaction
      }}>
      {children}
    </ContractContext.Provider>
  )
}