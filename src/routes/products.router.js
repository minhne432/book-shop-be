const express = require("express");
const productsController = require("../controllers/products.controller");
const router = express.Router();
const { methodNotAllowed } = require("../controllers/errors.controller");
const _AuthMiddleWare = require("../middlewares/verifyToken");
const verifyRoles = require("../middlewares/verifyRoles");
const uploadCloud = require("../middlewares/uploader");

router
  .route("/")
  .get(productsController.getProductsByFilter)
  .post(
    _AuthMiddleWare.isAuth,
    verifyRoles.isAdmin,
    uploadCloud.single("image"),
    productsController.createProduct
  )
  .all(methodNotAllowed);

router
  .route("/:id")
  .get(productsController.getProduct)
  .put(
    _AuthMiddleWare.isAuth,
    verifyRoles.isAdmin,
    uploadCloud.single("image"),
    productsController.updateProduct
  )
  .delete(
    _AuthMiddleWare.isAuth,
    verifyRoles.isAdmin,
    productsController.deleteProduct
  )
  .all(methodNotAllowed);

module.exports = router;
