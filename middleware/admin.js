const jwt = require("jsonwebtoken")
const adminSecret = process.env.SECRET_ADMIN;
require('dotenv').config();
const express = require("express")
const {adminModel} = require("../db.js")

async function adminMiddleware(req, res, next) {
    const token = req.headers.token;
    const decode = jwt.verify(token, adminSecret)
    const adminId = decode._id;

    const admin = await adminModel.findById(adminId)

    console.log(admin)

    if (admin) {
        console.log("verified")
        next()
    } else {
        res.json({
            message : "bad request at admin end point"
        })
    }
}

module.exports = {
    adminMiddleware: adminMiddleware
}