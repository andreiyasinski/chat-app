import { combineReducers } from 'redux';
import users from './users.reduser';
import messages from './messages.reduser';

const chatApp = combineReducers({
  users,
  messages
})

export default chatApp;