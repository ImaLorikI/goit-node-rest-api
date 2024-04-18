import HttpError from "../helpers/HttpError.js";
import { checkToken } from "../services/jwtServices.js";
import { User } from "../models/user.js";
import catchAsync from "../helpers/catchAsync.js";

export const authenticate = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (!token) throw new HttpError(401);

  const id = checkToken(token);
  const user = await User.findById(id);

  if (!user || !user.token || user.token !== token) throw new HttpError(401);
  req.user = user;
  next();

});

export default authenticate;
