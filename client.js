'use strict';
const store = '1-206-flowers';
const { fake } = require('faker');
const faker = require('faker');

const io = require('socket.io-client');

const HOST = 'http://localhost:3000/caps';

const capsServer = io.connect(HOST);

setInterval(() => {
  let order = {
    store: store,
    orderID: fake.random.uuid(),
    name: faker.name.findName(),
    address: faker.name.streetAddress()
  }
  capsServer.emit('pickup', {
    event:'pickup',
    time: new Date().toISOString(),
    vendorID: store,
    messageId: faker.random.uuid(), // Not entirely sure why it's not happy
    order: order
  })
}, 5000);