/* Main Hub Application
Manages the state of every package (ready for pickup, in transit, delivered, etc)
Logs every event to the console with a timestamp and the event payload
i.e. “EVENT {}”*/

// const events = require('../event-pool'); From Yesterday

'use strict';
require('dotenv').config();
const port = process.env.PORT || 3000;

const io = require('socket.io')(port)

// These are the namespaces these are segments of the server
// const vendors = io.of('/vendor-system')
// const drivers = io.of('/drivers-system')
const caps = io.of('/caps-system');

const ordersQueue = {
  pickup = { event: 'pickup', time: new Date(), payload: payload},
  intransit = { event: 'in-transit', time: new Date(), payload: payload },
  delivered = { event: 'delivered', time: new Date(), payload: payload },
}

io.on('connection', (socket) => {
  console.log('CONNECTED', socket.id);
  
});

caps.on('connection', (socket) => {
  socket.on('OrderPlaced', payload => {
    console.log('EVENT', ordersQueue.pickup)
      // let payload = payload
      caps.broadcast.emit('pickup', payload)
  });
  caps.emit('DriverPickup', payload)
  
  socket.on('InTransit', payload => {
    console.log('EVENT', ordersQueue.intransit)
    // let payload = payload
    caps.broadcast.emit('In-Transit', payload)
  })
  socket.on('Delivered', payload => {
    console.log('EVENT', ordersQueue.delivered)
    // let payload = payload
    caps.broadcast.emit('Delivered', payload)
  })
})

//================== Backup Plan ================

// caps.on('connection', socket => {
//   console.log('CONNECTED :' , + socket.id)

//   caps.on('pickup', payload => {
//     console.log('pickup', payload)
//   })
//   caps.broadcase.emit('pickup', payload)
  
//   caps.on('in-transit', payload => {
//     console.log('transit', payload)
//   })
//   caps.broadcase.emit('in-transit', payload)
  
//   caps.on('delivered', payload => {
//     console.log('delivered', payload)
//   })
//   caps.broadcase.emit('delivered', payload)
// })