const makeContactsService = require("../services/contacts.service");
const ApiError = require("../api-error");

async function createContact(req, res, next) {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const contactService = makeContactsService();
    const contact = await contactService.createContact(req.body);
    return res.send(contact);
  } catch (error) {
    console.console.log(error);
    return next(
      new ApiError(500, "An error orrcured while creating the contact")
    );
  }
}

async function getContactsByFilter(req, res, next) {
  let contacts = [];
  try {
    const contactsService = makeContactsService();
    contacts = await contactsService.getManyContacts(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error orrcured while retrieving the contact")
    );
  }
  return res.send(contacts);
}

async function getContact(req, res, next) {
  try {
    const contactsService = makeContactsService();
    const contact = await contactsService.getContactById(req.params.id);
    if (!contact) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
}

async function updateContact(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const contactService = makeContactsService();
    const update = await contactService.updateContact(req.params.id, req.body);
    if (!update) {
      return next(new ApiError(404, "contact not found!"));
    }
    return res.send({ message: "contact was update successfully!" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `error updating contact with id=${req.params.id}`)
    );
  }
}

function deleteContact(req, res, next) {
  try {
    const contactService = makeContactsService();
    const Delete = contactService.deleteContact(req.params.id);
    if (!Delete) {
      return next(new ApiError(404, "contact not found!"));
    }
    return res.send({ messate: "Contact was delete successfully!" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `could not delete contact with id=${req.params.id}`)
    );
  }
}

async function deleteAllContacts(req, res, next) {
  try {
    const contactService = makeContactsService();
    const deleted = await contactService.deleteAllContacts();
    return res.send({
      message: `${deleted} contacts were deleted successfully!`,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occured while removing all contacts")
    );
  }
}

module.exports = {
  createContact,
  getContactsByFilter,
  getContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
};
