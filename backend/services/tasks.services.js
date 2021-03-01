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

  let message = 'Error in creating task';

  if (result.affectedRows) {
    message = 'New task created successfully';
  }

  return { message };
}

async function update(id, tasks){
  const result = await db.query(
    `UPDATE tasks 
    SET task=?
    WHERE id=?`, 
    [
      tasks.task, id,
    ]
  );

  let message = 'Error in updating task';

  if (result.affectedRows) {
    message = 'Task updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM tasks WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting task';

  if (result.affectedRows) {
    message = 'Task deleted successfully';
  }

  return {message};
}

module.exports = {
  getTasks,
  create,
  update,
  remove,
};
