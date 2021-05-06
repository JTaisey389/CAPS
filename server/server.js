'use strict';
//TODO npm init -y
const express = require('express'); // npm i express TODO
const app = express();
const cors = require('cors');// npm i cors TODO
const faker = require('faker'); // npm i faker TODO
const io = require('socket.io-client'); // npm i socket.io-client TODO
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io.connect(`${SERVER_URL}/caps`);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for the API
app.post('/pickup', (req, res) => {
  let pckg = req.body || {
      store: store,
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: faker.address.streetAddress(),
  }
  socket.emit('pickup', pckg);
  res.status(200).send('your package is scheduled for pickup');
})

app.listen(PORT, () => {
  console.log (`Up on http://localhost:${PORT}`);
})