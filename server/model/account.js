const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    email: {
      type: String,

      required: false,
    },
    avatar: {type: String, required: false},
    phone: {
      type: String,
      required: false,
    },
    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: false,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: false,
    },
    class: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["Admin", "User", "DepartmentManager"],
      default: "User",
      required: false,
    },
  },
  {timestamps: true}
);

let Account = mongoose.model("Account", accountSchema);

module.exports = Account;
