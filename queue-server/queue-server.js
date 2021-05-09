'use strict';

//npm init -y
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(PORT);
const uuid = require('uuid').v4;

const server = io.of('/caps');

const queue = {
  'acme-widgets': {},
  '1-206-flowers': {},
}

server.on('connection'), socket => {
  console.log('connected to', socket.id);

  socket.on('pickup', payload => {
    let store = payload.storeName;
    let id = uuid();
    queue[store][id] = payload;
    console.log('current queue:', queue); // logs to the console what the current queue is 
    server.emit(('pickup', {id, payload})); // emit the pickup event for the payload with the assigned id which is within an array
  })
  socket.on('inTransit', payload => {
    server.emit('inTransit', payload)// fire off to the appropriate routes that the payload is "inTransit"
  })
  socket.on('delivered', payload => {
    server.emit('delivered', payload) // telling the appropriate routes that the package was delivered to the client
  })
  socket.on('getAll', payload => { // for this socket.on we are getting all the items in the payload
    Object.keys(queue[payload]).forEach((id) => { // all the objects in the payload are loaded into the queue and asigned an id with the forEach method
      server.emit('message', { payload: queue[payload][id]}); // the server then emits the message of the payloads queue with the payload and the assigned id
    })
  })
  socket.on('received', payload => { // this is the receiving event for when the payload is delivered
    let store = payload.payload.storeName; // assigning the store the payload and a storname
    let orderId = payload.id; // the orderId is assigned the payload with an id
    console.log('current queue', queue[store][orderId]); // this logs what the current queue is with the store information and the orders id
    delete queue[store][orderId]; // once the payload is delivered the information needs to be removed out of the queue and that takes place here
  })
}