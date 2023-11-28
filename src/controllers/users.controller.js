const makeUsersService = require("../services/users.service");
const ApiError = require("../api-error");
const jwt = require("../middlewares/_JVT");

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
    const contacts = await contactsService.login(
      req.body.phone_number,
      req.body.password
    );

    if (contacts.length === 0) {
      return next(new ApiError(404, "Khong tim thay thong tin account!"));
    }

    const user_details = {
      id: contacts[0].id,
      phone_number: contacts[0].phone_number,
      fullname: contacts[0].fullname,
      role_id: contacts[0].role_id,
    };
    const _token = await jwt.make(user_details);
    const responseData = {
      id: contacts[0].id,
      fullname: contacts[0].fullname,
      phone_number: contacts[0].phone_number,
      email: contacts[0].email,
      role_id: contacts[0].role_id,
      address: contacts[0].address,
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
  if (user_details.length === 0) {
    return next(new ApiError(404, "User not found!"));
  }
  return res.send(user_details);
}
async function getCurrent(req, res, next) {
  console.log(req.auth);
  const { id } = req.auth;
  const userService = makeUsersService();
  const user_details = await userService.getOne(id);
  if (user_details.length === 0) {
    return next(new ApiError(404, "User not found!"));
  }
  return res.send(user_details);
}

module.exports = {
  login,
  register,
  getOne,
  getCurrent,
};
