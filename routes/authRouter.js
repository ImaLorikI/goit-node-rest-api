import express from "express";

import {
  registerUser,
  login,
    getCurrent,
    logoutUser,
    updateAvatar,
    verifyEmail,
    resendVerifyEmail
} from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import authenticate, { uploadAvatar } from "../middlewares/authMiddlewares.js";
import { registerUserSchema, verifyEmailSchema } from "../schemas/userSchemas.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);

authRouter.post("/login", validateBody(registerUserSchema), login);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.post("/verify", validateBody(verifyEmailSchema), resendVerifyEmail);

authRouter.patch("/avatars", authenticate, uploadAvatar, updateAvatar);

export default authRouter;
