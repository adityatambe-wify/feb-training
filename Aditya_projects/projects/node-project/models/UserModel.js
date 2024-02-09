// UserModel.js
const fs = require("fs");

class UserModel {
  constructor() {
    this.dbFilePath = "db.json";
    this.counterFilePath = "counter.json";
    this.counter = this.loadCounter();
  }

  loadCounter() {
    try {
      const rawData = fs.readFileSync(this.counterFilePath, 'utf8');
      return JSON.parse(rawData).counter;
    } catch (error) {
      return 1; // Initialize counter if file doesn't exist
    }
  }

  saveCounter() {
    fs.writeFileSync(this.counterFilePath, JSON.stringify({ counter: this.counter }, null, 2));
  }

  getUsers() {
    const rawData = fs.readFileSync(this.dbFilePath, 'utf8');
    return JSON.parse(rawData).users;
  }

  getUserById(userId) {
    const users = this.getUsers();
    const user = users.find(user => user.id === parseInt(userId));
    return user;
}


  updateUser(userId, updatedUserData) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === parseInt(userId));

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedUserData };
      this.saveUsers(users);
      return true;
    }

    return false;
  }

  deleteUser(userId) {
    let users = this.getUsers();
    users = users.filter(user => user.id !== parseInt(userId));
    this.saveUsers(users);
  }

  saveUsers(users) {
    fs.writeFileSync(this.dbFilePath, JSON.stringify({ users }, null, 2));
  }

  getNextUserId() {
    const nextUserId = this.counter++;
    this.saveCounter();
    return nextUserId;
  }

  createUser(userData) {
    const userId = this.getNextUserId();
    const newUser = { id: userId, ...userData, createdAt: new Date() };
    this.saveUsers([...this.getUsers(), newUser]);
    return newUser;
  }
}

module.exports = UserModel;

models/User.js
