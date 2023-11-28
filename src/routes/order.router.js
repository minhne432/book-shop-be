const express = require("express");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
router.route("/").get().post().all(methodNotAllowed);

module.exports = router;
