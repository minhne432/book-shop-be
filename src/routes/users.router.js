const express = require("express");
const usersController = require("../controllers/users.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
router
  .route("/")
  .get()
  .post(usersController.login)
  .delete()
  .all(methodNotAllowed);

router.route("/:id").get().put().delete().all(methodNotAllowed);

module.exports = router;
