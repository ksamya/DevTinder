const express = require("express");
const {adminAuth , userAuth} = require("./middleware/auth")
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

app.put("/admin/edit", (req, res) => {
  res.send("put request is initiated");
});

app.get("/profile",userAuth, (req, res) => {
  res.send("Profile section");
});

app.listen(7777, () => {
  console.log("hello from server");
});
