import { promises as fs } from "fs";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.join("db", "contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((id) => id.id === contactId);
    if (!contact) {
      return null;
    }
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(({ id }) => id === contactId);
    if (idx === -1) {
      return null;
    }
    const [contact] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

const addContact = async (body) => {
  try {
    const list = await listContacts();
    const newContact = {
      id: nanoid(),
      ...body,
    };
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

export const updateContactById = async (id, body) => {
  try {
    const list = await listContacts();
    const index = list.findIndex((el) => el.id === id);
    if (index === -1) {
      return null;
    }
    const updatedContact = { ...list[index], ...body };
    list[index] = updatedContact;
    await fs.writeFile(contactsPath, JSON.stringify(list));
    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

export { listContacts, getContactById, removeContact, addContact };
