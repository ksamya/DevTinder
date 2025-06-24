const express = require("express");
const userAuth = require("../middleware/auth");
const requestRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const requestStatus = req.params.status;

      console.log(fromUserId, "ii", toUserId, "000", requestStatus);
      //check status should be either ignored or interested
      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(requestStatus)) {
        return res
          .status(400)
          .json({ message: "invalid status type " + requestStatus });
      }

      //check user is valid to whome request is been sending
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: "User Not found" });
      }

      //now check if request already been sent from any one to anyone
      const existingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingRequest) {
        return res
          .status(400)
          .json({ message: "connection request already present" });
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status: requestStatus,
      });
      const data = await connectionRequest.save();
      if (requestStatus === "ignored") {
        res.json({ message: `connection request is ${requestStatus}` });
      } else if (requestStatus === "interested") {
        res.json({ message: `connection request is ${requestStatus}` });
      }
    } catch (err) {
      res.send("ERROR: " + err);
    }
  }
);
module.exports = requestRouter;
