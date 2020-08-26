var mongoose = require("mongoose");
var ProductSchema = new mongoose.Schema({
  number: Number,
  type: Number,
  pattern: Array,
  color: String,
  image: String
});

mongoose.model("Products", ProductSchema);
module.exports = mongoose.model("Products");
