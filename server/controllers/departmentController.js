const Department = require("../model/department");
const User = require("../model/account");

const departmentController = {
  //ADD DEPARTMENT
  addDepartment: async (req, res) => {
    try {
      const newDepartment = new Department(req.body);
      const savedDepartment = await newDepartment.save();
      res.status(200).json(savedDepartment);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL DEPARTMENTS
  getAllDepartments: async (req, res) => {
    try {
      const departments = await Department.find();
      res.status(200).json(departments);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN DEPARTMENT
  getAnDepartment: async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      res.status(200).json(department);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE DEPARTMENT
  updateDepartment: async (req, res) => {
    try {
      const department = await Department.findById(req.params.id);
      await department.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE DEPARTMENT
  deleteDepartment: async (req, res) => {
    try {
      await User.updateMany({ departmentId: req.params.id }, { departmentId: null });
      await Department.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = departmentController;
