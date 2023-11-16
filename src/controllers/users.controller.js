const makeContactsService = require("../services/users.service");
const ApiError = require("../api-error");
const jwt = require("../common/_JVT");

async function register(req, res, next) {
  if (!req.body?.username) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const contactService = makeContactsService();
    const contact = await contactService.createUser(req.body);
    if (!contact) {
      return next(new ApiError(409, "User name is used!"));
    }
    return res.send(contact);
  } catch (error) {
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

    if (contacts.length === 0) {
      return next(new ApiError(404, "Khong tim thay thong tin account!"));
    }

    const user_details = {
      user_id: contacts[0].user_id,
      username: contacts[0].username,
      email: contacts[0].email,
    };
    const _token = await jwt.make(user_details);
    const responseData = {
      user_id: contacts[0].user_id,
      username: contacts[0].username,
      email: contacts[0].email,
      token: _token,
    };

    return res.send({ responseData });
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
  getUsersByFilter,
  getUser,
  updateUsers,
  deleteUser,
  deleteAllUsers,
  login,
  register,
};
