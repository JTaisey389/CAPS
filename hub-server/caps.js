'use strict';

//====REFACTOR FROM YESTERDAY====
const PORT = process.env.PORT || 3000 // npm i nodemon TODO
const io = require('socket.io')(PORT)// npm i socket.io TODO

io.on('connection', socket => {
  console.log('user connected', socket.id);
})

const caps = io.of('/caps');

caps.on('connection', socket => {
  console.log('connected user - namespace', socket.id);
  
  socket.on('join', room => {
    console.log('room name', room);
    socket.join(room);
  });
  
  socket.on('pickup', payload => {
    logEvent('pickup', payload);
    caps.emit('pickup', payload);
  });
  socket.on('in-transit', payload => {
    logEvent('in-transit', payload);
    caps.to(payload.store).emit('in-transit', payload);
  });
  socket.on('delivered', payload => {
    logEvent('delivered', payload);
    caps.to(payload.store).emit('delivered', payload);
  });
})
// this will log the time and action that takes place
// log the action and the data being passed
// this type is considered a helper function, it is used to help supply information functionality only in this file

function logEvent(event, payload){
  let timestamp = new Date();
  console.log({ timestamp, event, payload });
};
