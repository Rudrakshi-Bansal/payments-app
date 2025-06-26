const express = require('express');
const userRouter = express.Router();

const { User, Account} = require('../db');

const {signUp, signIn, updateUser} = require('../types');
const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../config');
const {authMiddleWare} = require('../middlewares');

userRouter.post('/signup', async (req, res) => {
    const {success} = signUp.safeParse(req.body);
    if (!success) {
        return res.status(411).json({ error: 'Invalid input' });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(411).json({ error: 'Username already exists' });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    });
    const userId = user._id;
    const token = jwt.sign({ userId }, JWT_SECRET);

    await Account.create({
        userId: userId,
        balance: 1000,
    });

    res.json({
        message: 'User created successfully',
        token:token
        
    });
})

userRouter.post("/signin", async(req, res) => {
    const { success } = signIn.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid Inputs",
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username,
        password: req.body.password,
    });

    if (existingUser) {
        const token = jwt.sign({
            userId: existingUser._id,
        }, JWT_SECRET);
        return res.status(200).json({
            token: token,
            firstName: existingUser.firstname,
            userId: existingUser._id,
        });
    }

    return res.status(411).json({
        message: "Wrong Username/Password",
    });
});

userRouter.put("/update", authMiddleWare, async (req, res) => {
    const { success } = updateUser.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Invalid Inputs",
        });
    }

    await User.updateOne(
        { _id: req.userId },
        { $set: req.body }
    );

    return res.status(200).json({
        message: "Updated Details",
    });
});

userRouter.get("/bulk", async (req, res) => {
    const filter  = req.query.filter || '';

    const users = await User.find({
    $or : [{
            firstname: { $regex: filter }},
           {
            lastname: { $regex: filter}
    }]
})
    res.json({
        user: users.map((user) => ({
            _id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname
        })
    )
    })
});

module.exports = userRouter

