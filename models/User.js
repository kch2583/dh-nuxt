var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: String,
  uid: String,
  password: String,
  grade: { type: Number, default: 2 }
});

mongoose.model("Users", userSchema);
module.exports = mongoose.model("Users");
