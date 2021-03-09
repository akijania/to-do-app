const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const users = require('./routes/users.routes');
const tasks = require('./routes/tasks.routes');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static(path.join(__dirname, '../build')));

const db = require('./models');
db.sequelize.sync();

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.use('/users', users);
app.use('/tasks', tasks);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../build/index.html'));
// });



const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;