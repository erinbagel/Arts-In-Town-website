var mongoose = require('mongoose');
var Events = mongoose.model('Event');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

//CREATE NEW EVENT
module.exports.createOne = function(req, res) {
  console.log("POST new faculty");
  console.log('req params body' , req.params, req.body);
  Events.create({
    name: req.body.name,
    date: req.body.date,
    time: req.body.time,
    type: req.body.type,
    cost: req.body.cost,
    organizer: req.body.organizer,
    details: req.body.details,
    tags: req.body.tags,
    location: [{
      venueName: req.body.venueName,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    }]
  }, function(err, location) {
    if (err) {
      
      console.log("COULD NOT POST\n", err);
      sendJSONresponse(res, 400, err);
    }
    else {
      console.log("SUCCESSFUL WRITE\n", location);
      sendJSONresponse(res, 201, location);
    }
  });
};

//UPDATE AN EXISTING EVENT
module.exports.eventsUpdateOne = function(req, res) {
  if (!req.params.eventid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, eventid is required"
    });
    return;
  }
  console.log(req.params.eventid);
  Events
    .findById(req.params.eventid)
    .select('name date time cost organizer details tags venueName address zipCode state city streetAddress coords commentAuthor commentContent commentTimestamp')
    //'-' states that we don't want to retreive
    //from db.
    .exec(
      function(err, event) {
        if (!event) {
          sendJSONresponse(res, 404, {
            "message:": "eventid not found"
          });
          return;
        }
        else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (req.body.name !== undefined) {
          event.name = req.body.name;
        }
        if (req.body.date !== undefined) {
          event.date = req.body.date;
        }
        if (req.body.time !== undefined) {
          event.time = req.body.time;
        }
        if (req.body.cost !== undefined) {
          event.cost = req.body.cost;
        }
        if (req.body.organizer !== undefined) {
          event.organizer = req.body.organizer;
        }
        if (req.body.details !== undefined) {
          event.details = req.body.details;
        }
        if (req.body.tags != undefined) {
          event.details = req.body.tags;
        }
        //access location schmea in event schema
        //loc = event.location.id(req.params.locationid);
        if (req.body.venueName !== undefined) {
          console.log('in venueName if')
          console.log(req.body.venueName)
            //not reassigning venueName in Postman
          event.venueName = req.body.venueName;
        }
        //not reassigning value in postman
        if (req.body.address !== undefined) {
          event.address = req.body.address;
        }
        // if (req.body.coords !== undefined) {
        //   coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        // }

        event.save(function(err, event) {
          if (err) {
            sendJSONresponse(res, 404, err);
          }
          else {
            sendJSONresponse(res, 200, event);
          }
        });
      }
    );
};

//DELETE AN EVENT
module.exports.deleteEvent = function(req, res) {
  var eventid = req.params.eventid;
  if (eventid) {
    Events
      .findByIdAndRemove(eventid)
      .exec(
        function(err, location) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("Event id " + eventid + " deleted");
          sendJSONresponse(res, 204, null);
        }
      );
  }
  else {
    sendJSONresponse(res, 404, {
      "message": "No eventid"
    });
  }
};


//GET ALL EVENTS
module.exports.getEvents = function(req, res) {
  console.log('GET all Events');
  console.log(req.query);
  //methods from mongo db driver  
  Events.collection
    .find()
    .toArray(function(err, docs) {
      // error says if query failed
      // docs is the query result, an array
      console.log("Found event", docs.length);
      res
        .status(200) // set res.status to 200 
        .json(docs); // set res.json to docs 
    });
};

//GET TAGS
module.exports.getTags = function(req, res) {
  console.log('GET all tags');
  console.log(req.tags.query);

  Events.collection
    .find()
    .toArray(function(err, docs) {
      console.log("Found tag", docs.length);
      res
        .status(200)
        .json(docs);
    });
};