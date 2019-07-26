const axios = require('axios');
const UsersDB = require('../users');
const { authenticate, generateToken, generateHash, verifyPassword } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  try {
    const {username, password} = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Username and password needs to be provided" });
    }
    const hash = generateHash(password);
    await UsersDB.insert({ username, password: hash });
    res.status(200).json({ username });
  } catch (error) {
    res.status(500).json({ error: "Couldn't register user" });
  }
}

async function login(req, res) {
  try {
    const {username, password} = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "Username and password needs to be provided" });
    }
    if(verifyPassword(username, password)) {
      const user = await UsersDB.findByUsername(username);
      const token = generateToken(user);
      res.status(200).json({ token });
    } else {
      res.status(401).send("Incorrect password or username");
    }
  } catch (error) {
    res.status(500).json({ error: "Couldn't log user in!" });
  }
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
