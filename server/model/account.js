const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    fullName : {
      type: String,
      required:true
    },
    dateOfBirth: {
      type: Date,
      required:true
    },
    email: {
      type: String,
      unique: true,
      required:true
    },
    phoneNumber: {
      type: String,
      required:true
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    class : {
      type: String,
    },
    userName: {
      type: String,
      required:true
    },
    password: {
      type: String,
      required:true
    },
    role: {
      type: String,
      enum: ['Admin', 'User', 'DepartmentManager'],
      default: 'User'
    }
});


let Account = mongoose.model("Account", accountSchema);

module.exports = { Account };