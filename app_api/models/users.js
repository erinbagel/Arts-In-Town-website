var mongoose = require('mongoose');

var createUserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    
    // hash: String,
    // salt: String,
    
    bookmarks: [String],
    events: [String]
});

// model name, schema name, collection name (optional)
// collection name will be events by default 
mongoose.model('User', createUserSchema, 'users');