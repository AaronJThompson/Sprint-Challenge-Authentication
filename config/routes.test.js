const request = require('supertest');
const UsersDB = require('../users');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(() => {
    return db('users').truncate();
});

describe('Authenitication endpoint tests', () => {
    it('Can register user', async () => {
        return request(server)
            .post('/api/register')
            .send({
                username: "test",
                password: "1234"
            })
            .expect(200)
            .then(res => {
                expect(res.body.username).toBe("test");
                expect(await UsersDB.findByUsername("test")).toBeDefined();
            })
    })
})