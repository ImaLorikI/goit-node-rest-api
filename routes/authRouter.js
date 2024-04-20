import express from "express";

import {
  registerUser,
  login,
    getCurrent,
    logoutUser,
    updateAvatar
} from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import authenticate, { uploadAvatar } from "../middlewares/authMiddlewares.js";
import { registerUserSchema } from "../schemas/userSchemas.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);

authRouter.post("/login", validateBody(registerUserSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logoutUser);

authRouter.patch("/avatar", authenticate, uploadAvatar, updateAvatar);

export default authRouter;
