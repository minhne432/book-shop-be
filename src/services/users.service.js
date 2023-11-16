const Paginator = require("./paginator");
const knex = require("../database/knex");

function makeContactsService() {
  function readContact(payload) {
    const contact = {
      username: payload.username,
      password: payload.password,
      email: payload.email,
    };
    // Remove undefined fields
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
  }
  async function createContact(payload) {
    const contact = readContact(payload);
    const [id] = await knex("contacts").insert(contact);
    return { id, ...contact };
  }

  async function createUser(payload) {
    const { username } = readContact(payload);

    // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu hay không
    const existingUser = await knex("user_accounts")
      .where({ username })
      .first();

    // Nếu đã tồn tại, trả về thông báo lỗi
    if (existingUser) {
      return;
    }

    // Nếu không tồn tại, thêm người dùng mới vào cơ sở dữ liệu
    const contact = readContact(payload);
    const [id] = await knex("user_accounts").insert(contact);
    return { id, ...contact };
  }

  async function getManyContacts(query) {
    const { name, favorite, page = 1, limit = 5 } = query;
    const paginator = new Paginator(page, limit);
    let results = await knex("contacts")
      .where((builder) => {
        if (name) {
          builder.where("name", "like", `%${name}%`);
        }
        if (favorite !== undefined) {
          builder.where("favorite", 1);
        }
      })
      .select(
        knex.raw("count(id) OVER() AS recordsCount"),
        "id",
        "name",
        "email",
        "address",
        "phone",
        "favorite"
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
  async function getUser(username, password) {
    return knex("user_accounts")
      .where("username", username)
      .andWhere("password", password)
      .select("*");
  }

  return {
    createContact,
    getManyContacts,
    getUser,
    updateContact,
    deleteContact,
    deleteAllContacts,
    createUser,
  };
}
module.exports = makeContactsService;
