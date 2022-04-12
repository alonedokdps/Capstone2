const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    organizedBy: {
      type: String,
      required: true,
    },
    dateOfEvent: {
      type: String,
      required: true,
    },
    timeStart: {
      type: String,
      required: true,
    },
    timeEnd: {
      type: String,
      required: true,
    },
    budgetOfEvent: {
      type: Number,
      required: false,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    eventTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EventType",
    },
    eventDetailId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EventDetail",
      },
    ],
  },
  {timestamps: true}
);

let Event = mongoose.model("Event", eventSchema);

module.exports = Event;
