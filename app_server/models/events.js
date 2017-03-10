var mongoose = require('mongoose');

// nested schema,
// declare before parent schema
var locationSchema = new mongoose.Schema({
    venueName:String,
    address: { 
        type: String,
        required: true
    },
    
    //[Number] looks like  [longitude, latitude]
    coords: {type: [Number], index: '2dsphere'}, 
});

// parent schema
var eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    organizer: String,
    details: { 
        type: String,
        required: true
    },
    
    // Add nested schema, reference as an array 
    location:  [locationSchema]
});

// model name, schema name, collection name (optional)
// collection name will be events by default 
mongoose.model('Event', eventSchema);