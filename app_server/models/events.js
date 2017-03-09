var mongoose = require('mongoose');

// nested schema,
// declare before parent schema
var locationSchema = new mongoose.Schema({
    venueName: {
        type: String,
        required: true
    },
    address: { 
        type: String,
        required: true
    },
    
    //[Number] looks like  [longitude, latitude]
    coordinates: {type: [Number, Number], index: '2dsphere'}, 
    
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
    organizer: {
        type: String,
        required: true
    },
    details: { 
        type: String,
        required: true
    },
    
    // Add nested schema, reference as an array 
    address:  [locationSchema]
});

// model name, schema name, collection name (optional)
// collection name will be Students by default 
mongoose.model('Event', eventSchema, 'events');
