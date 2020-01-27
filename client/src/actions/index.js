export const GET_ONLINE_USERS = 'ADD_USER';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const getOnlineUsers = (users) => {
  return {
    type: GET_ONLINE_USERS,
    payload: users
  }
}

export const addMessage = (message) => {
  return {
    type: ADD_MESSAGE,
    payload: {
      text: message.text,
      user: message.user
    }
  }
}