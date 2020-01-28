import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import io from 'socket.io-client';
import styled from 'styled-components';

import { getOnlineUsers, addMessage } from '../../actions';

import InfoBar from '../infoBar/infoBar';
import Input from '../input/input';
import Messages from '../messages/messages';
import OnlineUsers from '../onlineUsers/onlineUsers';
import addFileImg from '../../assets/paperclip.svg';

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

const InputWrapper = styled.div`
  display: flex;
`;

const AddInput = styled.input`
  display: none;
`;

const AddImage = styled.img`
  height: 40px;
  margin-top: 5px;
  cursor: pointer;
`;

const Chat = ({ location, getOnlineUsers, users, addMessage, messages }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
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
      //setMessages([...messages, message ]);
      addMessage(message);
    });

    socket.on('roomData', (roomData) => {
      getOnlineUsers(roomData.users);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [addMessage, getOnlineUsers])

  const sendMessage = (e) => {
    e.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  let fileInput = React.createRef();

  return (
    <OuterContainer>
      <Container>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <InputWrapper>
          <AddInput type="file" ref={fileInput} />
          <AddImage onClick={e => fileInput.current.click()} src={addFileImg} style={{height: 40}} alt="add file" />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </InputWrapper>
      </Container>
      <OnlineUsers onlineUsers={users} />
    </OuterContainer>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    messages: state.messages
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOnlineUsers: (users) => {
      dispatch(getOnlineUsers(users))
    },
    addMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
