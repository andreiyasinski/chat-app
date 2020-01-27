import { GET_ONLINE_USERS } from '../actions';

const users = (state = [], action) => {
  switch (action.type) {
    case GET_ONLINE_USERS:
      return action.payload
    default:
      return state
  }
}

export default users;