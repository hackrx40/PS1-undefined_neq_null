'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import { Login } from '../Components/Login';
import './css/page.css';

export default function Home() {
  return (
    <main>
      <div className='illustration-container'>
        <h1>Health Aid</h1>
        <Image
          width={600}
          height={600}
          src="/images/illustration.jpg"
          alt="illustration"
        />
      </div>
      <Login />
    </main>
  );
}
