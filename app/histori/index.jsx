"use client";

import React, { useState, useEffect, useContext } from 'react';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import { ContractContext } from '../../context/contractContext';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

const HistoriLayout = () => {
  const contractContext = useContext(ContractContext);
  const { getIncomingTransaction, getOutgoingTransaction, allIncomingTrx, allOutgoingTrx } = contractContext;
  const allTransactions = [...allIncomingTrx, ...allOutgoingTrx];

  useEffect(() => {
    getOutgoingTransaction();
  }, [getOutgoingTransaction]);

  useEffect(() => {
    getIncomingTransaction();
  }, [getIncomingTransaction]);

  allTransactions.sort((a, b) => {
    const dateA = new BigNumber(a.transactionDate._hex).toNumber();
    const dateB = new BigNumber(b.transactionDate._hex).toNumber();
    return dateB - dateA;
  });

  return (
    <div className="min-h-screen mb-16">
      <Navbar />
      <div className="flex flex-col items-center">
        <header className="mt-20 mb-16">
          <div className="flex gap-8 items-center">
            <div className="text-white space-y-4">
              <h1 className="text-[64px] text-center">Dukungan Masuk & Keluar</h1>
            </div>
          </div>
        </header>
        <main>
          <div className="bg-transparent text-white">
            <table className="w-full">
              <thead className="uppercase text-xl">
                <tr>
                  <th className="py-4 px-8 font-normal text-left">Tanggal</th>
                  <th className="py-4 px-8 font-normal text-left">Nominal</th>
                  <th className="py-4 px-8 font-normal text-left">Pengirim</th>
                  <th className="py-4 px-8 font-normal text-left">Penerima</th>
                  <th className="py-4 px-8 font-normal text-left">Untuk</th>
                  <th className="py-4 px-8 font-normal text-left">Pesan</th>
                  <th className="py-4 px-8 font-normal text-left">Keterangan</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {allTransactions.map((value, idx) => {
                  console.log(value)
                  const bigNumberValue = new BigNumber(value?.transactionDate._hex);
                  const unixTimestamp = bigNumberValue.toNumber();
                  const date = new Date(unixTimestamp * 1000);

                  const isIncoming = allIncomingTrx.includes(value);
                  const isOutgoing = allOutgoingTrx.includes(value);

                  const sender = `${value?.sender.substring(0, 5)}....${value?.sender.slice(-5)}`;
                  const receiver = `${value?.receiver.substring(0, 5)}....${value?.receiver.slice(-5)}`;

                  return (
                    <tr key={idx}>
                      <td className="py-4 px-8">{date?.toLocaleString()}</td>
                      <td className="py-4 px-8">{ethers.utils.formatEther(value.amount)}</td>
                      <td className="py-4 px-8">
                        <a
                          href={`https://mumbai.polygonscan.com/address/${value?.sender}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-400"
                        >
                          {sender}
                        </a>
                      </td>
                      <td className="py-4 px-8">
                        <a
                          href={`https://mumbai.polygonscan.com/address/${value?.receiver}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline text-blue-400"
                        >
                          {receiver}
                        </a>
                      </td>
                      <td className="py-4 px-8">{value?.userName}</td>
                      <td className="py-4 px-8">{value?.message}</td>
                      <td className={`py-4 px-8 ${isIncoming ? 'text-green-500' : isOutgoing ? 'text-red-500' : ''}`}>
                        {isIncoming ? 'Pemasukan' : isOutgoing ? 'Pengeluaran' : ''}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HistoriLayout;
