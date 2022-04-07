const { Role, Account } = require("../model/model");

const roleController = {
  //ADD ROLE
  addRole: async (req, res) => {
    try {
      const newRole = new Role(req.body);
      const savedRole = await newRole.save();
      res.status(200).json(savedRole);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL ROLE
  getAllRoles: async (req, res) => {
    try {
      const role = await Role.find();
      res.status(200).json(role);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN ROLE
  getAnRole: async (req, res) => {
    try {
      const role = await Role.findById(req.params.id);
      res.status(200).json(role);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE ROLE
  updateRole: async (req, res) => {
    try {
      const role = await Role.findById(req.params.id);
      await role.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE Role
  deleteRole: async (req, res) => {
    try {
      await Account.updateMany({ roleId: req.params.id }, { roleId: null });
      await Role.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = roleController;
