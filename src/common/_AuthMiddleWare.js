let isAuth = async (req, res, next) => {
  var _token = req.headers.authorization;
  var jwt = require("./_JVT");
  if (_token) {
    try {
      var authData = await jwt.check(_token);

      req.auth = authData;
      next();
    } catch (err) {
      return res.send({ content: "Token is invalid!!!!!" });
    }
  } else {
    return res.send({ content: "Token is invalid!!!!!" });
  }
};

module.exports = {
  isAuth: isAuth,
};
