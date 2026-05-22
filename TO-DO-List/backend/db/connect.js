// IMPORT MONGOOSE LIBRARY
// mongoose is a library that helps Node.js talk to MongoDB
// Without this line, we cannot use any mongoose features
const mongoose = require("mongoose");

// CREATE A FUNCTION TO CONNECT TO MONGODB
// async means this function will do work that takes time
// (connecting to a database takes time, so we use async)
const connectDB = async () => {

  // TRY means: attempt to run this code
  // If it works, great. If it fails, go to catch block below.
  try {

    // CONNECT TO MONGODB
    // mongoose.connect() opens a connection to MongoDB
    // process.env.MONGO_URI reads the link from your .env file
    // We use .env so we never write passwords directly in code
    // await means: wait here until connection is done before moving on
    await mongoose.connect(process.env.MONGO_URI);

    // IF CONNECTION WORKS, print success message in terminal
    console.log("MongoDB connected ✅");

  // CATCH block runs ONLY if something goes wrong above
  } catch (error) {

    // PRINT the error so we can read what went wrong
    console.error("MongoDB connection error:", error);

    // STOP THE SERVER if database fails to connect
    // process.exit(1) means: quit the program with an error
    // 1 means something went wrong (0 means clean exit)
    // No point running the server if there is no database
    process.exit(1);
  }
};

// EXPORT THIS FUNCTION
// module.exports makes this function available in other files
// Without this, server.js cannot use connectDB
module.exports = connectDB;