require("dotenv").config();

// IMPORT EXPRESS, MONGOOSE
const express = require("express");
const cors = require("cors"); // 1. Import it

const {connectMongoDB} = require("./connect");

// const bodyParser = require("body-parser");

// 1. ADD THIS IMPORT LINE FOR YOUR NEW AUTH ROUTER
const authRouter = require("./routes/authRouter");
const router = require("./routes/userRoute");

// CREATE EXPRESS APP

const app = express();

// 1. ACTIVATE CORS MIDDLEWARE (Add this line!)
app.use(cors());

app.use(express.json()); // PARSE JSON BODIES FROM REQUESTS SO THAT req.body WORKS and without this req.body will be undefined

//or you can use
// app.use(body-parser.json());

const PORT = process.env.PORT || 7000;

// START THE SERVER ONLY AFTER DB CONNECTION IS SUCCESSFULL

/*

// 1. Simply call the connection function on its own
connectMongoDB();

// 2. Run your server independently on its port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

*/
//or you can use production ready code like this  

// Connect to the Database first


connectMongoDB()
  .then(() => {
    // REASON: Only start listening for requests AFTER database is successfully connected.
    // This prevents the server from crashing if a user makes a request before the DB is ready.
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // REASON: If the database connection fails, do not start the server at all.
    console.error("Server failed to start due to DB connection error:", err);
  });




// ---------------- ROUTES ---------------- now simply mount the router from userRoute.js and all routes defined there will be available under /api path

// 2. MOUNT YOUR AUTH ROUTER RIGHT HERE
app.use("/api/auth", authRouter); // This creates the /api/auth/login endpoint!

app.use("/api", router);