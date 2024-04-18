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

export { listContacts,getContactById};

