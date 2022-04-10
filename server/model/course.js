const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
      type: String,
      required:true,
      unique: true
    }
  });


let Course = mongoose.model("Course", courseSchema);

module.exports = { Course };