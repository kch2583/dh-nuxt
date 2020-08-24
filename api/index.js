import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product";

// const Product = require("../models/Product.js");
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
mongoose.Promise = global.Promise;
const uri =
  "mongodb+srv://chanhee:kimchan8855@cluster0-1ay2j.mongodb.net/products?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client) {
    if (err) {
      console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
    } else {
      console.log("Connected...");
    }
  }
);

// GET Product - /api/product
router.get(
  "/product",
  catchErrors(async (req, res, next) => {
    const products = await Product.find({}, function(err, products) {
      if (err) return res.status(500).send({ error: "database failure" });
    });
    res.send(products);
  })
);

// POST Create Product - /api/product
// router.post("/product", (req, res) => {
//   var New_product = new Product({
//     number: req.body.number,
//     image: req.body.image,
//     type: req.body.type,
//     pattern: req.body.pattern,
//     color: ""
//   });

//   New_product.save(function(err) {
//     if (err) console.log(err);
//   });
// });

router.post(
  "/product",
  catchErrors(async req => {
    var New_product = new Product({
      number: req.body.number,
      image: req.body.image,
      type: req.body.type,
      pattern: req.body.pattern,
      color: ""
    });

    await New_product.save(function(err) {
      if (err) console.log(err);
    });
    return res.json({ ok: true });
  })
);

router.put(
  "/product/:id",
  catchErrors(async (req, res) => {
    const Edit_product = await Product.findById(req.params.id);
    var product = req.body.product;

    Edit_product.number = product.number;
    Edit_product.type = product.type;
    Edit_product.color = product.color;
    Edit_product.pattern = product.pattern;
    Edit_product.image = product.image;

    await Edit_product.save(function(err) {
      if (err) console.log(err);
    });
    return res.json({ ok: true });
  })
);

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
