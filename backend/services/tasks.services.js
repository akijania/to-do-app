const db = require('../models');
const Task = db.tasks;

exports.getTasks = (req, res) => {
  Task.findAll({ where: { user_id: req.params.userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving tasks.',
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.task || !req.body.userId) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const task = {
    task: req.body.task,
    user_id: req.body.userId,
  };

  // Save User in the database
  Task.create(task)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Task.',
      });
    });
};

exports.remove = (req, res) => {
  const id = req.params.id;

  Task.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Task was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Task with id=${id}. Maybe Task was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Task with id=' + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Task.update(req.body, {
    task: req.body.task,
    where: { id: id },
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Task was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Task with id=${id}. Maybe Task was not found or req.body is empty!`,
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Task with id=' + id,
      });
    });
};

