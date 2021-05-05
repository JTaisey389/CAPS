'use strict';

require('dotenv').config();
const { fake } = require('faker');
const faker = require('faker') // remember to install once computer is back
const io = require('socket.io-client');
const vendor = io.connect(`${process.env.HOST}/caps`);

setTimeout(() => {
  let fakeOrder = {
    storeName: process.env.SHOP,
    orderID: faker.datatype.uuid(),
    customerName: fake.name.findName(),
    address: faker.address.streetAddress(),
  }
  vendor.emit('CapOrder', fakeOrder)
}, 5000);

vendor.on('Delivered', payload => {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID} `);
})



