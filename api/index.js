import express from "express";

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

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://chanhee:kimchan8855@cluster0-1ay2j.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

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
