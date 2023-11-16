"use client";

import React, { useState, useEffect, useContext } from 'react';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import { ContractContext } from '../../context/contractContext';

const SearchLayout = () => {
  const router = useRouter();
  const contractContext = useContext(ContractContext);
  const { allUser, getAllUserData } = contractContext;
  const [searchText, setSearchText] = useState('');
  const [usernames, setUsernames] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  
  useEffect(() => {
    getAllUserData();
  }, [getAllUserData]);
  
  useEffect(() => {
    setUsernames(allUser.map((userData) => userData[2]));
  }, [allUser]);
  
  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setSearchText(inputText);

    const filteredUsernames = usernames.filter((username) =>
      username.toLowerCase().includes(inputText.toLowerCase())
    );

    setShowDropdown(inputText.length > 0 && filteredUsernames.length > 0);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center">
        <header className="mt-32 mb-10 w-1/3">
          <div className="relative">
            <input
              className="bg-[#3F3F3F] text-white border-b border-white outline-none pl-12 p-4 rounded-lg w-full"
              type='text'
              placeholder="Pencarian"
              value={searchText}
              onChange={handleInputChange}
            />
            <span
              className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
            >
              <img src="/assets/search.svg" alt="search" className="w-6 h-6" />
            </span>
            {showDropdown && (
              <div className="absolute bg-[#3F3F3F] w-full mt-1 rounded-lg shadow-md max-h-[230px] overflow-auto">
                <ul>
                  {usernames.map((username) => (
                    <li key={username} className="cursor-pointer hover:bg-white hover:text-black py-4 px-2" onClick={() => router.push(`/${username}`)}>
                      {username}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </header>
        <main className="flex justify-center gap-8 text-white">
          <div className="bg-[#313131] p-8 cursor-pointer hover:opacity-75 space-y-4 rounded-2xl">
            <p className="text-[28px] w-[20px]">QR Code</p>
            <p>Lihat QR Code untuk memudahkan transaksi disini.</p>
          </div>
          <div className="bg-[#313131] p-8 cursor-pointer hover:opacity-75 space-y-4 rounded-2xl" onClick={() => router.push('/histori')}>
            <p className="text-[28px] w-[60%]">Dukungan Masuk & Keluar</p>
            <p>Lihat histori dukungan yang masuk dan Keluar disini.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SearchLayout;
