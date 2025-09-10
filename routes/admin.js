const { Router } = require("express")
const { adminModel } = require("../db.js");
const adminRouter = Router();

// adminRouter.use(adminMiddleware)

adminRouter.post('/signup', (req, res) => {
    res.json({
        message: "Signup Endpoint"
    })
})

adminRouter.post('/signup', (req, res) => {
    res.json({
        message: "Signin Endpoint"
    })
})

adminRouter.post('/course', (req, res) => {
    res.json({
        message: "Signin Endpoint"
    })
})

adminRouter.put('/course', (req, res) => {
    res.json({
        message: "Signin Endpoint"
    })
})

adminRouter.get('/course/bulk', (req, res) => {
    res.json({
        message: "Signin Endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}