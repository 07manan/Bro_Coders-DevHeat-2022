const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://brocodersstart:chaliyeshurukartehe@cluster0.asas2.mongodb.net/test"
  
const TeacherSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      } 
});

const Teacher= mongoose.model("teacher",TeacherSchema);

module.exports = Teacher;
