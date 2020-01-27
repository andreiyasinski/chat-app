export const ADD_USER = 'ADD_USER';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const getOnlineUsers = (users) => {
  return {
    type: ADD_USER,
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