var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var userSchema = new mongoose.Schema({
  name: String,
  uid: String,
  password: String
});

// userSchema.methods.generateHash = function(password) {
//   return bcrypt.hash(password, 10); // return Promise
// };

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password); // return Promise
};

mongoose.model("Users", userSchema);
module.exports = mongoose.model("Users");
