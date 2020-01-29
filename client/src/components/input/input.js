import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const InputArea = styled.input`
  border: none;
  border-radius: 0;
  padding: 15px;
  width: 80%;
  font-size: 1.2em;
  outline: none;
`;

const SendButton  = styled.button`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  background: #2979FF;
  padding: 15px;
  display: inline-block;
  border: none;
  width: 20%;
`;

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <Form>
      <InputArea
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' ? sendMessage(e) : null}
      />
      <SendButton onClick={ e => sendMessage(e) }>SEND</SendButton>
    </Form>
  );
};

export default Input;