const bcrypt = require("bcrypt");
const express = require("express");
const accounts = express.Router();
const Accounts = require("../models/account");

accounts.get("/", (req, res) => {
  console.log("account index route hit");
  Accounts.find({}, (err, foundAccount) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundAccount);
  });
});

accounts.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  Accounts.create(req.body, (err, createdUser) => {
    console.log("user is created", createdUser);
    res.redirect("/");
  });
});

module.exports = accounts;
