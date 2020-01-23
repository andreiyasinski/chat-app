import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import io from 'socket.io-client';

let socket;

const Container = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: #1A1A1D;
`;

const InnerContainer = styled.div`
  min-width: 300px;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  color: white;
  font-size: 2.5em;
  padding-bottom: 10px;
  border-bottom: 2px solid white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const JoinInput = styled.input`
  margin-bottom: 20px;
  border-radius: 0;
  padding: 15px 20px;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979FF;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
`;

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:5000';

  const history = useHistory();

  const handleSubmit = (e) => {
    if (!name || !room) {
      e.preventDefault(); 
    } else {
      e.preventDefault();
      socket = io(ENDPOINT);
      socket.emit('checkUserName', {name, room}, (e) => {
        console.log(e);
        socket.emit('dissconect');
        socket.off();
        if (!e) {
          history.push(`/chat?name=${name}&room=${room}`)
        }
      });
    }
  }

  return (
    <Container>
      <InnerContainer>
        <Heading>Join</Heading>
        <Form onSubmit={handleSubmit}>
          <JoinInput placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
          <JoinInput placeholder="Room" type="text" onChange={(e) => setRoom(e.target.value)} />
          <Button type="submit">Sign In</Button>
        </Form>
      </InnerContainer>
    </Container>
  )
}

export default Join;

// запрос на авторизацию вынести из сокетов в обычный ajax запрос
// redux  стор сделать для мессаджей и онлайн юзеров
// загрузка картинок и файлов
// отображать картинки в чате
// https://ru.wikipedia.org/wiki/Redis
// рандомить картинку юзеру
