const connectToMongo= require('./db');
const cors=require("cors")
connectToMongo();
const express = require("express");
const registerRoute = require("./user");
const app = express();
const port = 8000;
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
//Available Routes
// app.post("/test", async (req, res) => {
//     try {
//       console.log(req.body)
//     } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//     }
//   });
app.use("/api", registerRoute);
app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});