const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: false,
    },
    organizedBy: {
      type: String,
      required: false,
    },
    dateOfEvent: {
      type: Date,
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
    budgetOfEvent: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
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
      type: String,
      required: false,
    },
    seat: {
      type: Number,
      required: false,

      default: null,
    },
    online: {
      type: Boolean,
      required: false,
      default: false,
    },
    linkOnline: {
      type: String,
      required: false,
      default: false,
    },
    checkDepartment: {
      type: Boolean,
      required: false,
      default: false,
    },
    departmentOfevent: {
      type: String,
      required: false,
      default: false,
    },
    allow: {
      type: Boolean,
      required: false,
      default: false,
    },
    status: {
      type: String,
      enum: ["Pending", "Accept", "Reject"],
      default: "Pending",
    },
  },
  {timestamps: true}
);

let Event = mongoose.model("Event", eventSchema);

module.exports = Event;
