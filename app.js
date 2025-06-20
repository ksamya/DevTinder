const express = require("express");
const { adminAuth, userAuth } = require("./middleware/auth");
const app = express();

app.get("/", (req, res) => {
  res.send("welcome to the home page");
});

// app.get(
//   "/userList",
//   (req, res, next) => {
//     next();
//     res.send("user list");
//   },
//   (req, res) => {
//     res.send("hey 2nd route handler");
//   }
// );

//here for this validation for all middleware writing same route repetedly instead write once and use for all
//one of the way and also using middleware folder
// app.use("/admin", (req, res, next) => {
//   const token = "ABC";
//   const isAuthorised = token === "ABC";
//   if (!isAuthorised) {
//     res.status(401).send("unauthorised request");
//   } else {
//     next();
//   }
// });

app.use(adminAuth);

app.get("/admin/list", (req, res) => {
  res.send({ name: "sameer", surname: "kulkarni" });
});

//handling the errors using a custom middleware using app.use() this is done for unwanted errors ideally error should be handled by the try and catch
app.post("/admin/edit", (err, req, res) => {
  // res.send("put request is initiated");
  throw new Error("some thing is wrong");
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong......!");
  }
});

app.get("/profile", userAuth, (req, res) => {
  res.send("Profile section");
});

app.get("/error", userAuth, (req, res) => {
  try {
    throw new Error("custome error");
  } catch (err) {
    res.status(500).send("errors handled by try and catch");
  }
});

app.listen(7777, () => {
  console.log("hello from server");
});
