var mongoose = require ( 'mongoose' );
var gracefulShutdown;
var dbURI = 'mongodb://localhost/artsintown';

//connect to MongoDB using mongoose
// no callbacks after DB connection, instead mongoose listens for events
mongoose.connect(dbURI);

// Monitoring the state of the mongoose connection 
// CONNECTION EVENTS: connected, error, disconnected 
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// For app termination
// listen for events on main node app 
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
            // kills node process (main process)
            process.exit(0);
    });
});
var gracefulShutdown = function(msg, callback) {
    
    // closing the mongoose conenction is asyn, needs callback  
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

//  For heroku
process.on('SIGTERM', function() {
     gracefulShutdown('app termination', function() {
             // kills node process (main process)
             process.exit(0);
     });
});

// BRING IN YOUR SCHEMAS
require('./events');