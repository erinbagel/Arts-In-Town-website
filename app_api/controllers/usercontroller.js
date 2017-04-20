var mongoose = require('mongoose');
var User = mongoose.model('User');

var bcrypt   = require('bcrypt-nodejs'); 
var jwt      = require('jsonwebtoken');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};



module.exports.register = function(req, res) {

  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  User.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  }, function(err, user) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
      // res.status(400).json(err);
    } else {
      console.log('user created', user);
      sendJSONresponse(res, 201, user);
      // res.status(201).json(user);
    }
  });
};



module.exports.login = function(req, res) {
 
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    username: username
  }).exec(function(err, user) {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {         // password is what user enters
      if (bcrypt.compareSync(password, user.password)) {
        console.log('User found', user);
        // server generates token
        var token = jwt.sign({ username: user.username }, 's3cr3t', { expiresIn: 3600 });
        
        // server sends token to user 
        res.status(200).json({success: true, token: token, user: user});
      } else {
        res.status(401).json('Unauthorized');
      }
    }
  });
};


//GET ALL USER PROFILES
module.exports.getUsers = function(req, res) { 
  console.log('GET all Users');
  console.log(req.query);
  //methods from mongo db driver  
  User.collection
    .find()
    .toArray(function(err, docs) {
      // error says if query failed
      // docs is the query result, an array
      console.log("Found user", docs.length);
      res
        .status(200) // set res.status to 200 
        .json(docs); // set res.json to docs 
    });
};

//GET USER PROFILE BY ID
module.exports.getOneUser = function(req, res) {
  console.log('GET user by id');
  console.log(req.query);
  User
    .findById(req.params.userid)
    .exec(function(err, docs) {
      // error says if query failed
      // docs is the query result, an array
      console.log("Found user", docs.length);
      res
        .status(200) // set res.status to 200 
        .json(docs); // set res.json to docs 
    });
};


//CREATE NEW USER PROFILE
module.exports.userCreate = function(req, res) {
  console.log(req.body);
  console.log("create user profile");
  User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password }, function(err, location) {
    if (err) {
      console.log(err);
      sendJSONresponse(res, 400, err);
    }
    else {
      console.log(location);
      sendJSONresponse(res, 201, location);
    }
  });
};


//DELTE ONE USER BY ID 
module.exports.deleteUser = function(req, res) {
  var userid = req.params.userid;
  if (userid) {
    User
      .findByIdAndRemove(userid)
      .exec(
        function(err, location) {
          if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log("User id " + userid + " deleted");
          sendJSONresponse(res, 204, null);
        }
      );
  }
  else {
    sendJSONresponse(res, 404, {
      "message": "No userid"
    });
  }
};


//UPDATE AN EXISTING USER
module.exports.usersUpdateOne = function(req, res) {
  if (!req.params.userid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, all fields required"
    });
    return;
  }
  console.log(req.params.userid);
  User
    .findById(req.params.userid)
    .select('firstName lastName email username password') 
    //'-' states that we don't want to retreive
    //from db.
    .exec(
      function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, {
            "message:": "userid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (req.body.firstName !== undefined) {
           user.firstName = req.body.firstName;
         }
        if (req.body.lastName !== undefined) {
          user.lastName = req.body.lastName;
        }
        if (req.body.email !== undefined) {
          user.email = req.body.email;
        }
        if (req.body.username !== undefined) {
          user.username = req.body.username;
        }
        if (req.body.password !== undefined) {
          user.password = req.body.password;
        }
     
        user.save(function(err, user) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, user);
          }
        });
      }
  );
};