import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  width: 100%;
`;

const InputArea = styled.textarea`
  border: none;
  border-radius: 0;
  padding: 15px;
  width: 80%;
  font-size: 1.2em;
  outline: none;
  resize: none;
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
  const handlePress = e => {
    if (e.charCode === 13 && e.ctrlKey) {
      setMessage(e.target.value + `\n`)
    };

    if (!e.shiftKey && e.key === 'Enter' ) {
      sendMessage(e);
    };
  }

  return (
    <Form>
      <InputArea
        rows="2"
        placeholder="Type a message..."
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={handlePress}
      />
      <SendButton onClick={e => sendMessage(e)}>SEND</SendButton>
    </Form>
  );
};

export default Input;