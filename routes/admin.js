const { Router } = require("express")
const { adminMiddleware } = require("../middleware/admin.js")
const bcrypt = require("bcrypt")
const adminRouter = Router();
const { adminModel, courseModel } = require("../db.js");
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

adminRouter.post('/', adminMiddleware, async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const creatorId = req.admin_id;
    const imageUrl = req.body.imageUrl;

    try {
        await courseModel.create({
            title: title,
            description: description,
            price: price,
            creatorId: creatorId,
            imageUrl: imageUrl
        })

        const courseId = await courseModel.findOne({
            title: title,
            description: description,
            price: price,
            creatorId: creatorId
        })

        res.json({
            courseId: courseId._id,
            message: "course created successfully"
        })
    } catch (error) {
        res.status(403).json({
            message  : "This is error at create course router "
        })
    }
})

adminRouter.put('/', adminMiddleware ,async (req, res) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const courseId = req.body.courseId;
    const creatorId = req.admin_id;


    try {
        await courseModel.findByIdAndUpdate(courseId, {
            title: title,
            description: description,
            price: price,
            imageUrl: imageUrl,
            creatorId: creatorId
        })
        res.json({
            message: "Updated the course successfully"
        })
    } catch (error) {
        res.status(403).json({
            message : "error present in the update course route"
        })
    }
})

adminRouter.get('/bulk',adminMiddleware, async (req, res) => {
    const adminId = req.admin_id;

    const bulk = await courseModel.find({
        creatorId: adminId
    })

    console.log(bulk)

    res.json({
        bulk:bulk,
        message: "Signin Endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}