/* Monitor the system for events …
On the ‘pickup’ event …
Wait 1 second
Log “DRIVER: picked up [ORDER_ID]” to the console.
Emit an ‘in-transit’ event with the payload you received
Wait 3 seconds
Log “delivered” to the console
Emit a ‘delivered’ event with the same payload
*/
'use strict'

const events = require('../event-pool');

events.on('pickup', );
// events.on('', );


function productDelivered(payload){
  setInterval(() => {
    events.emit('delivered', payload);
    console.log(`DRIVER: picked up ${payload.orderId}`);
    events.emit('in-transit', payload);
  }, 1000) 
}

function productOnway(payload){
  setInterval(() => {
    events.emit('delivered', payload);
  events.emit('Left at front door', payload);
  }, 3000);
}
  

module.exports = { productDelivered }; //check on what to insert