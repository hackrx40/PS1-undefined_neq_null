'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import firebase from '../../lib/firebaseClient';
import 'firebase/compat/auth';
import { useRouter } from 'next/navigation';
import { Logout } from '../../Components/Login';

import MainChat from '../../Components/mainChat.js';

export default function Home() {
  const router = useRouter();
  const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    // Check if the user is already signed in, redirect to the home page
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MainChat />
        <div style={{ position: 'fixed', right: '15px', top: '15px' }}>
          <Logout />
        </div>
      </div>
    </main>
  );
}
