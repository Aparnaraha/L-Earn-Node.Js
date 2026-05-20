// IMPORT EXPRESS LIBRARY
// Express helps create backend server easily

// OLD COMMONJS WAY
const express = require("express");

// MODERN ES MODULE WAY
// import express from "express";

// IMPORT CORS
// CORS allows frontend to access backend

// OLD WAY
// const cors = require("cors");

// import cors from "cors";


// CREATE EXPRESS APPLICATION
const app = express();


// ---------------- MIDDLEWARE ----------------


// ENABLE CORS
// Without this frontend may get CORS error
// app.use(cors());

//cors is not needed because we are using proxy in vite.config.js


// PARSE JSON DATA
// Converts incoming JSON into JavaScript object
// Without this req.body becomes undefined
app.use(express.json());


// ---------------- DATABASE (TEMPORARY) ----------------


// TEMP ARRAY
// Real apps use MongoDB/MySQL/PostgreSQL
let todos = [];


// ---------------- ROUTES / APIs ----------------


// GET API
// Used to FETCH all todos

app.get("/todos", (req, res) => {

  // SEND todos array as JSON response
  res.json(todos);
});


// POST API
// Used to CREATE new todo

app.post("/todos", (req, res) => {

  // req.body contains frontend data
    const newTodo = {
    id: Date.now(),
    text: req.body.text
  };

  // ADD todo into array
  todos.push(newTodo);

  // SEND success message
   res.json(newTodo); // return created todo
});


// DELETE API
// :id means dynamic parameter

app.delete("/todos/:id", (req, res) => {

  // GET id from URL
  const id = req.params.id;

  // REMOVE item from array
  todos = todos.filter((todo) => todo.id !== Number(id));

  // SEND RESPONSE
res.json(todos);
});


// START SERVER

app.listen(5000, () => {

  console.log("Server running on port 5000");

});