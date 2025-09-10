const { Router } = require("express")

const courseRouter = Router();

courseRouter.post('/course/purchase', (req, res) => { //give user courses
    res.json({
        message: "Signin Endpoint"
    })
})


courseRouter.get('/course/preview', (req, res) => { //give all the courses
    res.json({
        message: "Signin Endpoint"
    })
})

module.exports = {
    courseRouter:courseRouter 
}
