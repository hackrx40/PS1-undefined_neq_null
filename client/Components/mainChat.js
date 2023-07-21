import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const TextMsg = ({ text, role }) => {
  return (
    <div style={{}}>
      <p
        style={
          role == 'User'
            ? {
                width: 'fit-content',
                textAlign: 'right',
                backgroundColor: '#2563EB',
                color: 'whitesmoke',
                position: 'relative',
                left: '100%',
                transform: 'translateX(-100%)',
              }
            : {
                width: 'fit-content',
                textAlign: 'left',
                backgroundColor: '#D1D5DB',
              }
        }
      >
        {text}
      </p>
    </div>
  );
};

const MainChat = () => {
  const prodURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ margin: '1rem' }}>Chat ID: </div>
      <div
        style={{
          height: '75vh',
          width: '40vw',
          border: '2px solid red',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextMsg text="Hello from User" role="User" />
        <TextMsg text="Bot says Heyaa" role="Bot" />
        <TextMsg text="Hello from User" role="User" />
        <TextMsg text="Bot says Heyaa" role="Bot" />
        <TextMsg text="Hello from User" role="User" />
        <TextMsg text="Bot says Heyaa" role="Bot" />
      </div>
    </div>
  );
};

export default MainChat;
