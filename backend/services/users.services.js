const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, username, email, password FROM users LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta,
  };
}

async function create(user){
  const result = await db.query(
    `INSERT INTO users 
    (username, password, email) 
    VALUES 
    (?, ?, ?)`, 
    [
      user.username, user.password,
      user.email,
    ]
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'New user created successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
};
