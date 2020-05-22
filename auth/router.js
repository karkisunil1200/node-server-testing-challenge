const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');
const secret = require('../config/vars');

const router = express.Router();

router.post('/register', (req, res) => {
  const credentials = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.password, rounds);

  credentials.password = hash;

  Users.addUsers(credentials)
    .then(user => {
      res.status(200).json({data: user, username: credentials.username});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

router.post('/login', (req, res) => {
  const {username, password} = req.body;

  Users.findBy({username})
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({welcome: username, token});
      } else {
        res.status(401).json({error: 'invalid credentials'});
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

function generateToken(user) {
  const payload = {
    sub: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '1d'
  };

  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
