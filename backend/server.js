const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const users = require('./routes/users.routes');

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.use('/users', users);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});