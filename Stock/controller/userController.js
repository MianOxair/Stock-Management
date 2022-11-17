const { json } = require("express");
const e = require("express");
const express = require("express");
const router = express.Router();
const userManagement = require("../models/user.model");
var cors = require("cors");

// //Getting All
router.get("/", async (req, res) => {
  try {
    const users = await userManagement.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// //Login one
router.post("/login/", middleware, async (req, res) => {
  try {
    const user = await userManagement.findById(res.user._id);

    console.log(
      `res.user.password ${user?.password} != req.body.password ${req.body.password}`
    );

    console.log(
      `res.user.password ${user?.password} != req.body.password ${req.body.password}`
    );
    if (user?.password != req.body.password) {
      res.status(404).json({ message: "User or Password is invalid." });
    } else {
      res.send(res.user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Creating One
router.post("/signup/", async (req, res) => {
  try {
    const user = await userManagement.findOne(
      { email: req.body.email },
      {
        userName: 1,
        email: 1,
      }
    );
    if (user != null && user?.email?.length > 0) {
      res.status(404).json({
        message: `User already exists with this email ${req.body.email}.`,
      });
      return;
    } else {
      const userData = new userManagement({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: req.body.password,
      });

      const newUser = await userData.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// //Delete one
router.delete("/:id", async (req, res) => {
  try {
    const user = await userManagement.findByIdAndRemove(req.params.id);
    res.json({ message: `Deleted user ${JSON.stringify(user)}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function middleware(req, res, next) {
  let user;
  try {
    // console.log('req', req);
    // console.log(
    //   `res.body.email ${req.body.email} != req.body.password ${req.body.password}`
    // );
    if (req.body.email == null) {
      res.status(404).json({ message: "User or Password is invalid." });
    }
    // console.log(`req.body.email:${req.body.email}`);
    user = await userManagement.findOne(
      { email: req.body.email },
      {
        userName: 1,
        email: 1,
      }
    );
    // console.log(`user${JSON.stringify(user)}`);
    if (user == null) {
      res.status(404).json({ message: "User or Password is invalid." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.user = user;
  next();
}

module.exports = router;
