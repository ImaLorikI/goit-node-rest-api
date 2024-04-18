import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import HttpError from "../helpers/HttpError.js";

dotenv.config();

const { JWT_KEY } = process.env;

export const signToken = (id) => {
  return jwt.sign({ id }, JWT_KEY, { expiresIn: "7d"});
};

export const checkToken = (token) => {
  if (!token) {
    throw new  HttpError(401, "Unauthorized");
  }

  try {
    const { id } = jwt.verify(token, JWT_KEY);
    return id;
  } catch (error) {
    throw  new HttpError(401, "Unauthorized");
  }
};
