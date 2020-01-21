const users = [];

const addUser = ({ id, name, room }) => {
  // name = name.trim().toLowerCase();
  // room = room.trim().toLowerCase();

  const nameProccesed = name.trim();
  const roomProccesed = room.trim();

  // const existingUser = users.find(user => user.room === room && user.name === name);

  const existingUser = users.find(user => (
    user.room.toLowerCase() === roomProccesed.toLowerCase()
    &&
    user.name.toLowerCase() === nameProccesed.toLowerCase())
  );

  if(existingUser) {
    return {
      error: { message: 'User name is taken' }
    }
  };

  const user = { id, name: nameProccesed, room: roomProccesed };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex(user => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

const getUser = (id) => users.find(user => user.id === id);

const getUsersInRoom = (room) => users.filter(user => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };