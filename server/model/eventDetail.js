const mongoose = require("mongoose");

const eventDetailSchema = new mongoose.Schema({
    name : {
      type: String,
      required:true
    },
    description : {
      type: String,
      required:true
    },
    timeStart: {
      type: String,
      required:true
    },
    timeEnd: {
      type: String,
      required:true
    },
    
  });


let EventDetail = mongoose.model("EventDetail", eventDetailSchema);

module.exports = { EventDetail };