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