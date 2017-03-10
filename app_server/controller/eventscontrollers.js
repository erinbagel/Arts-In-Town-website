var mongoose = require('mongoose');
var Event = mongoose.model('Event');

module.exports.eventsGetAll = function(req, res) {
    console.log('Read All Events');
    
    Event
      .find()
      .exec(function(err, events) {
          console.log("Found events", events.length);
          
          res
            .json(events);
            
      });
};

module.exports.eventGetOne = function(req, res) {
    console.log('Read one event');
    var id = require.params.venueName;
    console.log('req.params', req.params);
    console.log('GET venueName', id);
    
    Event
     .findOne(id)
     .exec(function(err, doc) {
         if(err) {
             console.log("can't get event", id);
             res
                .status(400)
                .json(err);
         } else {
             res
                .status(200)
                .json(doc);
         }
     });
};

// var _splitArray = function(input) {
//   var output;
//   if (input && input.length > 0) {
//     output = input.split(";");
//   } else {
//     output = [];
//   }
//   return output;
// };
