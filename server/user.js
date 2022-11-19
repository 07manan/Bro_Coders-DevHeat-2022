const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Teacher = require("./model/Teacher");
const Attendance = require("./model/Attendance");
const Class = require("./model/Classes");
const Students = require("./model/Students");
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
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let userName = await Teacher.findOne({
        username: req.body.username,
      });
      let user = await Teacher.findOne({ email: req.body.email });
      if (user || userName) {
        return res.status(400).json({ error: "Sorry User Already Exist" });
      }
      /* const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(req.body.password, salt); */
      //create
      user = await Teacher.create({
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
      success = true;
      console.log("Register Successful");
      res.json({ success, authToken });
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
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;
    try {
      let user = await Teacher.findOne({ username });
      console.log(user._id);
      if (!user) {
        return res.status(400).json({ error: "Invalid" });
      }

      if (password != user.password) {
        return res.status(400).json({ error: "Invalid" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("Login Successful");

      success = true;
      let id = user._id;
      console.log(id);
      res.json({ success, id, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

router.get("/classes/:id", async (req, res) => {
  const userid = req.params.id;
  try {
    let clas = await Class.find({ teacher: userid });
    if (!clas) {
      return res.status(400).json({ error: "No classes created" });
    }

    res.json({ clas });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

router.post("/addclasses/:id", async (req, res) => {
  // console.log("Cmae");
  const userid = req.params.id;
  // console.log(userid);
  try {
    let user = await Class.findOne({ classname: req.body.classname });
    if (user) {
      return res
        .status(400)
        .json({ error: "You have already created this class" });
    }
    let cla = await Class.create({
      teacher: userid,
      subject: req.body.subject,
      classname: req.body.classname,
    });

    let stu = await Students.create({
      classname: req.body.classname,
      data: req.body.data,
    });

    console.log(stu);
    console.log("turu turu");
    console.log("Successfuly added class");
    res.status(200).send("Successfuly added class");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

router.get("/attendance/:id", async (req, res) => {
  // console.log("Cmae");
  const userid = req.params.id;
  // console.log(userid);
  try {
    let user = await Attendance.findOne({
      teacher: userid,
      subject: req.body.subject,
      classname: req.body.classname,
    });
    if (!user) {
      return res.json([]);
    }
    console.log("Successfuly fetched attendance");
    res.status(200).json(user.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});

router.patch("/add-attendance/:id", async (req, res) => {
  // console.log("Cmae");
  const userid = req.params.id;
  // console.log(userid);
  try {
    let f = await Attendance.findOne({
      teacher: userid,
      subject: req.body.subject,
      classname: req.body.classname,
    });
    if (!f) {
      let nuser = await Attendance.create({
        teacher: userid,
        subject: req.body.subject,
        classname: req.body.classname,
        data: [],
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
  try {
    let user2 = await Attendance.find({ data: { date: req.body.data.date } });
    if (user2) {
      await Attendance.findOneAndUpdate(
        {
          teacher: userid,
          subject: req.body.subject,
          classname: req.body.classname,
        },
        { $pull: { data: { date: req.body.data.date } } }
      );
    }
    // Attendance.updateOne({teacher:userid,subject:req.body.subject,classname:req.body.classname},{ $pop: { data: 1 } })

    let user = await Attendance.findOneAndUpdate(
      {
        teacher: userid,
        subject: req.body.subject,
        classname: req.body.classname,
      },
      { $push: { data: req.body.data } }
    );
    if (!user) {
      return res.status(400).json({ error: "Failed" });
    }
    console.log("Successfuly added attendance");
    res.status(200).send("Successfuly added attendance");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured!");
  }
});


router.get("/student", async (req, res) => {
  let batch=req.classname;
  let roll=req.body.rollno;
  //console.log(roll)
  let attendance=[];
  try {
    let user = await Attendance.find({
      classname: req.body.classname,
    });
    
   for(const index in user){
    let a=user[index];
    let total=a.data.length;
    let absent=0;
    let subject=a.subject;
    console.log(a.subject)
    for (const i in a.data){
      const searchObject= a.data[i].absent.find((num) => num==roll)
      if(searchObject){
        absent++;
        console.log(absent);
      } 
    }
    let percent=((total-absent)/total)*100;
    console.log(percent)
    let b={
      subject,
      total,
      absent,
      percent
      
    }
    attendance.push(b);
    console.log(b)
    console.log("hare ram hare krishna")
   }
    console.log(attendance);
    
    if (!user) {
      return res.json([]);
    }
    console.log("Successfuly fetched attendance");
    res.status(200).json(attendance);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Error Occured");
  }
});


module.exports = router;
