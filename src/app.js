const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json()); //this line will read the dynamic data sent by the Frontend

app.post("/signup", async (req, res) => {
  // const user = new User({
  //   fisrtName: "dell",
  //   lastName: "demo",
  //   emailId: "demo@kul.com",
  //   password: "demo@123",
  // });

  //now we are sending a dynamic data

  const user = new User(req.body);
  try {
    await user.save(); //here we are storing the data into database using this line
    res.status(201).send("User is created successfully...."); //send a respose
  } catch (err) {
    res
      .status(400)
      .send("User cannot be created, Plesde Try again after some time" +" "+ err);
  }
});
//New APi to find all user and also use by id or something
//API to find userBy emailId
app.get("/user", async (req, res) => {
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
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("something went wrong...");
  }
});

//the API to delete we will be using findByIdand Delete method

app.delete("/deleteUser", async (req, res) => {
  try {
    const userId = req.body.userId;
    const userById = await User.findByIdAndDelete(userId);
    res.send("user deleted successfully...");
  } catch (err) {
    res.status(400).send("something went wrong...");
  }
});

//API to update the record
app.patch("/editUser", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body;
    const allowedUpdates = ["userId","photoUrl", "password", "age", "skills", "about"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      allowedUpdates.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Updates Not allowed..");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      timestamps: true,
    });
    res.send("user Updated successfully...");
  } catch (err) {
    console.log(err);
    res.status(400).send("something went wrong..."+err.message);
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
