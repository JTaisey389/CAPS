/*  Global Event Pool (shared by all modules) */
'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;

const io = require('socket.io')(port)
require('./server/caps')(io);
require('./diver/driver')(io);
require('./vendor/vendor')(io);
//Refactored from yesterday
