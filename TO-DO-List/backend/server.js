// LOAD .ENV FILE
// This must be the VERY FIRST LINE in server.js
// require("dotenv").config() reads your .env file
// and makes all values available via process.env
// Without this, process.env.MONGO_URI will be undefined
require("dotenv").config();

// IMPORT EXPRESS
// Express is a library that lets us create a backend server
// and define routes like GET /todos, POST /todos etc.
const express = require("express");

// IMPORT OUR DATABASE CONNECTION FUNCTION
// This is the connectDB function we wrote in db/connect.js
// ./ means look in the current folder
const connectDB = require("./db/connect");

// IMPORT OUR TODO MODEL
// This is the Todo model we created in db/Todo.js
// We use this to create, read, update, delete todos in MongoDB
const Todo = require("./db/Todo");

// CREATE EXPRESS APP
// express() creates the actual application
// app is the object we use to define routes and settings
const app = express();

// -------- MIDDLEWARE --------

// PARSE JSON FROM FRONTEND
// When React sends data (like a new todo), it sends JSON
// express.json() converts that JSON into a JavaScript object
// Without this, req.body will be undefined in POST routes
app.use(express.json());

// -------- CONNECT TO DATABASE --------

// CALL THE CONNECT FUNCTION
// This opens the connection to MongoDB
// We defined this function in db/connect.js
// It must run before any routes try to use the database
connectDB();

// -------- ROUTES / APIs --------

// GET ROUTE — FETCH ALL TODOS
// app.get() defines a route that handles GET requests
// "/todos" is the URL path React will call: axios.get("/todos")
// async because we are doing database work (which takes time)
// req = request (data coming FROM frontend)
// res = response (data we send BACK to frontend)
app.get("/todos", async (req, res) => {

  // TRY to fetch data, CATCH any errors
  try {

    // Todo.find() fetches ALL documents from the todos collection
    // It returns an array of todo objects
    // await waits for MongoDB to finish before moving to next line
    const todos = await Todo.find();

    // SEND the array back to React as JSON
    res.json(todos);

  } catch (error) {

    // IF something goes wrong, send error message with status 500
    // 500 means "Internal Server Error"
    res.status(500).json({ message: error.message });
  }
});

// POST ROUTE — CREATE A NEW TODO
// app.post() handles POST requests (used when creating something new)
// React calls: axios.post("/todos", { text: "Buy milk" })
app.post("/todos", async (req, res) => {

  try {

    // CREATE A NEW TODO OBJECT
    // new Todo({}) creates a new document using the schema we defined
    // req.body.text is the text React sent in the request
    // req.body is the JSON object from React: { text: "Buy milk" }
    const newTodo = new Todo({
      text: req.body.text,
    });

    // SAVE TO MONGODB
    // .save() actually writes the document into the database
    // await waits for the save to complete
    // saved contains the full saved document including _id and timestamps
    const saved = await newTodo.save();

    // SEND BACK the saved todo so React knows it was successful
    res.json(saved);

  } catch (error) {

    // 400 means "Bad Request" — something wrong with the data sent
    res.status(400).json({ message: error.message });
  }
});

// DELETE ROUTE — REMOVE A TODO BY ID
// app.delete() handles DELETE requests
// "/todos/:id" — :id is a dynamic parameter
// Example: DELETE /todos/64a1b2c3... — the id comes from React
app.delete("/todos/:id", async (req, res) => {

  try {

    // GET THE ID FROM THE URL
    // req.params.id reads the :id value from the URL
    // Example: if URL is /todos/64a1b2c3, req.params.id = "64a1b2c3"
    // Todo.findByIdAndDelete() finds the document with that _id and removes it
    // await waits for deletion to finish
    await Todo.findByIdAndDelete(req.params.id);

    // FETCH THE UPDATED LIST after deletion
    // So React receives the fresh list without the deleted item
    const todos = await Todo.find();

    // SEND UPDATED LIST back to React
    res.json(todos);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// START THE SERVER
// app.listen(5000) tells the server to listen on port 5000
// The callback function runs once the server is ready
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// // IMPORT EXPRESS LIBRARY
// // Express helps create backend server easily

// // OLD COMMONJS WAY
// const express = require("express");

// // MODERN ES MODULE WAY
// // import express from "express";

// // IMPORT CORS
// // CORS allows frontend to access backend

// // OLD WAY
// // const cors = require("cors");

// // import cors from "cors";


// // CREATE EXPRESS APPLICATION
// const app = express();


// // ---------------- MIDDLEWARE ----------------


// // ENABLE CORS
// // Without this frontend may get CORS error
// // app.use(cors());

// //cors is not needed because we are using proxy in vite.config.js


// // PARSE JSON DATA
// // Converts incoming JSON into JavaScript object
// // Without this req.body becomes undefined
// app.use(express.json());


// // ---------------- DATABASE (TEMPORARY) ----------------


// // TEMP ARRAY
// // Real apps use MongoDB/MySQL/PostgreSQL
// let todos = [];


// // ---------------- ROUTES / APIs ----------------


// // GET API
// // Used to FETCH all todos

// app.get("/todos", (req, res) => {

//   // SEND todos array as JSON response
//   res.json(todos);
// });


// // POST API
// // Used to CREATE new todo

// app.post("/todos", (req, res) => {

//   // req.body contains frontend data
//     const newTodo = {
//     id: Date.now(),
//     text: req.body.text
//   };

//   // ADD todo into array
//   todos.push(newTodo);

//   // SEND success message
//    res.json(newTodo); // return created todo
// });


// // DELETE API
// // :id means dynamic parameter

// app.delete("/todos/:id", (req, res) => {

//   // GET id from URL
//   const id = req.params.id;

//   // REMOVE item from array
//   todos = todos.filter((todo) => todo.id !== Number(id));

//   // SEND RESPONSE
// res.json(todos);
// });


// // START SERVER

// app.listen(5000, () => {

//   console.log("Server running on port 5000");

// });