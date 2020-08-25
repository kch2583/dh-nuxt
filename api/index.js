import express from "express";
import mongoose from "mongoose";
import Product from "../models/Product";
import User from "../models/User";

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

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

// --------------------- product ------------------------------------------------

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
router.post(
  "/product",
  catchErrors(async req => {
    var product = req.body.product;
    var New_product = new Product({
      number: product.number,
      image: product.image,
      type: product.type,
      pattern: product.pattern,
      color: ""
    });

    await New_product.save(function(err) {
      if (err) console.log(err);
    });
    return res.json({ ok: true });
  })
);

// EDIT PUT - /api/product/:id
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

router.delete(
  "/product/:id",
  catchErrors(async (req, res) => {
    const Delete_product = await Product.findById(req.params.id);

    await Delete_product.delete();

    return res.json({ ok: true });
  })
);

// ------------------- user ------------------------------------------------------

router.get(
  "/user",
  catchErrors(async (req, res, next) => {
    const users = await User.find({}, function(err, users) {
      if (err) return res.status(500).send({ error: "database failure" });
    });
    res.send(users);
  })
);

router.post(
  "/user",
  catchErrors(async (req, res) => {
    var user = req.body.user;
    var findUser = await User.findOne({ uid: user.uid });
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    if (findUser) {
      res.json({ ok: false });
    } else {
      const New_user = new User({
        name: user.name,
        uid: user.uid,
        password: hashedPassword
      });
      // New_user.password = New_user.generateHash(user.password);
      await New_user.save(function(err) {
        if (err) console.log(err);
      });
    }
  })
);

router.put(
  "/user/:id",
  catchErrors(async (req, res) => {
    var user = req.body.user;
    var findUser = await User.findOne({ uid: user.uid });
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    var result = bcrypt.compareSync(password, user.password);
    if (findUser) {
      res.json({ ok: false });
    } else {
      const New_user = new User({
        name: user.name,
        uid: user.uid,
        password: hashedPassword
      });
      // New_user.password = New_user.generateHash(user.password);
      await New_user.save(function(err) {
        if (err) console.log(err);
      });
    }
  })
);

// ----------------- login & logout -----------------------------------------------

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
