import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactEmoji from 'react-emoji';

const MessageContainer  = styled.div`
  display: flex;
  padding: 0 15px;
  margin-top: 3px;
  justify-content: ${props => props.justifyEnd ? "flex-end" : "flex-start"};
`;

const SentText  = styled.p`
  display: flex;
  align-items: center;
  font-family: Helvetica;
  color: #828282;
  letter-spacing: 0.3px;
  ${ props => props.pr10 ? "padding-right: 10px" : "padding-left: 10px"};
`;

const MessageBox  = styled.div`
  border-radius: 20px;
  padding: 5px 20px;
  color: white;
  display: inline-block;
  max-width: 80%;
  background: ${props => props.backgroundBlue ? "#2979FF" : "#dedede"};
`;

const MessageText  = styled.p`
  width: 100%;
  letter-spacing: 0;
  float: left;
  font-size: 1.1em;
  word-wrap: break-word;
  color: ${props => props.colorWhite ? "#fff" : "#353535"};
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 300px;
`;

const Message = ({ message: {user, text, image}, name }) => {
  const [isSentByCurrentUser, setIsSentByCurrentUser] = useState(false);

  useEffect(() => {
    if(user === name.trim()) {
      setIsSentByCurrentUser(true);
    }
  }, [setIsSentByCurrentUser, name, user])

  if (isSentByCurrentUser) {
    return (
      <MessageContainer justifyEnd>
        <SentText pr10>{name.trim()}</SentText>
        <MessageBox backgroundBlue>
          <MessageText colorWhite>
            {ReactEmoji.emojify(text)}
          </MessageText>
          {image && <Image src={image} alt="attached" />}
        </MessageBox>
      </MessageContainer>
    )
  }

  return (
    <MessageContainer>
      <MessageBox>
        <MessageText>{ReactEmoji.emojify(text)}</MessageText>
        {image && <Image src={image} alt="attached" />}
      </MessageBox>
      <SentText>{user}</SentText>
    </MessageContainer>
  )
};

export default Message;