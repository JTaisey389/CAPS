'use strict'

require('dotenv').config();
const io = require('socket.io-client');
const driver = io.connect(`${process.env.HOST}/caps`);

driver.on('Pickup', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    driver.emit('In-Transit', payload);
  }, 1500);
});

driver.on('In-Tranist', payload => {
  setTimeout(() => {
    console.log(`DRIVER: picked up ${payload.orderId}`);
    driver.emit('Deliver', payload);
  }, 3000);
});

