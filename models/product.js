var mongoose = require("mongoose");
var productSchema = new mongoose.Schema({
  number: Number,
  type: Number,
  pattern: Array,
  color: String,
  image: String
});

mongoose.model("product", productSchema);
module.exports = mongoose.model("product");
