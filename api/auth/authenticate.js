const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UsersDB = require('../users');
const jwtKey =
  process.env.JWT_SECRET ||
  'add a .env file to root of project with the JWT_SECRET variable';

// quickly see what this file exports
module.exports = {
  authenticate,
  generateToken,
  generateHash,
  verifyPassword
};

// implementation details
function authenticate(req, res, next) {
  const token = req.get('Authorization');

  if (token) {
    jwt.verify(token, jwtKey, (err, decoded) => {
      if (err) return res.status(401).json(err);

      req.decoded = decoded;

      next();
    });
  } else {
    return res.status(401).json({
      error: 'No token provided, must be set on the Authorization Header',
    });
  }
}

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '30d'
  }
  return jwt.sign(payload, jwtKey, options);
}

async function generateHash(password) {
  const hash = await bcrypt.hash(password, 12);
  return hash;
}

async function verifyPassword(username, password) {
  const user = await UsersDB.findByUsername(username);
  return bcrypt.compare(password, user.password);
}