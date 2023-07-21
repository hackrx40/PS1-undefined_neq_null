'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import firebase from '../../lib/firebaseClient';
import 'firebase/compat/auth';
import { useRouter } from 'next/navigation';
import { Logout } from '../../Components/Login';

export default function Home() {
  const router = useRouter();

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
      <div>
        Chat Page
        <Logout />
      </div>
    </main>
  );
}
