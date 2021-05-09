'use strict'

// === REFACTORED FROM YESTERDAY ===
require('dotenv').config();
const io = require('socket.io-client'); // npm i socket.io-client TODO
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

const socket = io.connect(`${SERVER_URL}/caps`);

socket.on('pickup', payload => {
  setInterval(() => {
    socket.emit('in-transit', payload)
    console.log(`picking up ${payload.orderID}`)
  }, 1500);
  setInterval(() => {
    socket.emit('delivered', payload)
    console.log('Package left at front door')
  }, 3000);
})