const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");

router.route("/").post(usersController.login).all(methodNotAllowed);
router.route("/register").post(usersController.register).all(methodNotAllowed);

module.exports = router;
