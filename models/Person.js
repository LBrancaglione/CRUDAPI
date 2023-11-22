const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
  name: String,
  email: String,
  password: String,
  phone: [{ number: Number, ddd: Number}],
  date_creation: Date
});

module.exports = Person;
