const ApiError = require("../api-error");
let isAdmin = (req, res, next) => {
  const { role_id } = req.auth;
  if (role_id != 2) {
    return next(new ApiError(401, "Required role admin"));
  }
  next();
};

module.exports = {
  isAdmin,
};
