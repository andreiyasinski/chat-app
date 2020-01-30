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
import closeIconBlack from '../../assets/close_icon_black.png';

let socket;
let fileInput = React.createRef();

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
  height: 80%;
  min-width: 300px;
  width: 40%;
`;

const InputWrapper = styled.div`
  display: flex;
  border-top: 2px solid #D3D3D3;
`;

const AddInput = styled.input`
  display: none;
`;

const AddImage = styled.img`
  height: 32px;
  margin-top: 5px;
  cursor: pointer;
`;

const AttachedFile = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 35px;
  background: #e8e8e8;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DropFile = styled.img`
  margin-right: 15px;
  font-weight: 600;
  cursor: pointer;
  width: 15px;
  height: 15px;
`;

const FileName = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Chat = ({ location, getOnlineUsers, users, addMessage, messages }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');
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

    if(message || selectedImage) {
      socket.emit('sendMessage', {message, image: selectedImage}, () => setMessage(''));
    }
    fileInput.current.value = '';
    setSelectedImage(null);
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    setSelectedImageName(file.name);

    reader.onloadend = () => {
      setSelectedImage(reader.result);
    }
    reader.readAsDataURL(file);
  };

  const dropFile = () => {
    fileInput.current.value = '';
    setSelectedImage(null);
  }

  return (
    <OuterContainer>
      <Container>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        {
          selectedImage &&
          <AttachedFile>
            <DropFile onClick={dropFile} src={closeIconBlack} alt="close icon" />
            <FileName>{selectedImageName}</FileName>
          </AttachedFile>
        }
        <InputWrapper>
          <AddInput
            onChange={e => uploadImage(e)}
            type="file" ref={fileInput}
            accept="image/jpeg,image/png"
          />
          <AddImage
            onClick={() => fileInput.current.click()}
            src={addFileImg}
            alt="add file"
          />
          <Input
            message={message}
            setMessage={setMessage}
            sendMessage={sendMessage}
          />
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
