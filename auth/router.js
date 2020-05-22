const express = require('express');
const bcryptjs = require('bcryptjs');
const token = require('jsonwebtoken');
const Users = require('../users/users-model');

const router = express.Router();

router.post('/register', (req, res) => {
  const credentials = req.body;
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcryptjs.hashSync(credentials.password, rounds);

  credentials.password = hash;

  Users.addUsers(credentials)
    .then(user => {
      res.status(500).json({data: user});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

module.exports = router;
