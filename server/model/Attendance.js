const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://brocodersstart:chaliyeshurukartehe@cluster0.asas2.mongodb.net/test"
const dataSchema= new mongoose.Schema({
    date: {
        type: String,
        min: '2022-01-01',
        max: '2022-12-31',
        unique:true
      },
    absent:[Number]
});
const AttendanceSchema= new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
  },
  subject: String,
  classname: String,
  data: [dataSchema]
});

const Attendance= mongoose.model("attendance",AttendanceSchema);

module.exports = Attendance;
