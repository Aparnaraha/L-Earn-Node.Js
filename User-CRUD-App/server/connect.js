const mongoose = require("mongoose");

// CONNECT TO MONGODB

const MONGOURL = process.env.MONGO_URI;

async function connectMongoDB() {
  return mongoose
    .connect(MONGOURL)
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.log("Error cpnnecting to MongoDB:", error);
    });
}

module.exports = {connectMongoDB};
