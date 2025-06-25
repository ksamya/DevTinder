const express = require("express");
const userRouter = express.Router();
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const USER_SAFE_DATA = "firstName lastName photoUrl about skills";
//get all pending connection req of all login user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedUser,
      status: "interested",
    }).populate("fromUserId", USER_SAFE_DATA); //getting data from user collection
    res.json({
      message: "Data fetch successfully...",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//suppose u! send to us2 and u2 accept it then u1 get the info who is conneceted with him
userRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const loggedUser = req.user;
    const connectRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedUser._id, status: "accepted" },
        { fromUserId: loggedUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);
    console.log(loggedUser);

    const data = connectRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedUser._id.toString()) {
        return row.toUserId;
      } else {
        return row.fromUserId;
      }
    });
    res.send({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

//Feed API
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    /**1. should see all profile except not see own card
     *2.his connection
     *ignored people
     *already sent connection request
     */
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    limit = limit > 50 ? 50 : limit;
    const connectionRequest = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.fromUserId.toString());
    });
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);
    res.send({data:users});
  } catch (error) {
    res.status(400).json({
      message: "ERROR" + error.message,
    });
  }
});

module.exports = userRouter;
