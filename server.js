//The first thing we need to do is include mongoose in our project and open a connection to the test database on our locally running instance of MongoDB.

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

//We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected")
});

//create a schema
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    default: false,
    type: Boolean
  },
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
}, {
  versionKey: false
});

var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
// module.exports = User;

// create a new user
var newUser = new User({
  name: 'Peter Quill',
  username: 'starlord55',
  password: '12345',
  admin: true
});

var newUser2 = new User({
  name: 'Anne Lim',
  username: 'starlord60',
  password: '22890',
  admin: true
});

// // save the user
// newUser.save(function(err) {
//   if (err) throw err;
//
//   console.log('User created!');
// });
//
// newUser2.save(function(err) {
//   if (err) throw err;
//
//   console.log('User2 created!');
// });

// get a user with ID of
// User.findById("5a71486b4e486603e11386d7", function(err, user) {
//   if (err) throw err;
//
//   // change the users location
//   user.meta.age = 25;
//   user.meta.website = "www.yahoo.com";
//
//   // save the user
//   user.save(function(err) {
//     if (err) throw err;
//
//     console.log('User successfully updated!');
//   });
//
// });


// find the user starlord55
// update him to starlord 88
// User.findOneAndUpdate({
//   username: 'starlord55'
// }, {
//   username: 'starlord88'
// }, function(err, user) {
//   if (err) throw err;

// we have the updated user returned to us
// console.log(user);
// });

// find the user with id
User.findOneAndRemove({
  username: 'peterquill'
}, function(err) {
  if (err) throw err;

  //  we have deleted the user
  console.log('User deleted!');
});


// get all the users
User.find({}, function(err, users) {
  if (err) throw err;

  // object of all the users
  console.log(users);
});

// get the user starlord55
User.find({
  username: 'starlord55'
}, function(err, user) {
  if (err) throw err;

  // object of the user
  console.log(user);
});
//
// // get a user with ID of
User.findById("5a713c8b55ab51036cfd0eb1", function(err, user) {
  if (err) throw err;

  // show the one user
  console.log(user);
});