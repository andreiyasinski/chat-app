import React from 'react';
import styled from 'styled-components';

const Container  = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 80%;
  margin-left: 10px;
  border-radius: 5px;
  width: 200px;
  /* padding: 0 15px 15px 15px; */
  overflow: hidden;
`;

const Users  = styled.ul`
  height: 100%;
  overflow: auto;
`;

const User  = styled.li`
  list-style-type: none;
  padding: 10px 15px;
`;

const HeaderContainer  = styled.div`
  display: flex;
  flex: none;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: #2979FF;
  color: #fff;
`;

const OnlineUsers = ({ onlineUsers }) => {
  return (
    <Container>
      <HeaderContainer>
        <h3>{onlineUsers.length} online users</h3>
      </HeaderContainer>
      <Users>
        {
          onlineUsers.map(user => {
            return (
              <User key={user.id}>{user.name}</User>
            )
          })
        }
      </Users>
    </Container>
  );
};

export default OnlineUsers;