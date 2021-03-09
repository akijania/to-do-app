const db = require('../models');
const User = db.users;

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }
  User.findOne({
    attributes: ['id'],
    where: { username: req.body.username, password: req.body.password },
  })
    .then((data) => {
      if (data === null) {
        res.send({
          message: 'There is no user with such username and password',
        });
      } else {
        res.send({
          data,
          message: 'You are successfully log in',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while log in.',
      });
    });
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
    return;
  }

  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send({ data, message: 'You are successfully registered' });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      });
    });
};
