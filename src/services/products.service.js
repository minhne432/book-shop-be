const Paginator = require("./paginator");
const knex = require("../database/knex");
function makeContactsService() {
  function readContact(payload) {
    const products = {
      id: payload.id,
      name: payload.name,
      price: payload.price,
    };
    // Remove undefined fields
    Object.keys(products).forEach(
      (key) => products[key] === undefined && delete products[key]
    );
    return products;
  }

  async function createContact(payload) {
    const contact = readContact(payload);
    const [id] = await knex("contacts").insert(contact);
    return { id, ...contact };
  }

  async function getManyContacts(query) {
    const { page = 1, limit = 5 } = query;
    const paginator = new Paginator(page, limit);
    let results = await knex("products")
      .select(
        knex.raw("count(id) OVER() AS recordsCount"),
        "id",
        "name",
        "price"
      )
      .limit(paginator.limit)
      .offset(paginator.offset);
    let totalRecords = 0;
    results = results.map((result) => {
      totalRecords = result.recordsCount;
      delete result.recordsCount;
      return result;
    });
    return {
      metadata: paginator.getMetadata(totalRecords),
      contacts: results,
    };
  }
  async function getContactById(id) {
    return knex("contacts").where("id", id).select("*").first();
  }

  async function updateContact(id, payload) {
    const update = readContact(payload);
    return knex("contacts").where("id", id).update(update);
  }
  async function deleteContact(id) {
    return knex("contacts").where("id", id).del();
  }
  async function deleteAllContacts() {
    return knex("contacts").del();
  }

  return {
    createContact,
    getManyContacts,
    getContactById,
    updateContact,
    deleteContact,
    deleteAllContacts,
  };
}
module.exports = makeContactsService;
