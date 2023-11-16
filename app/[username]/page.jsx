import React from 'react';
import DonasiLayout from './index';

export default function Donasi({params}) {
  const { username } = params;
  return (
    <main className="md:px-10">
      <DonasiLayout username={username} />
    </main>
  )
}
