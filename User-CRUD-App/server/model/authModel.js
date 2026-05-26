const mongoose = require("mongoose");

// CREATE ADMIN SCHEMA
const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Compile into an Admin model so it saves to an "admins" collection in MongoDB
const Admin = mongoose.model("Admin", adminSchema);
module.exports = { Admin };