const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true,
      unique: true
    },
    numberOfSeat: {
      type: Number,
      required:true
    },
    note: {
      type: String
    }
  });
  
  const eventTypeSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true,
      unique: true
    }
  });

let Address = mongoose.model("Address",addressSchema);

module.exports = { Address };