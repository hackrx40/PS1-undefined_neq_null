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
                backgroundColor: '#CD6688',
                color: 'white',
                position: 'relative',
                left: '100%',
                transform: 'translateX(-100%)',
                padding: '10px',
                borderRadius: '5px',
              }
            : {
                width: 'fit-content',
                textAlign: 'left',
                backgroundColor: '#461959',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
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
        paddingBottom:'15px',
      }}
    >
      <div style={{ margin: '0.5rem', color: '#CD6688' }}>
        <h2>Chat ID:</h2>{' '}
      </div>
      <div
        style={{
          height: '75vh',
          width: '40vw',
          border: '2px solid grey',
          borderRadius: '10px',
          padding: '10px',
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
