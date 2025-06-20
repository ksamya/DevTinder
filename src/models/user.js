const { type } = require("express/lib/response");
const mongoose = require("mongoose");

//here we created a schema which is a structure or a blue print of what type a document is should be inside a collection
const userSchema = new mongoose.Schema({
  fisrtName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

//To communicate with DB we need to use Module

module.exports = mongoose.model("User", userSchema);
