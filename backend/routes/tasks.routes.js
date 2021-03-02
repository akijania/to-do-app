const express = require('express');
const router = express.Router();
const users = require('../services/tasks.services');

/* Get all tasks from id */
router.get('/:userId', async function(req, res, next) {
  try {
    res.json(await users.getTasks(req.query.page, req.params.userId));
  } catch (err) {
    console.error(`Error while getting tasks `, err.message);
    next(err);
  }
});

/* Create new task */
router.post('/', async function(req, res, next) {
  try {
    res.json(await users.create(req.body));
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    next(err);
  }
});

/* Edit task */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

/* Delete task */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await users.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

module.exports = router;