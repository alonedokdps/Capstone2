const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
  },
  isAttended: {
    type: Boolean,
    default: false,
  },

  QR_Code: {
    type: String,
  },
  timeAttended: {
    type: Date,
    required: false,
  },
});

let Participant = mongoose.model("Participant", participantSchema);

module.exports = Participant;
