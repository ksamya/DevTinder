const express = require("express");
const profileRouter = express.Router();
const User = require("../models/user");
const userAuth = require("../middleware/auth");
const { validateProfileData } = require("../utills/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

//API to update the record
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!validateProfileData(req)) {
      throw new Error("Invalid edit request");
    }
    const logedInUser = req.user;
    console.log(logedInUser, "---");
    Object.keys(req.body).forEach((key) => (logedInUser[key] = req.body[key]));
    console.log(logedInUser, "++++");
    await logedInUser.save();
    res.send(
      `${logedInUser.firstName} your profile is updated successfully...`
    );
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong..." + err.message);
  }
});

profileRouter.get("/getProfile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send("profile details are of" + user);
  } catch (err) {
    res.status(400).send("something went wrong..." + err.message);
  }
});

//the API to delete we will be using findByIdand Delete method

profileRouter.delete("/deleteUser", async (req, res) => {
  try {
    const userId = req.body.userId;
    const userById = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully...");
  } catch (err) {
    res.status(400).send("something went wrong...");
  }
});

//New APi to find all user and also use by id or something
//API to find userBy emailId
profileRouter.get("/user", userAuth, async (req, res) => {
  try {
    const userEmail = req.body.emailId;
    const user = await User.find({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User Not Found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("something went wrong...");
  }
});

//API to find all user from database
profileRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong...");
  }
});

profileRouter.patch("/profile/password", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (user && emailId === user.emailId) {
      const validPassword = validator.isStrongPassword(password);
      if (validPassword) {
        const newPasswordHash = await bcrypt.hash(password, 10);
        user.password = newPasswordHash;
        user.save();
      } else {
        throw new Error("Make password more strong.");
      }
    } else {
      throw new Error("invalid email");
    }
    res.send("password Updated successfully...");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

module.exports = profileRouter;
