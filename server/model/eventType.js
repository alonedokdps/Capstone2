const mongoose = require("mongoose");

const eventTypeSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true,
      unique: true
    }
  });


let EventType = mongoose.model("EventType", eventTypeSchema);

module.exports = { EventType };