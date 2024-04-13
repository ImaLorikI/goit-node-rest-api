import path from "path";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
 try {
     const getUser = await listContacts();
     res.status(200).json(getUser);
 } catch (error) {
     console.log(error);
 }
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const getUser = await getContactById(id);

  if (!getUser) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(getUser);
};

export const deleteContact = (req, res) => {};

export const createContact = (req, res) => {};

export const updateContact = (req, res) => {};
