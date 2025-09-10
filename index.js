const express = require('express')

const app = express();

app.use(express.json())

app.post('/user/signup', (req, res)=> {
    res.json({
        message: "Signup Endpoint"
    })
})

app.post('/user/signup', (req, res) => {
    res.json({
        message: "Signin Endpoint"
    })
})


app.get('/user/purchases', (req, res) => { //give user courses
    res.json({
        message: "Signin Endpoint"
    })
})

app.post('/course/purchase', (req, res) => { //give user courses
    res.json({
        message: "Signin Endpoint"
    })
})


app.get('/courses', (req, res) => { //give all the courses
    res.json({
        message: "Signin Endpoint"
    })
})

app.listen(3000)