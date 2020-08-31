var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  uid: String,
  password: String,
  grade: { type: Number, default: 2 }
});

module.exports = mongoose.model("Users", userSchema);
