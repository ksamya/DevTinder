const express = require("express");
const connectDb = require("./config/database");
const app = express();

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use(express.json()); //this line will read the dynamic data sent by the Frontend
app.use(cookieParser());

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);



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
