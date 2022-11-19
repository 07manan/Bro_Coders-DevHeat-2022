const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://brocodersstart:chaliyeshurukartehe@cluster0.asas2.mongodb.net/test"
  
const TeacherSchema= new mongoose.Schema({
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Teacher= mongoose.model("teacher",TeacherSchema);

module.exports = Teacher;
