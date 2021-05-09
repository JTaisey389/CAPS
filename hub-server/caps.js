'use strict';

//====REFACTOR FROM YESTERDAY====
require('dotenv').config(); //npm i dotenv
const PORT = process.env.PORT || 'http://localhost:3000' // npm i nodemon TODO
const io = require('socket.io')(PORT)// npm i socket.io TODO

const socket = io.connect(`${PORT}/caps`)

// io.on('connection', socket => {
//   console.log('user connected', socket.id);
// })

// const caps = io.of('/caps');

const store1 = 'acme-widgets';
const store2 = '1-206-flowers';

socket.emit('getAll', store1);// from the getAll function in the queue server we will in the queue to see the status 
socket.emit('getAll', store2);

socket.on('pickup', payload => { // on the pickup event we take the payload and console log the event taking place
  console.log(('Event') , {
    event: 'pickup', // assing the event to the pickup event
    time: new Date, // bring in a new date
    payload // instantiat the payload with the two 'Events'
  });
});

socket.on('delvered', payload => {// on the delivered event we get the payload and console log the event
  console.log(('Event'), {
    event: 'delivered', // the event is for delivered which is assigned a new date
    time: new Date,
    payload // instantiate the payload 
  })
});
socket.emit('received', payload)

socket.emit('message', payload => { // pass the message of the payload that it has been received
  console.log(payload);
  socket.emit('received', payload)
})