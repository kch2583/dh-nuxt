var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
  number: Number,
  type: Number,
  pattern: Array,
  color: String,
  image: String
});

// var Kitten = connection.model("dhProduct", ProductSchema);
module.exports = mongoose.model("dhProduct", ProductSchema);
