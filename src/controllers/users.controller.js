const makeContactsService = require("../services/users.service");
const ApiError = require("../api-error");

async function createUser(req, res, next) {
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

async function getUsersByFilter(req, res, next) {
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

async function login(req, res, next) {
  try {
    const contactsService = makeContactsService();
    const contacts = await contactsService.getUser(
      req.body.username,
      req.body.password
    );
    console.log(contacts);
    if (contacts.length === 0) {
      return next(new ApiError(404, "Khong tim thay thong tin account!"));
    }
    return res.send(contacts);
  } catch (err) {
    console.log(err);
    return next(
      new ApiError(500, "An error orrcured while retrieving the contact")
    );
  }
}

async function getUser(req, res, next) {
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

async function updateUsers(req, res, next) {
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

function deleteUser(req, res, next) {
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

async function deleteAllUsers(req, res, next) {
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
  createUser,
  getUsersByFilter,
  getUser,
  updateUsers,
  deleteUser,
  deleteAllUsers,
  login,
};
