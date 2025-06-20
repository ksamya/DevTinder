const mongoose = require("mongoose");

const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://kulkarnisameer300:Yvv4FtoBZLybeCtp@nodejs.mc0wplz.mongodb.net/devTinder"
  );
};

module.exports = connectDb;

/**here first app is start listening on port and then db is getting connected so
 * we will first connect with db and then will listen on the port now i am commenting below code and exporting the connection code to main file where the app is listing code is there ibn app.js
 */
// connectDb()
//   .then(() => {
//     console.log("Database connection is established successfully...");
//   })
//   .catch((err) => {
//     console.error("database connection failed!!!!");
//   });
