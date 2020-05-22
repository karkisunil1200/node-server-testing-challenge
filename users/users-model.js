const db = require('../data/dbConfig');

module.exports = {
  addUsers,
  getUsers
};

function addUsers(user) {
  return db
    .select('*')
    .from('users')
    .insert(user);
}

function getUsers() {
  return db.select('*').from('users');
}
