const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('accounts')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('accounts').where('id', id)
}

const create = account => {
  // DO YOUR MAGIC
  return db('accounts')
    .insert(account)
    .then(([id]) => getById(id))
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
  return db('accounts')
    .where('id', id)
    .update(account)
    .then(getById(id))
}

const deleteById = id => {
  // DO YOUR MAGIC
  return db('accounts')
    .where('id', id)
    .del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
