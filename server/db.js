const mongoose = require("mongoose");
const mongoURL = "mongodb+srv://brocodersstart:chaliyeshurukartehe@cluster0.asas2.mongodb.net/test"
  
const connectToMongo = () => {
  mongoose.connect(mongoURL, () => {
    console.log("MongoDB Connected Successfully");
  });
};
// console.log("noooo")
module.exports = connectToMongo;
