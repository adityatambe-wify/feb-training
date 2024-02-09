// routes/users.js
const express = require('express');
const router = express.Router();
const {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    fetchUsers
} = require('../functions/userFn');

// Retrive all users
router.get('/users', (req, res) => {
    let users = fetchUsers()
    res.json(users);
});
// Create a new user
router.post('/create-user', (req, res) => {
    const { username, phone_no, age } = req.body;
    const newUser = createUser(username, phone_no, age);
    res.status(201).json(newUser);
});

// Retrieve a user by ID
router.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = getUserById(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Update a user
router.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const newData = req.body;
    const updatedUser = updateUser(userId, newData);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Delete a user
router.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
});

module.exports = router;
