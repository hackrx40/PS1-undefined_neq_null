'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import firebase from '../../lib/firebaseClient';
import 'firebase/compat/auth';
import { useRouter } from 'next/navigation';
import { Logout } from '../../Components/Login';

import MainChat from '../../Components/mainChat.js';
import '../../Components/css/ToggleComponent.css';

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

  const handleResetChat = () => {
    localStorage.removeItem('cid');
    window.location.reload();
  };

  const ToggleComponent = () => {
    const [mayoClinicSelected, setMayoClinicSelected] = useState(false);
    const [drugsDotComSelected, setDrugsDotComSelected] = useState(false);

    // Load state from localStorage on component mount
    useEffect(() => {
      const mayoClinicSelectedValue =
        localStorage.getItem('mayoClinicSelected');
      const drugsDotComSelectedValue = localStorage.getItem(
        'drugsDotComSelected'
      );

      setMayoClinicSelected(mayoClinicSelectedValue === 'true');
      setDrugsDotComSelected(drugsDotComSelectedValue === 'true');
    }, []);

    // Save state to localStorage whenever it changes
    useEffect(() => {
      localStorage.setItem('mayoClinicSelected', mayoClinicSelected.toString());
    }, [mayoClinicSelected]);

    useEffect(() => {
      localStorage.setItem(
        'drugsDotComSelected',
        drugsDotComSelected.toString()
      );
    }, [drugsDotComSelected]);

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>Mayo Clinic:</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={mayoClinicSelected}
              onChange={() => setMayoClinicSelected((prev) => !prev)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span>Drugs.com:</span>
          <label className="toggle">
            <input
              type="checkbox"
              checked={drugsDotComSelected}
              onChange={() => setDrugsDotComSelected((prev) => !prev)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    );
  };

  // export default ToggleComponent;

  return (
    <main className="">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 'fit-content',
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <div style={{ display: 'flex', marginBottom: '5px' }}>
            <div style={{ margin: '5px 10px' }}>
              <button className="btn" onClick={handleResetChat}>
                Reset Chat
              </button>
            </div>
            <div style={{ margin: '5px 10px' }}>
              <Logout />
            </div>
          </div>
          <ToggleComponent />
        </div>
        <MainChat />
      </div>
    </main>
  );
}
