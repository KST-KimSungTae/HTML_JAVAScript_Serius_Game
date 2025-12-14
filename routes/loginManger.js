const loggedInUsers = new Map();

module.exports = {
    addUser: (userId) => loggedInUsers.set(userId, true),
    removeUser: (userId) => loggedInUsers.delete(userId),
    hasUser: (userId) => loggedInUsers.has(userId),
};
