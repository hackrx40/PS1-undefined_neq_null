'use client';
import Image from 'next/image';
import { useEffect } from 'react';
import firebase from '../../lib/firebaseClient';
import 'firebase/compat/auth';
import { useRouter } from 'next/navigation';
import { Logout } from '../../Components/Login';
import UserForm from '../../Components/UserForm';
import './page.css'


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
      <div className="form-page-container">
        <div className="heading-container">
          <Image
          width={100}
          height={75}
            src="/images/chat logo.jpg"
            alt="illustration"
          />
          <h1>Chat Page</h1>
        </div>
        {/* In POP UP */}
        <UserForm />
        <Logout />
      </div>
    </main>
  );
}
