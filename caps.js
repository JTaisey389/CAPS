/* Main Hub Application
Manages the state of every package (ready for pickup, in transit, delivered, etc)
Logs every event to the console with a timestamp and the event payload
i.e. “EVENT {}”*/

const events = require('../event-pool');

function mainHub() {
  events.emit('pickup', payload => {
    events.eventPickup(payload);
    console.timeStamp();
  })
  events.emit('In-transit', payload => {
    events.eventsInTransit(payload);
    console.timeStamp();
  })
  events.emit('Delivered', payload => {
    events.eventsDelivered(payload);
    console.timeStamp();
  })
} 
return mainHub;

