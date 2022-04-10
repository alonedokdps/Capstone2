const Course = require("../model/course");
const User = require("../model/account");

const courseController = {
  //ADD COURSE
  addCourse: async (req, res) => {
    try {
      const newCourse = new Course(req.body);
      const savedCourse = await newCourse.save();
      res.status(200).json(savedCourse);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL COURSES
  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.find();
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN COURSE
  getAnCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      res.status(200).json(course);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE COURSE
  updateCourse: async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      await course.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE COURSE
  deleteCourse: async (req, res) => {
    try {
      await User.updateMany({ courseId: req.params.id }, { courseId: null });
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = courseController;
