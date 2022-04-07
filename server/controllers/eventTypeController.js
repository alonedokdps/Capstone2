const { EventType, Event } = require("../model/model");

const eventTypeController = {
  //ADD EVENT TYPE
  addEventType: async (req, res) => {
    try {
      const newEventType = new EventType(req.body);
      const savedEventType = await newEventType.save();
      res.status(200).json(savedEventType);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL EVENT TYPES
  getAllEventTypes: async (req, res) => {
    try {
      const eventTypes = await EventType.find();
      res.status(200).json(eventTypes);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN EVENT TYPE
  getAnEventType: async (req, res) => {
    try {
      const eventType = await EventType.findById(req.params.id);
      res.status(200).json(eventType);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE EVENT TYPE
  updateEventType: async (req, res) => {
    try {
      const eventType = await EventType.findById(req.params.id);
      await eventType.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE EVENT TYPE
  deleteEventType: async (req, res) => {
    try {
      await Event.updateMany({ eventTypeId: req.params.id }, { eventTypeId: null });
      await EventType.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = eventTypeController;
