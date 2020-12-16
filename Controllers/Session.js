const bcrypt = require("bcrypt");
const express = require("express");
const sessions = express.Router();
const Accounts = require("../models/account");

sessions.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

// on sessions form submit (log in)
sessions.post("/", (req, res) => {
  // username is found and password matches
  // successful log in

  // username is not found - who cares about password if you don't have a username that is found?
  // unsuccessful login

  // username found but password doesn't match
  // unsuccessful login

  // some weird thing happened???????

  // Step 1 Look for the username
  Accounts.findOne({ username: req.body.username }, (err, foundUser) => {
    // Database error
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else if (!foundUser) {
      // if found user is undefined/null not found etc
      res.sendStatus(404);
    } else {
      // user is found yay!
      // now let's check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        // add the user to our session
        req.session.currentUser = foundUser;
        res.sendStatus(200);
      } else {
        // passwords do not match
        res.sendStatus(400);
      }
    }
  });
});

sessions.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.send("destory");
  });
});

module.exports = sessions;
