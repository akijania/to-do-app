const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getTasks(page = 1, userId){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, task FROM tasks WHERE user_id = ? LIMIT ?,?`, 
    [userId, offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta,
  };
}

async function create(tasks) {
  const result = await db.query(
    `INSERT INTO tasks
    (task, user_id) 
    VALUES 
    (?, ?)`,
    [tasks.task, tasks.userId]
  );

  let message = 'Error in creating user';

  if (result.affectedRows) {
    message = 'New task created successfully';
  }

  return { message };
}

module.exports = {
  getTasks,
  create,
};
