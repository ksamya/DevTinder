const express = require("express");
// const { adminAuth, userAuth } = require("./middleware/auth");
const dbConnection = require("./config/databsetest");
const Test = require("./models/testschema");
const app = express();

app.post("/test", async (req, res) => {
  const test = new Test({
    name: "samya",
    age: 29,
    city: "nanded",
  });
  try{
    await test.save();
    res.status(201).send("successfully create a user")
  } catch(err){
    console.error("failed");
  }
});

dbConnection()
  .then(() => {
    console.log("connection successfully established");
    app.listen(7770, () => {
      console.log("hello from server 7770");
    });
  })
  .catch((err) => {
    console.error("connection failed");
  });
