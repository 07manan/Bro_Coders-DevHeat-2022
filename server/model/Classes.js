const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://brocodersstart:chaliyeshurukartehe@cluster0.asas2.mongodb.net/test"

const ClassesSchema= new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  subject: String,
  classname: String,
  
});

const Class= mongoose.model("class",ClassesSchema);

module.exports = Class;
