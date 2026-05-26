const mongoose = require("mongoose");

// CREATE USER SCHEMA
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    // 🌟 FIXED: Added missing password field to allow secure logins
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    // 🌟 FIXED: Added role field to manage visibility controls
    role: {
        type: String,
        enum: ["StandardUser", "SuperAdmin"],
        default: "StandardUser"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: function() {
            return this._id; // Automatically defaults to its own ID if self-registered
        }
    }
});

// CREATE USER MODEL AND EXPORT IT 
const User = mongoose.model("User", userSchema);
module.exports = { User };