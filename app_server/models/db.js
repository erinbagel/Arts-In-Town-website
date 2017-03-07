var mongoose = require ( 'mongoose' );
var gracefulShutdown;
var dbURI = 'mongodb://localhost/artsintown';
var readline = require("readline");
mongoose.connect(dbURI);

if (process.platform == "win32") 
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("SIGINT", function() {
        process.emit("SIGINT");
    });
}



//print statements to show mongoose connection events
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});


mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
})

//function to close Mongoose connection
var gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + mag);
        callback();
    });
};

//For nodemon restarts
process.once('SIGUSR2', fucntion() {
  gracefulShutdown('nodemon restart', function() {
      process.kill(process.pid, 'SIGUSR2');
  }) ; 
});

//For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});

//For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});