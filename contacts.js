const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return console.error(error.message);
  }
};

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contact = data.find(({ id }) => id === contactId);

    if (!contact) {
      return console.error(`Contact with ID ${contactId} not found!`); 
    };

    return contact;
  } catch (error) {
    return console.error(error.message);
  }
};

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const deletedContact = data.find(({ id }) => id !== contactId);
    const filteredContacts = data.filter(({ id }) => id !== contactId);

    if (!deletedContact) {
      return
    } 
    await fs.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts, null, 2),
      'utf8'
    )
    return deletedContact
    
  } catch (error) {
    return console.error(error.message);
  }
};

async function addContact(name, email, phone) {
  try {
    const data = await listContacts()
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    }

    data.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2), 'utf8')

    return newContact
  } catch (error) {
    return console.error(error.message)
  }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};