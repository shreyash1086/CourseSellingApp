const { Router } = require("express")
const { adminMiddleware } = require("../middleware/admin.js")
const bcrypt = require("bcrypt")
const adminRouter = Router();
const { adminModel } = require("../db.js");
const jwt = require("jsonwebtoken")
require("dotenv").config();
const SECRET = process.env.SECRET_ADMIN;

adminRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

    const hashedPass = await bcrypt.hash(password,4)

    try {
        await adminModel.create({
            email: email,
            password: hashedPass,
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

        const admin = await adminModel.findOne({
            email: email,
        })

        const passMatch = await bcrypt.compare(password, admin.password)

        console.log(passMatch)

        if (!admin) {
            res.json("admin not found")
            return
        }

        if (passMatch) {
            const token = jwt.sign({ _id: admin._id.toString() }, SECRET);

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