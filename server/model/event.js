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
      type: Date,
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
    accountId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
    },
    note: {
      type: String
    },
    status: {
      type: String,
      enum: [
        'Pending', 
        'Accept', 
        'Reject'
      ],
      default: 'Pending'
    }
  },
  {timestamps: true}
);

let Event = mongoose.model("Event", eventSchema);

module.exports = Event;
