const mongoose = require("mongoose");

// const user = require("./routes/user");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
    email: {type:String, unique:true},
    password: String,
    firstname: String,
    lastname: String
})

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstname: String,
    lastname: String
})

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})


const purchaseSchema = new Schema({
    coureId: ObjectId,
    userId:ObjectId
})


const userModel = mongoose.model("user", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model('course', courseSchema)
const purchaseModel = mongoose.model("purchase", purchaseSchema)


module.export = { 
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
