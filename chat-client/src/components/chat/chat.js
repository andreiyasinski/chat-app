import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components';

import InfoBar from '../infoBar/infoBar';
import Input from '../input/input';
import Messages from '../messages/messages';
import OnlineUsers from '../onlineUsers/onlineUsers';

let socket;

const OuterContainer   = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1A1A1D;
`;

const Container    = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 8px;
  height: 60%;
  min-width: 300px;
  width: 40%;
`;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, (e) => {
      console.log(e)
    });

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    //console.log(messages)
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', (roomData) => {
      setOnlineUsers(roomData.users);
    });

  }, [messages, onlineUsers])

  //function for sending messages

  const sendMessage = (e) => {
    e.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  return (
    <OuterContainer>
      <Container>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </Container>
      <OnlineUsers onlineUsers={onlineUsers} />
    </OuterContainer>
  )
}

export default Chat;
