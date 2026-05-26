const {User} = require("../model/userModel");

// for creating a new user into database we will make an async function and we will use try catch block to handle the error and export this function and we will use this function in the route file

// and we will use the User model to create a new user and save it to the database and we will sent the response back to the client 

const createUser = async (req, res) => {
    try{
        // UPDATE: Attach the logged-in admin's ID to the new data record
        const newUser = new User({
          ...req.body,
          createdBy: req.user.userId // Extracted straight from our auth token middleware
        });

        const {email} = newUser;

        // CHECK IF USER WITH SAME EMAIL ALREADY EXISTS
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message: "User with this email already exists"});
        }

        const savedUserData = await newUser.save();
        res.status(200).json(savedUserData);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getAllUsers = async (req, res) => {
    try{
        let query = {};

        // UPDATE: Check if user is standard or super administrator
        // If they are not a SuperAdmin, filter the query so they only look at their own created entries!
        if (req.user.role !== "SuperAdmin") {
            query.createdBy = req.user.userId;
        }

        // Pass our conditional filter rule directly into the find block
        const users = await User.find(query);

        if (!users || users.length === 0){
            return res.status(404).json({message:"User data not found"});
        }
        res.status(200).json(users);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getUserById = async (req, res) => {
    try{
        const usersExists = await User.findById(req.params.id);

        if (!usersExists){
            return res.status(404).json({message:"User data not found"});
        }
        res.status(200).json(usersExists);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateUserById = async (req, res) => {
    try{
        const updateUsers = await User.findByIdAndUpdate(req.params.id, req.body, {returnDocument: 'after'});

        if (!updateUsers){
            return res.status(404).json({message:"User data not found"});
        }
        res.status(200).json(updateUsers);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteUserById = async (req, res) => {
    try{
        const deleteUsers = await User.findByIdAndDelete(req.params.id);

        if (!deleteUsers){
            return res.status(404).json({message:"User data not found"});
        }
        res.status(200).json(deleteUsers);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {createUser, getAllUsers, getUserById, updateUserById, deleteUserById};