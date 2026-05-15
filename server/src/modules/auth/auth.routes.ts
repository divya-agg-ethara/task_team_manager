import { Router } from "express";
import rateLimit from "express-rate-limit";
import { authenticate } from "../../middleware/authenticate";
import { loadCurrentUser } from "../../middleware/loadCurrentUser";
import { validate } from "../../middleware/validate";
import { login, signup, getMe } from "./auth.controller";
import { loginSchema, signupSchema } from "./auth.validation";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

const authRouter = Router();

authRouter.post("/signup", authLimiter, validate(signupSchema), signup);
authRouter.post("/login", authLimiter, validate(loginSchema), login);
authRouter.get("/me", authenticate, loadCurrentUser, getMe);

export default authRouter;
