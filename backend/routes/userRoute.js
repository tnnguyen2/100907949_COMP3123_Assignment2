const express = require('express')
const userModel = require('../models/userModel')

let userRoutes = express.Router()

userRoutes.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ username: username });
        const existingEmail = await userModel.findOne({ email: email });

        if (existingUser && existingEmail) {
            return res.status(400).json({message: 'Username and Email are already taken'});
        }else if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        } else if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken' });
        }

        const newUser = new userModel({
            username,
            email,
            password
        });

        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send({ message: "Please enter credentials" });
    }
});
userRoutes.post('/login', async (req, res) => {
    //User login
    try {
        const {username, password} = req.body;
        const user = await userModel.findOne({username});
        if (!user || password !== user.password) {
            return res.status(401).json({status: false, message: "Invalid Username or Password"});
        }

        res.status(200).json({status: true, username: `${username}`, message: "User logged in successfully"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
});
module.exports = userRoutes