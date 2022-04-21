const mongoose = require("mongoose");

const eventDetailSchema = new mongoose.Schema({
  nameD: {
    type: String,
    required: true,
  },
  descriptionD: {
    type: String,
    required: false,
  },
  timeStart: {
    type: String,
    required: false,
  },
  timeEnd: {
    type: String,
    required: false,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required:true
  }
});

let EventDetail = mongoose.model("EventDetail", eventDetailSchema);

module.exports = EventDetail;
