const express = require("express");
const addressBook = express.Router();

const AddressBook = require("../models/addressBook.js");

//index route
addressBook.get("/", (req, res) => {
  console.log("address index route hit");
  AddressBook.find({}, (err, foundAddress) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundAddress);
  });
});

//create route
addressBook.post("/", async (req, res) => {
  console.log(req.body + "address Create/Post route hit");
  AddressBook.create(req.body, (error, created) => {
    if (error) {
      res.statusMessage(400).json({ error: error.message });
    }
    res.status(200).send(created);
  });
});

//delete route
addressBook.delete("/:id", (req, res) => {
  console.log("address delete route hit");
  AddressBook.findByIdAndRemove(req.params.id, (err, deletedAdresss) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedAdresss);
  });
});

//update route
addressBook.put("/:id", (req, res) => {
  console.log("address put route hit");
  AddressBook.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedAddress) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedAddress);
    }
  );
});

module.exports = addressBook;
