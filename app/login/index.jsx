"use client";

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';

const HomeLayout = () => {
  const authContext = useContext(AuthContext);
  const handleLogin = authContext?.handleLogin;
  const loginStatus = authContext?.loginStatus;
  const address = authContext?.address;

  useEffect(() => {
    if (loginStatus) {
      loginStatus();
      handleLogin();
    }
  }, []);

  const handleSubmit = async () => {
    event.preventDefault();
    if (handleLogin) {
      await handleLogin();
      await loginStatus();
      await localStorage.setItem('address', JSON.stringify(address));
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex flex-col items-center">
        <header className="mt-32 mb-16">
          <img src="/assets/logo.svg" alt="logo" className="w-96 h-56" />
        </header>
        <div className="text-white text-center text-[32px] mb-10">Selamat Datang</div>
        <div className="bg-[#313131] p-8 rounded-2xl w-1/2">
          <p className="text-white text-center mb-6">Connect Wallet</p>
          <button className="text-black font-semibold flex justify-center items-center gap-2 bg-[#69E07D] p-4 rounded-lg w-full" onClick={handleSubmit}>
            <img src="/assets/metamask.svg" alt="metamask" className="w-7 h-7" />
            Masuk dengan  MetaMask
          </button>
        </div>
      </div>
    </div>
  )
}

export default HomeLayout;