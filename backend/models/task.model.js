module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('task', {
    id: {
      type: Sequelize.NUMBER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    task: {
      type: Sequelize.STRING,
    },
    user_id: {
      type: Sequelize.NUMBER,
    },

  });
    
  return Task;
};