const { Router } = require("express");
const { userMiddleware } = require("../middleware/user")
const { courseModel, purchaseModel } = require("../db");

const courseRouter = Router();

courseRouter.post('/purchase', userMiddleware, async (req, res) => { //let user purchase the course

    const courseId = req.body.courseId;
    const userId = req.user_id;

    try {
        await purchaseModel.create({
            courseId: courseId,
            userId: userId
        })

        res.json({
            message: "purchased successfully"
        })
    } catch (error) {
        res.status(403).json({
            message : "Error at the purchase end point from courseRouter"
        })
    }
})

courseRouter.get('/preview', async (req, res) => { //give all the courses
    
    try {
        const allCourses = await courseModel.find();
        console.log(allCourses)
        res.json({
            allCourses: allCourses,
            message: "wow you have all the courses with you"
        })
    } catch (error) {
        res.status(403).json({
            message : "error while receiving all the courses"
        })
    }
})

module.exports = {
    courseRouter:courseRouter 
}
