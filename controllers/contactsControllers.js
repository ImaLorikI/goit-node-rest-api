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
    const getUsers = await listContacts();
    res.status(200).json(getUsers);
  } catch (error) {
    console.log(error);
  }
};


export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const getUser = await getContactById(id);

  if (!getUser) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.status(200).json(getUser);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const removeContacted = await removeContact(id);
  if (!removeContacted) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json(removeContacted).status(200);
};

export const createContact = async (req, res) => {
  const dataNewContact = req.body;
  const newContact = await addContact(dataNewContact);
  if (!newContact) {
    return res.status(400).json({ message: "Contact not created" });
  }
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  if (Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }
  const updateContacts = await updateContactById(id, req.body);
  if (!updateContacts) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(updateContacts);
};
