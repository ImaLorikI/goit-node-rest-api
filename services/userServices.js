import bcrypt from "bcrypt";
import { signToken } from "../services/jwtServices.js";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";
import { ImageService } from "./imageService.js";


export const signupUser = async (userData) => {
  const newUser = await User.create({
    ...userData,
  });
  newUser.password = undefined;

  return { newUser };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new HttpError(401, "Email or password is incorrect");
  
  const passwordIsValid = await bcrypt.compare(password, user.password);
  if (!user || !passwordIsValid) {
    throw new HttpError(401, "Email or password is incorrect");
  }

  if (!user) throw new HttpError(401, "Unauthorized..");

  const token = signToken(user.id);

   if (!user.verify) {
     throw new HttpError(400, "Email is not verified");
   }

  return { user, token };
};


export async function generateHash(password) {
  const salt = await bcrypt.genSalt(10);
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
}

export async function findUserById(id) {
  const user = await User.findById(id);
  return user;
}

export const updateAvatarById = async (userData, user, file) => {
  if (file) {
    user.avatarURL = await ImageService.saveImage(
      file,
      {
        maxFileSize: 2,
        width: 250,
        height: 250,
      },
      "avatars"
    );
  }

  Object.keys(userData).forEach((key) => {
    user[key] = userData[key];
  });

  return user.save();
};

