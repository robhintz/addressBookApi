const mongoose = require("mongoose");

const addressBookSchema = mongoose.Schema({
  name: String,
  description: String,
  tag: String,
  lat: String,
  lng: String,
});

module.exports = mongoose.model("AddressBook", addressBookSchema);
