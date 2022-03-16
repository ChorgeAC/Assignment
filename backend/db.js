const nedb = require("nedb");
const users = new nedb({ filename: "db/users.db", autoload: true });

module.exports.users = users;
