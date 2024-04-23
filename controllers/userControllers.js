import catchAsync from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import { signupUser, loginUser, updateAvatarById } from "../services/userServices.js";
import { generateHash } from "../services/userServices.js";
import { User } from "../models/user.js";
import { nanoid } from "nanoid";
import { sendEmail } from "../helpers/sendMail.js";

export const registerUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const verificationToken = nanoid();
  const hashedPassword = await generateHash(password);
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new HttpError(409, "Email is already in use");
  }
  const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}">Click here to verify your email</a>`,
  }
  
  await sendEmail(mail);
  const result = await signupUser({ ...req.body, password: hashedPassword, verificationToken});

  res.status(201).json({
    user: {
      email: result.newUser.email,
      subscription: result.newUser.subscription,
    },
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser({ email, password });

  await User.findByIdAndUpdate(user.id, { token });
  
  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});


export const getCurrent = catchAsync(async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });

});

export const logoutUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).send();
});

export const updateAvatar = catchAsync(async (req, res) => {
if (!req.file) {
    throw new HttpError(400, "Please, upload an image");
  }
  const updatedUser = await updateAvatarById(req.body, req.user, req.file);
   res.status(200).json({
     avatarURL: updatedUser.avatarURL
   });
});

export const verifyEmail = catchAsync(async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  await User.findByIdAndUpdate(user.id, { verificationToken: null,verify: true});
  res.status(200).send("Verification successful");

});

export const resendVerifyEmail = catchAsync(async (req, res) => {
  const { email } = req.body;


  const user = await User.findOne({ email });
  if (!user) {
    throw new HttpError(404, "User not found");
  }
  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }
const mail = {
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:3000/users/verify/${user.verificationToken}">Click here to verify your email</a>`,
  }
  await sendEmail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
});