"use client";

import React, { useState, useEffect, useContext } from 'react';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import { ContractContext } from '../../context/contractContext';
import { AuthContext } from '../../context/authContext';

const ProfilLayout = () => {
  const contractContext = useContext(ContractContext);
  const authContext = useContext(AuthContext);
  const { userData, handleEditUser, setUserData, getUserData, isRegist, checkIsUser } = contractContext;
  const [image, setImage] = useState("https://i.pravatar.cc/300");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address } = authContext;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageUpload = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleQuickAmountChange = (e, index) => {
    const { value } = e.target;
    const updatedQuickAmount = [...userData.quickAmount];
    updatedQuickAmount[index] = value;
    setUserData({
      ...userData,
      quickAmount: updatedQuickAmount,
    });
  };

  useEffect(() => {
    checkIsUser();
  }, [isRegist]);

  useEffect(() => {
    if (!isRegist) {
      router.push('/registrasi');
    } else {
      getUserData();
    }
  }, []);


  return (
    <div className="min-h-screen mb-40">
      <Navbar />
      <div className="flex flex-col items-center">
        <header className="mt-20 mb-16">
          <h1 className="text-center text-[32px] mb-8">Informasi User</h1>
          <div className="flex gap-8 items-center">
            <div>
              <div className="relative w-32 h-32 rounded-full overflow-hidden" onClick={handleImageUpload}>
                <img src={userData.ava || 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1698473813~exp=1698474413~hmac=f9832cbc1ff89bbd091138aa52748c22c0819549ac495c31efa766e8c9d25982'} alt="ava" className="w-full h-full object-cover" />
                <label
                  htmlFor="fileInput"
                  className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 cursor-pointer"
                >
                  <span className="text-4xl text-white cursor-pointer">+</span>
                </label>
              </div>
              {isModalOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-800 bg-opacity-50">
                  <div className="bg-[#3F3F3F] p-4 rounded-md w-[600px] flex justify-between gap-20">
                    <input
                      type="text"
                      name="ava"
                      id="ava"
                      value={userData.ava}
                      onChange={handleInputChange}
                      placeholder="Enter url"
                      className="text-white bg-transparent w-full"
                    />
                    <div className="flex gap-2">
                      <button onClick={handleEditUser} className="bg-green-700 text-white p-2">Save</button>
                      <button onClick={handleCloseModal} className="bg-black text-white p-2">Close</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="text-white space-y-4 w-[400px]">
              <div className="flex flex-col gap-2">   
                <label className="text-sm font-semibold">Username</label>
                <input
                  className={`text-white border-b border-white outline-none p-3 rounded-lg ${
                    userData.username ? 'bg-transparent' : 'bg-[#3F3F3F]'
                  }`}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="yourusername"
                  value={userData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2">   
                <label className="text-sm font-semibold">Email</label>
                <input
                  className={`text-white border-b border-white outline-none p-3 rounded-lg ${
                    userData.email ? 'bg-transparent' : 'bg-[#3F3F3F]'
                  }`}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="youremail@mail.com"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
        </header>
        <div className="flex gap-24 justify-center text-white">
          <div className="space-y-8">
            <h1 className="text-[32px] text-center my-8">Pengaturan Halaman</h1>
            <div className="flex flex-col gap-4">   
              <label className="text-sm font-semibold">Pesan</label>
              <textarea
                className={`text-white border-b border-white outline-none p-3 rounded-lg w-[400px] ${
                  userData.bio ? 'bg-transparent' : 'bg-[#3F3F3F]'
                }`}
                rows="5"
                placeholder="Tulis teks di sini..."
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
              ></textarea>
              <div className="flex justify-end text-gray-500 -mb-4">
                {userData.bio?.length}/500
              </div>
            </div>
            <div className="flex flex-col gap-4">   
              <label className="text-sm font-semibold">Atur tombol quick amount</label>
              {userData.quickAmount?.map((value, index) => (
                <div className="relative w-full" key={index}>
                  <input
                    className={`text-white border-b border-white outline-none p-3 pl-16 rounded-lg w-[400px] ${
                      userData.quickAmount ? 'bg-transparent' : 'bg-[#3F3F3F]'
                    }`}
                    type="text"
                    id={`quickAmount-${index}`}
                    placeholder={`Amount ${index + 1}`}
                    value={value}
                    onChange={(e) => handleQuickAmountChange(e, index)}
                  />
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white">
                    MATIC
                  </span>
                </div>
              ))}            
            </div>
            <div className="flex flex-col gap-4">   
              <label className="text-sm font-semibold">Facebook</label>
              <input
                className={`text-white border-b border-white outline-none p-3 rounded-lg w-[400px] ${
                  userData.fb ? 'bg-transparent' : 'bg-[#3F3F3F]'
                }`}
                type="text"
                id="fb"
                name="fb"
                placeholder="Your Facebook"
                value={userData.fb}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-4">   
              <label className="text-sm font-semibold">Twiter</label>
              <input
                className={`bg-[#3F3F3F] text-white border-b border-white outline-none p-3 rounded-lg w-[400px] ${
                  userData.twt ? 'bg-transparent' : 'bg-[#3F3F3F]'
                }`}
                type="text"
                id="twt"
                name="twt"
                placeholder="yourtwt"
                value={userData.twt}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-4">   
              <label className="text-sm font-semibold">Instagram</label>
              <input
                className={`bg-[#3F3F3F] text-white border-b border-white outline-none p-3 rounded-lg w-[400px] ${
                  userData.ig ? 'bg-transparent' : 'bg-[#3F3F3F]'
                }`}
                type="text"
                id="ig"
                name="ig"
                placeholder="yourinstagram"
                value={userData.ig}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-4">   
              <label className="text-sm font-semibold">YouTube</label>
              <input
                className={`bg-[#3F3F3F] text-white border-b border-white outline-none p-3 rounded-lg w-[400px] ${
                  userData.yt ? 'bg-transparent' : 'bg-[#3F3F3F]'
                }`}
                type="text"
                id="yt"
                name="yt"
                placeholder="Your Youtube Channel"
                value={userData.yt}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-col gap-4">   
              <label className="text-sm font-semibold">Twitch</label>
              <input
                className={`bg-[#3F3F3F] text-white border-b border-white outline-none p-3 rounded-lg w-[400px] ${
                  userData.twitch ? 'bg-transparent' : 'bg-[#3F3F3F]'
                }`}
                type="text"
                id="twitch"
                name="twitch"
                placeholder="yourtwitch"
                value={userData.twitch}
                onChange={handleInputChange}
              />
            </div>
            <Button text="Simpan" onClick={handleEditUser} />
          </div>
          <div className="space-y-8 w-1/3">
            <h1 className="text-[32px] text-center my-8">Preview Halaman</h1>
            <div className="bg-[#313131] rounded-2xl ">
              <div className="bg-[url('/assets/forest.png')] p-8 bg-no-repeat rounded-2xl" style={{ backgroundSize: '100% auto' }}>
                <div className="space-y-4 py-6">
                  <div className="w-full h-6 bg-[#5A5A5A]"></div>
                  <div className="w-full h-6 bg-[#5A5A5A]"></div>
                  <div className="flex flex-wrap gap-2 justify-center">
                  {userData.quickAmount?.map((value, index) => (
                    <input key={index}
                      className="bg-[#69E07D] text-black p-4 rounded-lg text-sm font-semibold cursor-default text-center w-[150px]"
                      type="text"
                      id={`quickAmount-${index}`}
                      name='quickAmount'
                      placeholder={`Amount ${index + 1}`}
                      value={`MATIC ${value}`}
                      readOnly
                    />
                  ))}
                  </div>
                  <div className="w-full h-6 bg-[#5A5A5A]"></div>
                  <div className="w-full h-6 bg-[#5A5A5A]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilLayout;