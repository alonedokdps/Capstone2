const Address = require("../model/address");
const Event = require("../model/event");

const addressController = {
  //ADD ADDRESS
  addAddress: async (req, res) => {
    try {
      const newAddress = new Address(req.body);
      const savedAddress = await newAddress.save();
      res.status(200).json(savedAddress);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL ADDRESSES
  getAllAddresses: async (req, res) => {
    try {
      const addresses = await Address.find();
      res.status(200).json(addresses);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN ADDRESS
  getAnAddress: async (req, res) => {
    try {
      const address = await Address.findById(req.params.id);
      res.status(200).json(address);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE ADDRESS
  updateAddress: async (req, res) => {
    try {
      const address = await Address.findById(req.params.id);
      await address.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE ADDRESS
  deleteAddress: async (req, res) => {
    try {
      await Event.updateMany({ addressId: req.params.id }, { addressId: null });
      await Address.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = addressController;
