
import { Contacts } from "../models/model.js";

export const getAllContacts = async (req, res) => {
  try {
    const getUsers = await Contacts.find();
    res.status(200).json(getUsers);
  } catch (error) {
    console.log(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOne = await Contacts.findById(id);
    if (!getOne) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(getOne).status(200);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const deleteContact = await Contacts.findByIdAndDelete(req.params.id);
    res.json(deleteContact).status(200);
  } catch (error) {
    console.log(error);
  }
};

export const createContact = async (req, res) => {
  try {
    const newUser = await Contacts.create(req.body);
    if (!newUser) {
      return res.status(400).json({ message: "Not found" });
    }
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Bad request" });
  }
};

export const updateContact = async (req, res) => {
try {
  const update = await Contacts.findByIdAndUpdate(req.params.id, req.body);
  if (!update) {
    return res.status(400).json({ message: "Not found" });
  }
  res.json(update).status(200);
} catch (error) {
  console.log(error);
  res.status(404).json({ message: "Not found" });
 
}
};


export const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = await Contacts.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!update) {
      return res.status(400).json({ message: "Not found" });
    }
    res.status(200).json(update);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Not found" });
  }
};

