const express = require("express")
require('dotenv').config();
const SECRET = process.env.SECRET_USER;
const jwt = require("jsonwebtoken")
const {userModel} = require("../db.js")

const userMiddleware =  async (req, res, next) => {
    const token = req.headers.token;
    const decode = jwt.verify(token, SECRET)
    const userId = decode._id;
    const user = await userModel.findById(userId)

    if (user) {
        console.log(user)
        console.log("verified")
        req.user_id = userId
        next()
    } else {
        res.status(403).json({
            message : "bad Request at user end point"
        })
    }
}

module.exports = {
    userMiddleware : userMiddleware
}