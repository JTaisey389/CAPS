/*  Global Event Pool (shared by all modules) */
'use strict';

const Events = require('events');
const events = new Events();
module.exports = events;