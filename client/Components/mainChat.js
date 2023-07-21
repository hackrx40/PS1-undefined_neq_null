import { useEffect, useState } from 'react';
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

  const [currMessage, setCurrMessage] = useState('');
  const uid = localStorage.getItem('uid');
  const cid = localStorage.getItem('cid');

  const handleMessageSend = () => {
    const data = {
      uid,
      cid,
      message: currMessage,
    };

    axios
      .post(`${prodURL}api/v1/chat/msg`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          height: '80vh',
          width: '40vw',
          border: '2px solid grey',
          borderRadius: '10px',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <TextMsg text="Hello from User" role="User" />
        <TextMsg text="Bot says Heyaa" role="Bot" />
        <TextMsg text="Hello from User" role="User" />
        <TextMsg text="Bot says Heyaa" role="Bot" />
        <TextMsg text="Hello from User" role="User" />
        <TextMsg text="Bot says Heyaa" role="Bot" />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <input
            value={currMessage}
            style={{
              width: '80%',
              padding: '10px',
              marginRight: '5px',
            }}
            placeholder="Type Here..."
            onChange={(e) => {
              setCurrMessage(e.target.value);
            }}
          />
          <button style={{ flex: 1 }} onClick={handleMessageSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainChat;