const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const allContacts = await fs.readFile(contactPath)
    return JSON.parse(allContacts);
}

async function getContactById(id) {
    const contactId = await listContacts();
    const getId = contactId.find(item => item.id === id)
    return getId || null ;
}

async function addContact(name, email, phone) {
    const addContacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    addContacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(addContacts, null, 2))
    return newContact;
}
  
async function removeContact(id) {
    const deleteContact = await listContacts();
    const index = deleteContact.findIndex(item => item.id === id)
    if (index === -1){
        return null;
    }
    const [result] = deleteContact.splice(index, 1)
    await fs.writeFile(contactPath, JSON.stringify(deleteContact, null, 2))
    return result;
}


module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact
};