import React from 'react';
import styled from 'styled-components';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

const Container = styled.div`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: space-between;
  background: #2979FF;
  border-radius: 4px 4px 0 0;
  height: 50px;
  width: 100%;
`;

const LeftInnerContainer  = styled.div`
  flex: 0.5;
  display: flex;
  align-items: center;
  margin-left: 5%;
  color: white;
`;

const RightInnerContainer  = styled.div`
  display: flex;
  flex: 0.5;
  justify-content: flex-end;
  margin-right: 15px;
`;

const OnlineIcon   = styled.img`
  margin-right: 15px;
`;

const InfoBar = ({ room }) => {
  return (
    <Container>
      <LeftInnerContainer>
        <OnlineIcon src={onlineIcon} alt="online" />
      <h3>{room}</h3>
      </LeftInnerContainer>
      <RightInnerContainer>
        <a href="/"><img src={closeIcon} alt="close" /></a>
      </RightInnerContainer>
    </Container>
  )
};

export default InfoBar;