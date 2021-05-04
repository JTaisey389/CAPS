/* Declare your store name (perhaps in a .env file, so that this module is re-usable)

Emit a ‘pickup’ event and attach the fake order as payload
HINT: Have some fun by using the faker library to make up phony information
Monitor the system for events …
Whenever the ‘delivered’ event occurs
Log “thank you” to the console */

'use strict';

// this is where we will listen for the events to take place
// our values such as "logger" are called and then we log within the console. 
const faker = require('faker') // remember to install once computer is back
const events = require('../../events/event-pool');

events.on('pickup', object)

setInterval(() => {
  //code to execute
  const newOrder = new fakeOrder();
  //Need to create a new order
  events.emit('pickup', newOrder);
}, 5000);

function productDelivered(payload){
  console.log('order picked up and on the way', payload.delivered)
}

function alertDelivery(payload) {
  if(payload.delivered) {
    console.log('thank you', payload)
  }
}

class fakeOrder{
  constructor() {
    // storeName, orderId, customerName, address
    this.storeName = faker.name.findName();
    this.orderId = faker.name.uuid();
    this.customerName = faker.name.findName();
    this.address = faker.name.streetAddress();
  }
}

module.exports = {fakeOrder, productDelivered, alertDelivery }; 
