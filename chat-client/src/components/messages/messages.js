import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import styled from 'styled-components';
import Message from '../message/message';

const MessagesContainer  = styled(ScrollToBottom)`
  padding: 10px 0;
  overflow: auto;
  flex: auto;
  height: 100%;
`;

const Messages = ({ messages, name }) => {
  return (
    <MessagesContainer>
      {
        messages.map((message, index) => (
          <div key={index}>
            <Message message={message} name={name}/>
          </div>
        ))
      }
    </MessagesContainer>
  );
};

export default Messages;