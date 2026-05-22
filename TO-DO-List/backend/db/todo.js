// IMPORT MONGOOSE
// We need mongoose to create a Schema and Model
const mongoose = require("mongoose");

// CREATE A SCHEMA
// Schema means: define the shape/structure of your data
// Think of it like: what fields does one todo have?
// new mongoose.Schema({}) is the syntax to create a schema
const todoSchema = new mongoose.Schema(
  {
    // TEXT FIELD
    // Every todo has a text field (the todo message itself)
    // type: String means this field must be text, not a number or boolean
    // required: true means this field cannot be empty/missing
    text: {
      type: String,
      required: true,
    },
  },

  // SECOND ARGUMENT: OPTIONS
  // This is a separate object passed after the fields object
  {
    // TIMESTAMPS
    // timestamps: true tells mongoose to automatically add two fields:
    // createdAt — when the todo was created
    // updatedAt — when the todo was last changed
    // You do not need to add these manually, mongoose does it for you
    timestamps: true,
  }
);

// CREATE A MODEL FROM THE SCHEMA
// Model is what you actually use to talk to the database
// mongoose.model("Todo", todoSchema) syntax:
//   - "Todo" is the name (mongoose auto-creates a collection called "todos")
//   - todoSchema is the structure we defined above
// Think of Schema = blueprint, Model = the actual tool you use
const Todo = mongoose.model("Todo", todoSchema);

// EXPORT THE MODEL
// So that server.js can import Todo and use it to save/find/delete data
module.exports = Todo;