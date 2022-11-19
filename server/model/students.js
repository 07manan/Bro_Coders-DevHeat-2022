const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://brocodersstart:chaliyeshurukartehe@cluster0.asas2.mongodb.net/test"
const listSchema= new mongoose.Schema({
  rollno: Number,
  name: String
});
const StudentSchema= new mongoose.Schema({
classname: String,
data: [listSchema]
});

const Students= mongoose.model("students",StudentSchema);

module.exports = Students;
