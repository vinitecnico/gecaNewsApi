const addUser = require('./user/add').add;
const removeUser = require('./user/remove').remove;
const updateUser = require('./user/update').update;
const filterUser = require('./user/filter').filter;
const addNewsDatabase = require('./newsDatabase/add').add;
const updateNewsDatabase = require('./newsDatabase/update').update;
const removeNewsDatabase = require('./newsDatabase/remove').remove;
const getByIdNewsDatabase = require('./newsDatabase/getById').getById;
const filterNewsDatabase = require('./newsDatabase/filter').filter;
const addNews = require('./news/add').add;
const updateNews = require('./news/update').update;
const removeNews = require('./news/remove').remove;
const getByIdNews = require('./news/getById').getById;
const filterNews = require('./news/filter').filter;

module.exports = {
  addUser,
  removeUser,
  updateUser,
  filterUser,
  addNewsDatabase,
  updateNewsDatabase,
  removeNewsDatabase,
  getByIdNewsDatabase,
  filterNewsDatabase,
  addNews,
  updateNews,
  removeNews,
  getByIdNews,
  filterNews
}