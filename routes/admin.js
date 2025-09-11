const { Router } = require("express")
const { adminMiddleware } = require("../middleware/admin.js")
const adminRouter = Router();
const { adminModel } = require("../db.js");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const SECRET = process.env.SECRET;

adminRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

    try {
        await adminModel.create({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        })

        res.json({
            message: "Signup Endpoint"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Error at signup point"
        })
    }
})

adminRouter.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {

        const user = await adminModel.findOne({
            email: email,
            password: password
        })

        if (!user) {
            res.json("admin not found")
            return
        }

        if (user.password == password && user.email == email) {
            const token = jwt.sign({ _id: user._id.toString() }, SECRET);
            // console.log(user._id)
            localStorage.setItem("token", token);
            res.json({
                token:token,
                message: "Signin End point Successfull"
            })
        } else {
            res.json({
                message : "Error in signin point"
            })
        }

    } catch (error) {
        console.log("Error in signin point", error)
        res.json({
            message: "Error in sign in point"
        })
    }
})

adminRouter.post('/', adminMiddleware, (req, res) => {
    res.json({
        message: "admin end point what and why i dont know"
    })
})

adminRouter.put('/', (req, res) => {
    res.json({
        message: "Signin Endpoint"
    })
})

adminRouter.get('/bulk',  (req, res) => {
    res.json({
        message: "Signin Endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}