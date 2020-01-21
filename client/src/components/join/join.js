import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const Form = styled.div`
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

  return (
    <Container>
      <InnerContainer>
        <Heading>Join</Heading>
        <Form>
          <JoinInput placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
          <JoinInput placeholder="Room" type="text" onChange={(e) => setRoom(e.target.value)} />
          <Link
            onClick={e => (!name || !room) ? e.preventDefault() : null}
            to={`/chat?name=${name}&room=${room}`}
          >
            <Button type="submit">Sign In</Button>
          </Link>
        </Form>
      </InnerContainer>
    </Container>
  )
}

export default Join;
