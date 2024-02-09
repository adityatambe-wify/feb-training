// userRoutes.js
const express = require("express");
const UserModel = require("../models/UserModel");
const fs = require("fs");

const userRouter = express.Router();
const userModel = new UserModel();

function logUserActivity(activity) {
    fs.appendFile("users.txt", `${activity} || Timestamp: ${new Date()}\n`, (err) => {
        if (err) throw err;
    });
}

userRouter.post("/create-user", (req, res) => {
    const newUser = userModel.createUser(req.body);
    logUserActivity(`Created user: ${newUser.name} || contact:${newUser.contact} || age:${newUser.age}`);
    res.status(201).json({"data":newUser, "msg":"User Created"});
});

userRouter.get("/users", (req, res) => {
    const users = userModel.getUsers();
    logUserActivity("Fetched all users");
    res.status(200).json(users);
});

userRouter.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = userModel.getUserById(userId);
   
    if (!user) {
        logUserActivity(`User not found with ID: ${userId}`);
        return res.status(404).json({ error: "User not found" });
    }
    logUserActivity(`Fetched user with ID: ${userId}|| Username: ${user.name} || contact:${user.contact} || age:${user.age}`);
    res.status(200).json(user);
});

userRouter.put("/users/:id", (req, res) => {
    const userId = req.params.id;
    const updatedUserData = req.body;
    const userUpdated = userModel.updateUser(userId, updatedUserData);
    if (!userUpdated) {
        logUserActivity(`User not found with ID: ${userId}`);
        return res.status(404).json({ error: "User not found" });
    }
    logUserActivity(`Updated user with ID: ${userId}`);
    res.status(200).json({ message: "User updated successfully" });
});

userRouter.delete("/delete-users/:id", (req, res) => {
    const userId = req.params.id;
    userModel.deleteUser(userId);
    logUserActivity(`Deleted user with ID: ${userId}`);
    res.status(200).json({ message: "User deleted successfully" });
});

module.exports = userRouter;
