import express from "express";
import mongoose from "mongoose";
// import Product from "../models/product.js";
const Product = require("../models/product.js");
const catchErrors = require("../middleware/async-error.js");

// Create express router
const router = express.Router();

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
const app = express();
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});

//mongodb 연결

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://chanhee:kimchan8855@cluster0-1ay2j.mongodb.net/dh?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(err => {
  // const collection = client.db("products").collection("product");
  console.log("mongodb");

  // perform actions on the collection object
  client.close();
});

// mongoose.Promise = global.Promise;
// const uri =
//   "mongodb+srv://chanhee:kimchan8855@cluster0-1ay2j.mongodb.net/products?retryWrites=true&w=majority";
// mongoose.connect(
//   uri,
//   { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
//   function(err, client) {
//     if (err) {
//       console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
//     } else {
//       console.log("Connected...");
//     }
//   }
// );

// POST Create Product - /api/product
router.post("/product", (req, res) => {
  console.log("api/product start");

  var New_product = new Product({
    number: req.body.number,
    image: req.body.image,
    type: req.body.type,
    pattern: req.body.pattern,
    color: ""
  });
  console.log("...");

  New_product.save(function(err) {
    if (err) console.log(err);
  });
  console.log(Product.product);
});

// router.post(
//   "/product",
//   catchErrors(async (req, res, next) => {
//     console.log("api/product start");

//     var New_product = new Product({
//       number: req.body.number,
//       image: req.body.image,
//       type: req.body.type,
//       pattern: req.body.pattern,
//       color: ""
//     });
//     console.log("...");

//     await New_product.save();
//     console.log(Product);
//   })
// );

// Add POST - /api/login
router.post("/login", (req, res) => {
  if (req.body.username === "demo" && req.body.password === "demo") {
    req.session.authUser = { username: "demo" };
    return res.json({ username: "demo" });
  }
  res.status(401).json({ message: "Bad credentials" });
});

// Add POST - /api/logout
router.post("/logout", (req, res) => {
  delete req.session.authUser;
  return res.json("logout");
});

// Export the server middleware
export default {
  path: "/api",
  handler: router
};
