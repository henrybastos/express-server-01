const express = require('express');
const app = express();
const PORT = 5050;

app.use(express.json());

let users = [
  { name: 'Henry Bastos da Silva', username: 'henry_bastos', age: 19 },
  { name: 'Jane Doe', username: 'janeDoe', age: 38 }
];

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
})

app.get('/users', (req, res) => {
  try {
    if (users) {
      res.json(users);
    } else {
      throw new Error('No users found.');
    }
  } catch (error) {
    res.status(404).send(error);
    console.error(error);
  }
})

app.get('/profile/:username', (req, res) => {
  try {
    let user = users.filter(obj => obj?.username === req?.params?.username);
    if (user.length > 0) {
      res.status(200).json(user[0]);
    } else {
      throw new Error(`User not found: ${req?.params?.username}`);
    }
  } catch (error) {
    console.error(error);
    res.status(404).send('Error 404: User not found.');
  }
})

app.listen(PORT, () => {
  console.log(`Server opened at http://localhost:${PORT}`);
})