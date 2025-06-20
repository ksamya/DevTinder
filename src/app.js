const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    fisrtName: "dell",
    lastName: "demo",
    emailId: "demo@kul.com",
    password: "demo@123",
  });
  try {
    await user.save(); //here we are storing the data into database using this line
    res.status(201).send("User is created successfully...."); //send a respose
  } catch (err) {
    res
      .status(400)
      .send("User cannot be created, Plesde Try again after some time");
  }
});

/**here import the database function from database file and then first start establishing the connection and then starting to listen on the port */
connectDb()
  .then(() => {
    console.log("Database connects successfully.....");
    app.listen(7777, () => {
      console.log("listening on a port 7777");
    });
  })
  .catch((err) => {
    console.log("Database connection Failed");
  });
