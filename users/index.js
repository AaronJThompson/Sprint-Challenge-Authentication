const db = require('../database/dbConfig');

function findByUsername(username) {
    return db('users')
        .where({ username })
        .first(); 
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}

function insert(user) {
    return db('users')
        .insert(user)
        .then(ids => findById(ids[0]));
}

function update(id, fields) {
    return db('users')
        .where({id})
        .update(fields)
        .then(() => findById(id));
}