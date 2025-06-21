const mongoose = require("mongoose");


const dbConnection = async () => {
  await mongoose.connect(
    "mongodb+srv://kulkarnisameer300:Yvv4FtoBZLybeCtp@nodejs.mc0wplz.mongodb.net/sameer"
  );
};

module.exports = dbConnection;
