import express from "express";

import {
  registerUser,
  login,
    getCurrent,
    logoutUser
} from "../controllers/userControllers.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authMiddlewares.js";
import { registerUserSchema } from "../schemas/userSchemas.js";


const authRouter = express.Router();

authRouter.post("/register", validateBody(registerUserSchema), registerUser);

authRouter.post("/login", validateBody(registerUserSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logoutUser);

export default authRouter;
