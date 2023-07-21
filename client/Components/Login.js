import { useEffect } from 'react';
import firebase from '../lib/firebaseClient';
import 'firebase/compat/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import './css/Login.css';

const Login = () => {
  const router = useRouter();
  const prodUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      // Redirect to the home page after successful sign-in
      const { email, displayName, photoURL } = result.user;
      localStorage.setItem('email', email);
      localStorage.setItem('name', displayName);
      localStorage.setItem('avatarURL', photoURL);
      axios
        .post(`${prodUrl}api/v1/user/login`, { email })
        .then((res) => {
          if (!res.data.success) {
            router.push('/register');
          } else {
            // store jwt in local
            localStorage.setItem('token', res.data.token);
            router.push('/chat');
          }
        })
        .catch((err) => console.log(err));

      console.log('User Logged In');
      router.push('/chat');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  useEffect(() => {
    // Check if the user is already signed in, redirect to the home page
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        router.push('/chat');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <button className="btn" onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      // Redirect to the home page after successful logout
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

module.exports = { Login, Logout };
