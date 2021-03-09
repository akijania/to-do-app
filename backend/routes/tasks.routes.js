const express = require('express');
const router = express.Router();
const tasks = require('../services/tasks.services');


/* Create new task */
router.post('/', tasks.create);

/* Get all tasks from id */
router.get('/:userId', tasks.getTasks);

/* Edit task */
router.put('/:id', tasks.update);

/* Delete task */
router.delete('/:id', tasks.remove);

module.exports = router;
