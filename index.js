const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require('./contacts');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const data = await listContacts()
      console.table(data)
      break;

    case "get":
      const contact = await getContactById(id)
      console.log(contact)
      break;

    case "add":
      const newContact = await addContact(name, email, phone)
      const contacts = await listContacts()
      console.log('New contact: ', newContact)
      console.table(contacts)
      break;

    case "remove":
      const removedContact = await removeContact(id)

      if (!removedContact) {
        console.log('No such contact exists')
        break
      }
      const updContacts = await listContacts()
      console.table(updContacts)
      break

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);