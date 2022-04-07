const { Event, Address, EventType, EventDetail } = require("../model/model");

const eventController = {
  //ADD EVENT
  addEvent: async (req, res) => {
    try {
      const newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();
      res.status(200).json(savedEvent);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL EVENTS
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json(events);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN EVENT
  getAnEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id).populate(['addressId', 'eventTypeId']);
      res.status(200).json(event);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE EVENT
  updateEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      await event.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE EVENT
  deleteEvent: async (req, res) => {
    try {
      await EventDetail.updateMany({ eventId: req.params.id }, { eventId: null });
      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = eventController;
