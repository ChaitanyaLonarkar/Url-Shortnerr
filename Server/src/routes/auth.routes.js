import express from "express"
import {registerUser,loginUser ,logoutUser } from "../controllers/auth.controller.js"
// import authorization from "../middleware/authorization.js"
import {authorization} from "../middelware/authorization.js"
const router = express.Router()

// Register a new user
router.post("/register", registerUser);
// Login an existing user
router.post("/login", loginUser);
// Logout user
router.post("/logout", logoutUser);

router.get("/", authorization, (req, res) => {
  return res.status(200).json({ status: true, message: "Authorized user" });
});

export default router;