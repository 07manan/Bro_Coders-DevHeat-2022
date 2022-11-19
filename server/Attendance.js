const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://brocodersstart:chaliyeshurukartehe@cluster0.asas2.mongodb.net/test"
const dataSchema= new mongoose.Schema({
    date: {
        type: Date,
        min: '2022-01-01',
        max: '2022-12-31'
      },
    absent:[Number]
});
const ClassSchema= new mongoose.Schema({
  email:String,
  classno: Number,
  data: [dataSchema]
});

const Class= mongoose.model("class",ClassSchema);

module.exports = Class;
