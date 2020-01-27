import { ADD_MESSAGE } from '../actions';

const messages = (state = [], action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        action.payload
      ]
    default:
      return state
  }
}

export default messages;