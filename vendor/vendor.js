'use strict';
// require('dotenv').config();
// const { fake } = require('faker');
// const faker = require('faker') // remember to install once computer is back
// const io = require('socket.io-client');
// const vendor = io.connect(`${process.env.HOST}/caps`);

// setTimeout(() => {
//   let fakeOrder = {
//     storeName: process.env.SHOP,
//     orderID: faker.datatype.uuid(),
//     customerName: fake.name.findName(),
//     address: faker.address.streetAddress(),
//   }
//   vendor.emit('CapOrder', fakeOrder)
// }, 5000);

// vendor.on('Delivered', payload => {
//   console.log(`VENDOR: Thank you for delivering ${payload.orderID} `);
// })
//==== REFACTORED FROM YESTERDAY ====
const faker = require('faker')//npm i faker TODO
const io = require('socket.io-client'); //npm i socket.io-client TODO
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io.connect(`${SERVER_URL}/caps`);
const store = '1-800-flowers';

socket.emit('join', store);

const store1 = 'acme-widgets';
const store2 = '1-206-flowers';

socket.on('delivered', payload => {
  console.log(`thank you for delivering ${payload.orderID}`)
})

setInterval(() => {
  let pckg = {
    store: store1,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  }
  socket.emit('pickup', pckg);
}, 3000);
setInterval(() => {
  let pckg = {
    store: store2,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress(),
  }
  socket.emit('pickup', pckg);
}, 3000);


