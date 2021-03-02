const env = process.env;
require('dotenv').config();

const config = {
  db: { 
    host: 'freedb.tech',
    user: 'freedbtech_Ania',
    password: env.DB_PASSWORD,
    database: 'freedbtech_toDoApp',
    multipleStatements: true,
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;