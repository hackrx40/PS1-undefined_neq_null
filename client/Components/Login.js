import { useEffect } from 'react';
import firebase from '../lib/firebaseClient';
import 'firebase/compat/auth';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();

  // Function to handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);
      // Redirect to the home page after successful sign-in
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
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
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
