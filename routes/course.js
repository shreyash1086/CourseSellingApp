const { Router } = require("express")

const courseRouter = Router();

courseRouter.post('/purchase', (req, res) => { //give user courses
    res.json({
        message: "purchases"
    })
})

courseRouter.get('/preview', (req, res) => { //give all the courses
    res.json({
        message: "course preview endpoint"
    })
})

module.exports = {
    courseRouter:courseRouter 
}
