const knex = require("../database/knex");

function makeUsersService() {
  function readUser(payload) {
    const contact = {
      phone_number: payload.phone_number,
      password: payload.password,
    };
    // Remove undefined fields
    Object.keys(contact).forEach(
      (key) => contact[key] === undefined && delete contact[key]
    );
    return contact;
  }

  async function createUser(payload) {
    const { phone_number } = readUser(payload);
    // Kiểm tra xem username đã tồn tại trong cơ sở dữ liệu hay không
    const existingUser = await knex("users").where({ phone_number }).first();
    // Nếu đã tồn tại, trả về thông báo lỗi
    if (existingUser) {
      return;
    }
    // Nếu không tồn tại, thêm người dùng mới vào cơ sở dữ liệu
    const user = readUser(payload);
    const [id] = await knex("users").insert(user);
    return { id, ...user };
  }

  async function updateContact(id, payload) {
    const update = readUser(payload);
    return knex("users").where("id", id).update(update);
  }
  async function deleteContact(id) {
    return knex("users").where("id", id).del();
  }

  async function getUser(phone_number, password) {
    return knex("users")
      .where("phone_number", phone_number)
      .andWhere("password", password)
      .select("*");
  }

  function getOne(userId) {
    return knex("users").where("id", userId).select("*");
  }

  return {
    getUser,
    updateContact,
    deleteContact,
    createUser,
    getOne,
  };
}
module.exports = makeUsersService;
