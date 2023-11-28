const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const _AuthMiddleWare = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");
router
  .route("/")
  .post(usersController.login)
  .get(_AuthMiddleWare.isAuth, usersController.getCurrent)
  .all(methodNotAllowed);
router.route("/register").post(usersController.register).all(methodNotAllowed);

router
  .route("/:id")
  .get(_AuthMiddleWare.isAuth, verifyRoles.isAdmin, usersController.getOne);

module.exports = router;
