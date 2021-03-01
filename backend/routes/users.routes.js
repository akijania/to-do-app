const express = require('express');
const router = express.Router();
const users = require('../services/users.services');

/* Login. */
router.post('/login', async function(req, res, next) {
  try {
    res.json(await users.login(req.body));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

/* Create user. */
router.post('/', async function(req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

module.exports = router;
