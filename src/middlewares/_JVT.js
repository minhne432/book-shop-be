const jwt = require("jsonwebtoken");
const _APP = require("./_APP");
// make => create token

let make = function (user) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      user,
      _APP.ACCESS_TOKEN,
      {
        algorithm: "HS256",
        expiresIn: _APP.TOKEN_TIME_LIFE,
      },
      (err, _token) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(_token);
        }
      }
    );
  });
};

// check => validate token
let check = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, _APP.ACCESS_TOKEN, (err, data) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(data);
      }
    });
  });
};

module.exports = {
  make: make,
  check: check,
};
