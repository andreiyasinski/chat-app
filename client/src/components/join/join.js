import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// import io from 'socket.io-client';

// let socket;

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
  border: none;
  padding: 15px 20px;
  width: 100%;
  background: ${props => props.isValid ? "#fff" : "#ffc4c4"};
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

const Title = styled.p`
  color: #90d1a7;
  font-weight: 600;
  font-family: Courier;
  position: absolute;
  left: 15px;
  top: 15px;
  font-size: 14px;
`;

const Join = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [isValidName, setIsValidName] = useState(true);
  const [isValidRoom, setIsValidRoom] = useState(true);

  const history = useHistory();

  const handleName = (e) => {
    setIsValidName(true);
    setName(e.target.value);
  }

  const handleRoom = (e) => {
    setIsValidRoom(true);
    setRoom(e.target.value);
  }

  const handleSubmit = async (e) => {
    if (!name || !room) {
      e.preventDefault();
      if (!name) {
        setIsValidName(false)
      };
      if (!room) {
        setIsValidRoom(false);
      };
    } else {
      e.preventDefault();
      axios.get(`http://localhost:5000/${name}/${room}`)
      .then(res => {
        !res.data.error ? history.push(`/chat?name=${name}&room=${room}`) : setIsValidName(false);
      });
    }
  }

  return (
    <Container>
      <Title>Wake up, Neo...</Title>
      <InnerContainer>
        <Heading>Join</Heading>
        <Form onSubmit={handleSubmit}>
          <JoinInput 
            placeholder="Name"
            type="text"
            onChange={handleName}
            isValid={isValidName}
          />
          <JoinInput
            placeholder="Room"
            type="text"
            onChange={handleRoom}
            isValid={isValidRoom}
          />
          <Button type="submit">Sign In</Button>
        </Form>
      </InnerContainer>
    </Container>
  )
}

export default Join;

// запрос на авторизацию вынести из сокетов в обычный ajax запрос +++
// redux стор сделать для мессаджей и онлайн юзеров +++
// загрузка картинок и файлов
// отображать картинки в чате
// https://ru.wikipedia.org/wiki/Redis
// рандомить картинку юзеру
