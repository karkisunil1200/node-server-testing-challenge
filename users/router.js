const express = require('express');
const Users = require('./users-model');
const restricted = require('../auth/restricted-middleware');

const router = express.Router();

router.use(restricted);

router.get('/', (req, res) => {
  Users.getUsers()
    .then(users => {
      res.status(200).json({data: users});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});

router.delete('/:id', (req, res) => {
  const {id} = req.params;

  Users.remove(id)
    .then(user => {
      res.status(200).json({data: user});
    })
    .catch(err => {
      res.status(500).json({error: err.message});
    });
});
module.exports = router;
