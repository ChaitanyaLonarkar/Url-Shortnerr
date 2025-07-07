import User from "../models/user.model.js";
import { hashPassword, comparePassword ,generateToken } from "../utils/helper.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser.length > 0) {
      return res.status(400).json({ error: "User already exists" });
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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    console.log("User found:", user.password);

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
        sameSite: "Lax",
      })
      .status(200)
      .json({ message: "Login successful" });

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