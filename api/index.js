import express from "express";
import mongoose from "mongoose";
// import Product from "../models/Product";
// import User from "../models/User";
var Product = require("../models/Product");
var User = require("../models/User");

const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

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

// DELETE product - /api/product/:id
router.delete(
  "/product/:id",
  catchErrors(async (req, res) => {
    const Delete_product = await Product.findById(req.params.id);

    await Delete_product.delete();

    return res.json({ ok: true });
  })
);

// ------------------- user ------------------------------------------------------

// GET user - /api/user
router.get(
  "/user",
  catchErrors(async (req, res, next) => {
    const users = await User.find({}, function(err, users) {
      if (err) return res.status(500).send({ error: "database failure" });
    });
    res.send(users);
  })
);

// CREATE user POST - /api/user
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

      await New_user.save(function(err) {
        if (err) console.log(err);
      });
      return res.json({ ok: true });
    }
  })
);

// EDIT user PUT - /api/user/:id  비밀번호 변경
router.put(
  "/user/:id",
  catchErrors(async (req, res) => {
    var user = req.body.user;
    var Edit_user = await User.findById(req.params.id);
    var passwordMatch = bcrypt.compareSync(Edit_user.password, user.password);
    if (Edit_user && passwordMatch) {
      const hashedPassword = bcrypt.hashSync(user.newPassword, salt);
      Edit_user.password = hashedPassword;
      await New_user.save(function(err) {
        if (err) console.log(err);
        return res.json({ ok: true });
      });
    } else {
      return res.json({ message: "현재 비밀번호가 일치하지 않습니다." });
    }
  })
);

router.delete(
  "/user/:id",
  catchErrors(async (req, res) => {
    var Delete_user = await User.findById(req.params.id);
    await Delete_user.delete();
    return res.json({ ok: true });
  })
);

// ----------------- login & logout -----------------------------------------------

// Add POST - /api/login
router.post(
  "/login",
  catchErrors(async (req, res) => {
    var findUser = await User.findOne({ uid: req.body.username });
    var passwordMatch = bcrypt.compareSync(
      req.body.password,
      findUser.password
    );

    if (findUser && passwordMatch) {
      req.session.authUser = { username: findUser.name };
      // return res.json({ username: findUser.name });

      return res.json(findUser);
    }
    res.status(401).json({ message: "아이디나 비밀번호가 틀렸습니다." });
  })
);

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
