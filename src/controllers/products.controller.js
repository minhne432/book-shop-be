const makeProductsService = require("../services/products.service");
const ApiError = require("../api-error");
const cloudinary = require("cloudinary").v2;

async function createProduct(req, res, next) {
  if (!req.body?.name) {
    if (req.file != undefined) cloudinary.uploader.destroy(req.file.filename);
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const productsService = makeProductsService();
    const product = await productsService.createProduct(req.body, req.file);

    return res.send(product);
  } catch (error) {
    if (req.file != undefined) cloudinary.uploader.destroy(req.file.filename);
    return next(
      new ApiError(500, "An error orrcured while creating the contact")
    );
  }
}

async function getProductsByFilter(req, res, next) {
  let contacts = [];
  try {
    const contactsService = makeProductsService();
    contacts = await contactsService.getManyProducts(req.query);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error orrcured while retrieving the contact")
    );
  }
  return res.send(contacts);
}

async function getProduct(req, res, next) {
  try {
    const contactsService = makeProductsService();
    const contact = await contactsService.getProductById(req.params.id);
    if (!contact) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
    );
  }
}

async function updateProduct(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    if (req.file != undefined) cloudinary.uploader.destroy(req.file.filename);
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  console.log("updateProduct", req.file);
  try {
    const productsService = makeProductsService();
    const update = await productsService.updateProduct(
      req.params.id,
      req.body,
      req.file
    );
    if (!update) {
      return next(new ApiError(404, "product not found!"));
    }
    return res.send({ message: "product was update successfully!" });
  } catch (error) {
    if (req.file != undefined) cloudinary.uploader.destroy(req.file.filename);
    return next(
      new ApiError(500, `error updating product with id=${req.params.id}`)
    );
  }
}

function deleteProduct(req, res, next) {
  try {
    const productstService = makeProductsService();
    const Delete = productstService.deleteProduct(req.params.id);
    if (!Delete) {
      return next(new ApiError(404, "product not found!"));
    }
    return res.send({ messate: "product was delete successfully!" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `could not delete product with id=${req.params.id}`)
    );
  }
}

module.exports = {
  createProduct,
  getProductsByFilter,
  getProduct,
  updateProduct,
  deleteProduct,
};
