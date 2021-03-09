const express = require('express');
const router = express.Router();
const users = require('../services/users.services');

/* Login. */
router.post('/login', users.login);
/* Create user. */
router.post('/', users.create);

module.exports = router;
