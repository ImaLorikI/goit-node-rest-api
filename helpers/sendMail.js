import  sgMail  from "@sendgrid/mail";
import dotenv from "dotenv";
import  HttpError  from "../helpers/HttpError.js";

dotenv.config(); 
const { SendGrid_API_KEY } = process.env;
sgMail.setApiKey(SendGrid_API_KEY);

export const sendEmail = async (data) => {
  try {
    const emailToSend = {
      ...data,
      from: "go_it_pavlo@meta.ua",
    };
    await sgMail.send(emailToSend);
    return true;
  } catch (error) {
    throw new HttpError(500, "Internal Server Error");
  }
};
