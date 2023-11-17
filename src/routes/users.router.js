const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const _AuthMiddleWare = require("../middlewares/verifyToken");
router
  .route("/")
  .post(usersController.login)
  .get(_AuthMiddleWare.isAuth, usersController.getCurrent)
  .all(methodNotAllowed);
router.route("/register").post(usersController.register).all(methodNotAllowed);

module.exports = router;
