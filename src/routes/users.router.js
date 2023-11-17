const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const _AuthMiddleWare = require("../common/_AuthMiddleWare");
router.route("/").post(usersController.login).all(methodNotAllowed);
router.route("/register").post(usersController.register).all(methodNotAllowed);
router
  .route("/profile")
  .get(_AuthMiddleWare.isAuth, usersController.getCurrent);

module.exports = router;
