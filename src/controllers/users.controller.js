const makeUsersService = require("../services/users.service");
const ApiError = require("../api-error");
const jwt = require("../common/_JVT");

async function register(req, res, next) {
  if (!(req.body?.phone_number && req.body.password)) {
    return next(
      new ApiError(400, "phone number and password can not be empty")
    );
  }
  try {
    const usersService = makeUsersService();
    const contact = await usersService.createUser(req.body);
    if (!contact) {
      return next(new ApiError(409, "Phone number is used!"));
    }
    return res.send(contact);
  } catch (error) {
    return next(
      new ApiError(500, "An error orrcured while creating the contact")
    );
  }
}

async function login(req, res, next) {
  try {
    const contactsService = makeUsersService();
    const contacts = await contactsService.getUser(
      req.body.phone_number,
      req.body.password
    );

    if (contacts.length === 0) {
      return next(new ApiError(404, "Khong tim thay thong tin account!"));
    }

    const user_details = {
      user_id: contacts[0].user_id,
      phone_number: contacts[0].phone_number,
      email: contacts[0].email,
    };
    const _token = await jwt.make(user_details);
    const responseData = {
      id: contacts[0].id,
      phone_number: contacts[0].phone_number,
      email: contacts[0].email,
      access_token: _token,
    };

    return res.send({ responseData });
  } catch (err) {
    console.log(err);
    return next(
      new ApiError(500, "An error orrcured while retrieving the contact")
    );
  }
}

async function getOne(req, res, next) {
  const userService = makeUsersService();
  const user_details = await userService.getOne(req.params.id);
  return res.send(user_details);
}

async function updateUsers(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const contactService = makeUsersService();
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
    const contactService = makeUsersService();
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
    const contactService = makeUsersService();
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
  updateUsers,
  deleteUser,
  deleteAllUsers,
  login,
  register,
  getOne,
};
