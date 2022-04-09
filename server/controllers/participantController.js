const Participant = require("../model/participant");

const participantController = {
  //ADD A ACCOUNT
  addAParticipant: async (req, res) => {
    try {
      const newParticipant = new Participant(req.body);
      const savedParticipant = await newParticipant.save();
      res.status(200).json(savedParticipant);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET ALL ACCOUNTS
  getAllParticipants: async (req, res) => {
    try {
      const allParticipants = await Participant.find();
      res.status(200).json(allParticipants);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A ACCOUNT
  getAParticipant: async (req, res) => {
    try {
      const participant = await Participant.findById(req.params.id).populate(["accountId", "eventId"]);
      res.status(200).json(participant);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE ACCOUNT
  updateParticipant: async (req, res) => {
    try {
      const participant = await Participant.findById(req.params.id);
      await participant.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE ACCOUNT
  deleteParticipant: async (req, res) => {
    try {
      await Participant.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = participantController;
