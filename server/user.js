const express = require("express");
const router = express.Router();
const User = require("./userSchema");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "TEAMDEVHEAT";
//Register
router.post(
  "/register",
  [
    body("username", "Enter UserName").isLength({ min: 5 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Password must have at least 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userName = await User.findOne({
        username: req.body.username,
      });
      let user = await User.findOne({ email: req.body.email });
      if (user || userName) {
        return res.status(400).json({ error: "Sorry User Already Exist" });
      }
      /* const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt); */
      //create
      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      // console.log(authToken);
      console.log("Register Successful");
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

//Login

router.post(
  "/login",
  [
    body("username", "Enter username"),
    body("password", "Password cannot be Blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      let user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Invalid" });
      }

        if(password!=user.password){
            return res
          .status(400)
          .json({ error: "Invalid" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("Login Successful");
    //   success = true;
      res.json({ authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

module.exports = router;
