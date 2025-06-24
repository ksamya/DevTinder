const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //get the Token
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }
    const validateToken = await jwt.verify(token, "key@123SK");
    const { _id } = validateToken;
    const user = await User.findById({ _id });
    req.user = user;
    console.log(req.user,'0000000000');
    next();
  } catch (err) {
    res.status(400).send("something went wrong..." + err.message);
  }
};

module.exports = userAuth;
