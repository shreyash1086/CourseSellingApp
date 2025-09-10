const express = require("express")
const Router = express.Router;

const userRouter = Router(); //instance of router class

userRouter.post('/signup', (req, res) => {
    res.json({
        message: "Signup Endpoint"
    })
})

userRouter.post('/signup', (req, res) => {
    res.json({
        message: "Signin Endpoint"
    })
})


userRouter.get('/purchases', (req, res) => { //give user courses
    res.json({
        message: "Signin Endpoint"
    })
})

module.exports = {
    userRouter:userRouter
}