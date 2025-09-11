const express = require("express");
const { userModel } = require("../db");
const jwt = require("jsonwebtoken")
const Router = express.Router;
require("dotenv").config();
const {userMiddleware} = require("../middleware/user")
const userSecret = process.env.SECRET;


const userRouter = Router(); //instance of router class

userRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    try {
        await userModel.create({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        })
        res.json({
            message: "Signup point successfull"
        })
    } catch (error) {
        res.json({
            message : 'Error at signup point for the user'
        })
    }

})

userRouter.post('/signin',async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await userModel.findOne({
            email: email,
            password: password
        })

        if (!user) {
            res.json("user not found")
            return
        }

        if (user.email == email && user.password == password) {
            const token = jwt.sign({ _id: user._id }, userSecret)

            res.json({
                token: token,
                message : "Successfull at sing in for the user"
            })

        }
    } catch (error) {
        console.log(error)
        res.json({
            message: "Error at sing in point for the user"
        })
    }
})


userRouter.get('/purchases', userMiddleware, (req, res) => { //give user courses
    res.json({
        message: "What are the various causes for error in this field"
    })
})

module.exports = {
    userRouter: userRouter
}