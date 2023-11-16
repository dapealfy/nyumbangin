"use client";

import React, { useState, useContext, useEffect } from 'react';
import Button from '@/components/button';
import { ContractContext } from '../../context/contractContext';

const RegistrasiLayout = () => {
  const contractContext = useContext(ContractContext);
  const { userData, handleAddUser, setUserData } = contractContext;

  const handleInputChange = async (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="min-h-screen mb-40">
      <div className="flex flex-col items-center">
        <header className="mt-32 mb-16">
          <img src="/assets/logo.svg" alt="logo" className="w-96 h-56" />
        </header>
        <div className="text-white text-center text-[32px] mb-10">Registrasi</div>
        <div className="bg-[#313131] p-8 rounded-2xl w-1/2">
          <form className="space-y-4">
            <div className="flex flex-col gap-2">   
              <label className="text-sm font-semibold">Email</label>
              <input
                className={`text-white border-b border-white outline-none p-3 rounded-lg ${
                  userData.email ? 'bg-[#313131]' : 'bg-[#3F3F3F]'
                }`}
                type="email"
                id="email"
                name="email"
                placeholder="user@gmail.com"
                value={userData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-2">   
              <label className="text-sm font-semibold">Username</label>
              <div className="flex gap-4 items-center">
                <p className="text-[#B6E5FF] text-xl">nyumbang.in/</p>
                <input
                  className={`bg-[#3F3F3F] text-white border-b border-white outline-none p-3 rounded-lg w-full ${
                    userData.username ? 'bg-transparent' : ''
                  }`}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="user123"
                  value={userData.username}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-white text-xs">Username akan menjadi link nyumbangin mu.</p>
            </div>
            <p className="text-white">Anda harus berusia 17 tahun ke atas untuk bergabung bersama saweria.co dan dengan mendaftarkan diri, anda telah menyetujui <span className="underline">syarat dan ketentuan</span> saweria.co</p>
            <Button text="Daftar" onClick={handleAddUser} />
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrasiLayout;