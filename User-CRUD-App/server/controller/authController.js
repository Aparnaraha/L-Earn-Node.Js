const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// CRITICAL FIX: Destructure { User } to match your model's module.exports structure!
const { User } = require("../model/userModel"); 

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    // STEP 1: Extract data from the request body
    const { email, password } = req.body;

    // STEP 2: Validation (Guard Clause)
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: "Please provide both email and password." 
      });
    }

    // STEP 3: Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password." 
      });
    }

    // STEP 4: Verify the password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid email or password." 
      });
    }

    // STEP 5: Generate a JSON Web Token (JWT)
    // 🌟 ADDED: Included 'role' inside your token payload signature wrapper!
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        role: user.role || "StandardUser" 
      },
      process.env.JWT_SECRET, 
      { expiresIn: "1d" } 
    );

    // STEP 6: Send the successful response
    return res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name || 'User'}!`,
      token: token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role || "StandardUser" // 🌟 ADDED: Returning role configuration metadata back to frontend state
      }
    });

  } catch (error) {
    console.error("Critical Login Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "An internal server error occurred. Please try again later." ,
      error_details: error.message
    });
  }
};

/**
 * @desc    Register a new administrative user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    let { name, email, password, address, role } = req.body;

    // 🌟 THE FIX: If an admin is creating this user from the dashboard,
    // they didn't type a password. We assign a secure default temporary one!
    if (!password) {
      password = "TemporaryPassword123!"; 
    }

    // Your existing password hashing logic remains exactly the same:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Your existing User.create logic...
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      address: address || "Not Provided",
      role: role || "StandardUser",
      createdBy: req.user?.userId || undefined
    });

    // Send response back safely
    return res.status(201).json(newUser);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser, registerUser };