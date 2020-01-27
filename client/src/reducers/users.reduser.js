import { ADD_USER } from '../actions';

const users = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload
    default:
      return state
  }
}

export default users;