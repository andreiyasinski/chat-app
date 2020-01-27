import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components';

import { getOnlineUsers } from '../../actions';

import InfoBar from '../infoBar/infoBar';
import Input from '../input/input';
import Messages from '../messages/messages';
import OnlineUsers from '../onlineUsers/onlineUsers';

let socket;

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1A1A1D;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #FFFFFF;
  border-radius: 8px;
  height: 60%;
  min-width: 300px;
  width: 40%;
`;

const Chat = ({ location, getOnlineUsers, users }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  //const [onlineUsers, setOnlineUsers] = useState([]);
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', {name, room}, (e) => {

    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message ]);
    });

    socket.on('roomData', (roomData) => {
      getOnlineUsers(roomData.users);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [messages, getOnlineUsers, users])

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
      <OnlineUsers onlineUsers={users} />
    </OuterContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOnlineUsers: (users) => {
      dispatch(getOnlineUsers(users))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
