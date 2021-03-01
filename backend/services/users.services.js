const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function login(user) {
  const userId = await db.query(
    `SELECT id FROM users WHERE username = ? AND password = ?`,
    [user.username, user.password]
  );
  let message = 'Error in log in';
  if (userId.length === 0) {
    throw message;
  } else {
    message = 'You are successfully log in';
    return {userId, message};}
}

async function create(user) {
  const result = await db.query(
    `INSERT INTO users 
    (username, password, email) 
    VALUES 
    (?, ?, ?)`,
    [user.username, user.password, user.email]
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'New user created successfully. Please log in';
  }

  return { message };
}

module.exports = {
  login,
  create,
};
