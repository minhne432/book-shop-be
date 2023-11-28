const Paginator = require("./paginator");
const knex = require("../database/knex");
function makeContactsService() {
  function readProduct(payload) {
    const products = {
      name: payload.name,
      price: payload.price,
      thumbnail: payload.thumbnail,
      description: payload.description,
      category_id: payload.category_id,
    };
    // Remove undefined fields
    Object.keys(products).forEach(
      (key) => products[key] === undefined && delete products[key]
    );
    return products;
  }

  async function createProduct(payload, filedata) {
    let product = readProduct(payload);
    if (filedata != undefined) {
      product.thumbnail = filedata.path;
    } else {
      product.thumbnail = "";
    }
    const [id] = await knex("products").insert(product);
    return { id, ...product };
  }

  async function getManyProducts(query) {
    const { category_id, page = 1, limit = 8 } = query;
    const paginator = new Paginator(page, limit);

    try {
      const baseQuery = knex("products")
        .select(
          "products.id",
          "products.name",
          "products.price",
          "products.thumbnail",
          "products.description",
          "categories.name as categoryName"
        )
        .join("categories", "products.category_id", "categories.id")
        .limit(paginator.limit)
        .offset(paginator.offset);

      let totalRecordsQuery = knex("products")
        .count("id as totalRecords")
        .first();
      let resultsQuery = baseQuery;

      if (category_id) {
        totalRecordsQuery = totalRecordsQuery.where("category_id", category_id);
        resultsQuery = resultsQuery.where("products.category_id", category_id);
      }

      const totalRecordsResult = await totalRecordsQuery;
      const totalRecords = totalRecordsResult.totalRecords || 0;

      const results = await resultsQuery;

      const formattedResults = results.map((result) => ({
        id: result.id,
        name: result.name,
        price: result.price,
        thumbnail: result.thumbnail,
        description: result.description,
        categoryName: result.categoryName,
      }));

      return {
        metadata: paginator.getMetadata(totalRecords),
        products: formattedResults,
      };
    } catch (error) {
      console.error("Lỗi truy vấn cơ sở dữ liệu:", error);
      throw error;
    }
  }

  async function getProductById(id) {
    return knex("products")
      .where("products.id", id)
      .join("categories", "products.category_id", "categories.id")
      .select(
        "products.id",
        "products.name",
        "products.price",
        "products.thumbnail",
        "products.description",
        "categories.name as categoryName"
      )
      .first();
  }

  async function updateProduct(id, payload, filedata) {
    const update = readProduct(payload);
    if (filedata) {
      update.thumbnail = filedata.path;
    }

    console.log(update);
    return knex("products").where("id", id).update(update);
  }
  async function deleteProduct(id) {
    return knex("products").where("id", id).del();
  }

  return {
    createProduct,
    getManyProducts,
    getProductById,
    updateProduct,
    deleteProduct,
  };
}
module.exports = makeContactsService;
