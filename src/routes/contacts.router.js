const express = require("express");
const contactsController = require("../controllers/contacts.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const _AuthMiddleWare = require("../middlewares/verifyToken");
router
  .route("/")
  .get(contactsController.getContactsByFilter)
  .post(_AuthMiddleWare.isAuth, contactsController.createContact)
  .delete(_AuthMiddleWare.isAuth, contactsController.deleteAllContacts)
  .all(methodNotAllowed);
router

  .route("/:id")
  .get(contactsController.getContact)
  .put(_AuthMiddleWare.isAuth, contactsController.updateContact)
  .delete(_AuthMiddleWare.isAuth, contactsController.deleteContact)
  .all(methodNotAllowed);

module.exports = router;
