const db = require('../data/dbConfig');

module.exports = {
  addUsers,
  getUsers,
  findBy
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

function findBy(filter) {
  return db
    .select('*')
    .from('users')
    .where(filter);
}
