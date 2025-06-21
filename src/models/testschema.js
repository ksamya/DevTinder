const mongoose = require("mongoose");
//created a schema
const testScema = mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  city: {
    type: String,
  },
});

module.exports = mongoose.model("test", testScema);
