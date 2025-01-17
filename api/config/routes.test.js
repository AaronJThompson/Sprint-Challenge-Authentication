const request = require('supertest');
const UsersDB = require('../users');
const server = require('../api/server');
const db = require('../database/dbConfig');

beforeEach(() => {
    return db('users').truncate();
});

describe('Register endpoint tests', () => {
    it('Can register user', async () => {
        return request(server)
            .post('/api/register')
            .send({
                username: "test",
                password: "1234"
            })
            .expect(200)
            .then(async (res) => {
                expect(res.body.username).toBe("test");
                expect(await UsersDB.findByUsername("test")).toBeDefined();
            })
    });

    it("Doesn't register on empty fields", async () => {
        return request(server)
            .post('/api/register')
            .send({
                username: "test",
                password: ""
            })
            .expect(400)
            .then(async (res) => {
                expect(res.body).toEqual({ error: "Username and password needs to be provided" });
            })
    });
});

describe('Login endpoint tests', () => {
    it('Can login', async (done) => {
        let agent = request(server);
        agent.post('/api/register')
            .send({
                username: "test",
                password: "1234"
            })
            .end(() => {
                agent.post('/api/login')
                    .send({
                        username: "test",
                        password: "1234"
                    })
                    .expect(200)
                    .then(res => {
                        expect(res.body.token).toBeDefined();
                        done();
                    })
            })
    });

    it('Refuses on incorrect password', async (done) => {
        let agent = request(server);
        agent.post('/api/register')
            .send({
                username: "test",
                password: "1234"
            })
            .end(() => {
                agent.post('/api/login')
                    .send({
                        username: "test",
                        password: "2345"
                    })
                    .expect(401)
                    .then(res => {
                        expect(res.text).toBe("Incorrect password or username");
                        done();
                    })
            })
    })
})