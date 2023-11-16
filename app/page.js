"use client";

import React, {useContext, useEffect} from 'react';
import HomeLayout from '@/home';
import LoginLayout from '@/login';
import { AuthContext } from '../context/authContext';

export default function Home() {
  const authContext = useContext(AuthContext);
  const isLogged = authContext?.isLogged;
  const loginStatus = authContext?.loginStatus;

  useEffect(() => {
    if (loginStatus) {
      loginStatus();
    }
  }, []);

  return (
    <main className="md:px-10">
      {isLogged ?
      <HomeLayout />
      :
      <LoginLayout />
      }
    </main>
  )
}
