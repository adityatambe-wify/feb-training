// dataAccess/users.js
const User = require('../models/UserModel');

let users = [];

function createUser(username, phone_no, age) {
    const id = users.length + 1;
    const newUser = new User(id, username, phone_no, age);
    users.push(newUser);
    return newUser;
}

function getUserById(userId) {
    return users.find(user => user.id === userId);
}

function getUserByUsername(username) {
    return users.find(user => user.username === username);
}

function updateUser(userId, newData) {
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...newData };
        return users[userIndex];
    }
    return null;
}

function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
}
function fetchUsers(){
    return users
}

module.exports = {
    createUser,
    getUserById,
    getUserByUsername,
    updateUser,
    deleteUser,
    fetchUsers
};
