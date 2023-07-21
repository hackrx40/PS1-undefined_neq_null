import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import '../Components/css/Login.css';

const TextMsg = ({ text, sender }) => {
  const url = localStorage.getItem('avatarURL');
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px' }}>
      {sender == 'bot' ? (
        <div>
          <Image
            src="/images/bot-avatar.jpg"
            width={50}
            height={50}
            alt="avatar"
            style={{ borderRadius: '100%' }}
          />
        </div>
      ) : null}
      <p
        style={
          sender == 'user'
            ? {
                width: 'fit-content',
                maxWidth: '60%',
                textAlign: 'right',
                backgroundColor: '#CD6688',
                color: 'white',
                // position: 'relative',
                left: '100%',
                // transform: 'translateX(-100%)',
                padding: '10px',
                borderRadius: '5px',
                // justifySelf: 'flex-end',
                marginLeft: 'auto',
              }
            : {
                width: 'fit-content',
                maxWidth: '60%',
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
      {sender == 'user' ? (
        <div>
          <Image
            src={url}
            width={40}
            height={40}
            alt="avatar"
            style={{ borderRadius: '100%', marginLeft: '4px' }}
          />
        </div>
      ) : null}
    </div>
  );
};

const MainChat = () => {
  const prodURL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const [currMessage, setCurrMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const uid = localStorage.getItem('uid');
  const cid = localStorage.getItem('cid');

  useEffect(() => {
    console.log(cid);
    if (!cid) {
      return;
    }
    axios
      .get(`${prodURL}api/v1/chat/${cid}`)
      .then((res) => {
        console.log(res.data);
        setChatHistory(res.data.chat.msgs);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMessageSend = () => {
    setChatHistory((prev) => [
      ...prev,
      {
        content: currMessage,
        sender: 'user',
      },
    ]);

    const data = {
      uid,
      cid,
      message: currMessage,
    };
    setCurrMessage('');

    axios
      .post(`${prodURL}api/v1/chat/msg`, data)
      .then((res) => {
        // console.log(res.data.chat.msgs);
        localStorage.setItem('cid', res.data.chat._id);
        localStorage.setItem('uid', res.data.chat.userID);
        setChatHistory(res.data.chat.msgs);
      })
      .catch((err) => {
        console.log(err);
        setChatHistory((prev) => prev.slice(0, -1));
        alert('Encontered an error');
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && currMessage != '') {
      handleMessageSend();
    }
  };

  const bottomRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '15px',
      }}
    >
      <div style={{ margin: '0.5rem', color: '#CD6688' }}>
        <h2>Chat ID: {cid}</h2>
      </div>

      <div
        style={{
          height: '80vh',
          width: '60vw',
          border: '2px solid grey',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            overflowX: 'hidden',
            height: '85%',
          }}
        >
          {chatHistory.map((item, index) => {
            console.log(item);
            return (
              <TextMsg text={item.content} sender={item.sender} key={index} />
            );
          })}
          <div ref={bottomRef} />
        </div>

        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            height: '10%',
          }}
        >
          <input
            value={currMessage}
            style={{
              width: '80%',
              padding: '2px 5px',
              marginRight: '0',
              border: '2px solid gray',
              fontSize: '15px',
            }}
            placeholder="Type Here..."
            onChange={(e) => {
              setCurrMessage(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />
          <button
            style={{
              flex: 1,
              border: 'none',
              marginRight: '10px',
              // color: '#CD6688',
              fontSize: '16px',
            }}
            onClick={() => {
              if (currMessage != '') {
                handleMessageSend();
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainChat;
