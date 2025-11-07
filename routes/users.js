import express from "express";
var router = express.Router();
import { registerUser } from "../src/controllers/user.js";
import { loginUser } from "../src/controllers/user.js";

import rateLimit from "express-rate-limit";

// Apply rate limiting to authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

router.use("/login", authLimiter);

// register user
router.post(
  "/register",

  registerUser
);

// login user
router.post("/login", loginUser);
export default router;
