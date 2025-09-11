const express = require("express");
const bcrypt = require("bcrypt")
const { userModel, purchaseModel } = require("../db");
const jwt = require("jsonwebtoken")
const Router = express.Router;
require("dotenv").config();
const {userMiddleware} = require("../middleware/user")
const userSecret = process.env.SECRET_USER;


const userRouter = Router(); //instance of router class

userRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    const hashedPass = await bcrypt.hash(password,3);

    try {
        await userModel.create({
            email: email,
            password: hashedPass,
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
        })

        const passMatch = await bcrypt.compare(password, user.password)

        console.log(passMatch)

        if (!user) {
            res.json("user not found")
            return
        }

        if (passMatch) {
            const token = jwt.sign({ _id: user._id.toString() }, userSecret)

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


userRouter.get('/purchases', userMiddleware, async (req, res) => { //give user courses

    const userId = req.user_id;

    try {
        const userCourses = await purchaseModel.find({
            userId: userId
        })

        res.json({
            userCourses: userCourses,
            message: "here is the list of all the courses you baught"
        })
    } catch (error) {
        res.status(403).json({
            message : "error at user purchases"
        })
    }
})

module.exports = {
    userRouter: userRouter
}