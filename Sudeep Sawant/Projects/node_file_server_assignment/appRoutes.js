const express = require('express');
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, './db/users.txt');

const User = require("./userModel")
const router = express.Router();

// create file if not exist
if (!fs.existsSync(dataFilePath)) {
    console.log("File not found. Creating users.txt file.");
    fs.writeFileSync(dataFilePath, '', 'utf8');
}

const getUserFromFile = () => {
    try {
        const data = fs.readFileSync(dataFilePath, "utf8");        
        if (!data) {
            return [];
        }
        return JSON.parse(data);
        
    } catch(error) {
            console.error('Error reading file:', error);
            return [];
    }
}

const writeUserToFile = (users) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2)); 
        
    } catch (error) {
        console.error('Error writing file:', error);
    }
}


let users = getUserFromFile();

router.get("/users", (req, res)=>{
    const users = getUserFromFile();
    console.log(users)
    res.send(users)
})

router.post("/newUser", (req, res)=>{
    const { name, phone, age, created_on } = req.body;

    // Take previous record and make id
    const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1; 
    const newUser = new User(newUserId, name, phone, age, new Date().toISOString());
    users.push(newUser);
    writeUserToFile(users, newUser);
    res.json("user created");

})


router.get("/user/:id", (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    res.json(user);
});



router.put("/update/:id", (req, res)=>{
    const user = users.find(user => user.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User not found.');
    const { id, name, phone } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;

    writeUserToFile(users);
    res.json(user);
    // res.send("update user")
})

router.delete("/delete/:id", (req, res)=>{
    const userIndex = users.findIndex(user => user.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('User not found.');
    users.splice(userIndex, 1);
    writeUserToFile(users);
    res.send('User deleted successfully');
})


module.exports = router;


