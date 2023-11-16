"use client";

import React, { useState, useEffect, useContext } from 'react';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import { ContractContext } from '../../context/contractContext';

const DonasiLayout = ({username}) => {
  const router = useRouter();
  const contractContext = useContext(ContractContext);
  const { allUser, getAllUserData, transactionData, setTransactionData, handleTransaction } = contractContext;
  const [userData, setUserData] = useState(allUser?.filter((user) => user[1] === username));

  const [selectedValue, setSelectedValue] = useState(null);
  const inputRef = React.createRef();
  const [usiaChecked, setUsiaChecked] = useState(false);
  const [setujuChecked, setSetujuChecked] = useState(false);

  useEffect(() => {
    getAllUserData();
  }, [getAllUserData]);

  useEffect(() => {
    setUserData(allUser?.filter((user) => user[2] === username));
  }, [allUser]);

  const handleUsiaChange = () => {
    setUsiaChecked(!usiaChecked);
  };

  const handleSetujuChange = () => {
    setSetujuChecked(!setujuChecked);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    setTransactionData({ ...transactionData, amount: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const username = userData[0]?.username;
    const receiver = userData[0]?.wallet;
    setTransactionData({
      ...transactionData,
      [name]: value,
      username,
      receiver,  
    });
  };

  return (
    <div className="min-h-screen mb-16">
      <Navbar />
      <div className="flex flex-col items-center">
        <header className="mt-20 mb-16">
          <div className="flex gap-8 items-center">
            <img src={userData[0]?.ava || 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1698473813~exp=1698474413~hmac=f9832cbc1ff89bbd091138aa52748c22c0819549ac495c31efa766e8c9d25982'} alt="ava" className="w-32 h-32 rounded-full object-cover" />
            <div className="text-white space-y-4">
              <h1 className="text-[40px]">{userData[0]?.username || null}</h1>
              <p className="">{userData[0]?.bio || null}</p>
            </div>
          </div>
        </header>
        <div className="bg-[#313131] rounded-2xl w-1/2">
          <div className="bg-[url('/assets/forest.png')] p-8 bg-no-repeat rounded-2xl" style={{ backgroundSize: '100% auto' }}>
            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Nominal</label>
                <input
                  className={`bg-[#3F3F3F] text-white border-b border-white outline-none p-3 rounded-lg ${
                    transactionData?.amount ? 'bg-transparent' : ''
                  }`}
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="0.00001"
                  ref={inputRef}
                  value={transactionData?.amount}
                  onChange={handleInputChange}
                />
              </div>
              <p className="text-white text-xs">
                Minimum alert: <span className="text-red-500">ETH 0.00001</span>
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {userData[0]?.quickAmount.map((value, index) => (
                  <button
                    key={index}
                    className={`bg-[#69E07D] text-black p-4 rounded-lg w-[48%] font-semibold ${
                      selectedValue === value ? 'opacity-80' : ''
                    }`}
                    onClick={() => handleSelect(value)}
                    type="button"
                  >
                    MATIC {value}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold">Pesan</label>
                <input
                  className={`bg-[#3F3F3F] text-white border-b border-white outline-none p-3 rounded-lg ${
                    transactionData?.message ? 'bg-transparent' : ''
                  }`}
                  type="text"
                  id="message"
                  name="message"
                  placeholder="Sampaikan apresiasi"
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className=" h-5 w-5 text-green-500"
                    id="usiaCheckbox"
                    checked={usiaChecked}
                    onChange={handleUsiaChange}
                  />
                  <p> Saya berusia 17 tahun atau lebih.</p>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-9 w-9 text-green-500"
                    id="setujuCheckbox"
                    checked={setujuChecked}
                    onChange={handleSetujuChange}
                  />
                  <p>
                    Saya setuju bahwa dukungan ini diberikan secara sukarela dan bukan sebagai imbalan atas kegiatan komersial, sesuai dengan syarat dan ketentuan.
                  </p>
                </label>
              </div>
              <p className="text-white text-sm font-semibold pt-4">
                Metode Pembayaran
              </p>
              <Button text="MATIC" onClick={handleTransaction} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonasiLayout;
