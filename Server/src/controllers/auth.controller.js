import User from "../models/user.model.js";
import { hashPassword, comparePassword ,generateToken } from "../utils/helper.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // console.log("Registering user:", username, email,password);

    const existingUsername = await User.findOne({ username });
    // console.log("Existing user:", existingUser);
    if (existingUsername!== null) {
      return res.status(401).json({ error: "Username already taken" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email  });
    // console.log("Existing user:", existingUser);
    if (existingUser!== null) {
      return res.status(401).json({ error: "User with this email already exists" });
    }

    const hashedPassword = await hashPassword(password);
    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error || "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    req.user = user
    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // console.log("User found:", user.password);

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Generate token (you can implement this in utils/helper.js)
    const token = generateToken(user);
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: true, // Ensures the cookie is only sent over HTTPS
        maxAge: 10 * 24 * 60 * 60 * 1000,    
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({ user:user, message: "Login successful" });

  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("access_token")
    .status(200)
    .json({ message: "Logout successful" });
};