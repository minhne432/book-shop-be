const ApiError = require("../api-error");
let isAuth = async (req, res, next) => {
  var _token = req.headers.authorization;
  var jwt = require("./_JVT");
  if (_token) {
    try {
      var authData = await jwt.check(_token);

      req.auth = authData;
      next();
    } catch (err) {
      return next(new ApiError(401, "Token is expired or invalid!!"));
    }
  } else {
    return next(new ApiError(401, "Unauthorized"));
  }
};

module.exports = {
  isAuth: isAuth,
};
