const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validateSignupData } = require("../utills/validation");

//Login API
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    console.log(emailId, "00");
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials....");
    }
    const passwordValidate = await user.validatePassword(password);
    if (passwordValidate) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.send("login successful!!!");
    } else {
      throw new Error("invalid credentials");
    }
  } catch (err) {
    res.status(400).send("something went wrong..." + err.message);
  }
});

//Signup API
authRouter.post("/signup", async (req, res) => {
  // const user = new User({
  //   fisrtName: "dell",
  //   lastName: "demo",
  //   emailId: "demo@kul.com",
  //   password: "demo@123",
  // });
  try {
    //validation of a fields
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;
    //encryption of a password using bcrypt library
    const passwordHash = await bcrypt.hash(password, 10);
    //now we are sending a dynamic data
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save(); //here we are storing the data into database using this line
    res.status(201).send("User is created successfully...."); //send a respose
  } catch (err) {
    res.status(400).send({ "ERROR:": err.message });
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout")
});

module.exports = authRouter;
