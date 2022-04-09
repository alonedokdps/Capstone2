const Event = require("../model/event");
const EventDetail = require("../model/eventType");

const eventController = {
  //ADD EVENT
  addEvent: async (req, res) => {
    try {
      const {name, desc, img, organized, dateOfEvent, timeStart, timeEnd, budget, addressId, typeId} = newEvent;
      newEvent = new Event(req.body);
      const savedEvent = await newEvent.save();

      const {detailName, detailDesc, detailStart, detailEnd} = newEventDetail;
      newEventDetail = new EventDetail(req.body)
      const savedEventDetail = await newEventDetail.save();
      // newEvent.eventDeId = newEvent._id
      savedEvent.eventDetailId.push(savedEventDetail._id);

      res.status(200).json({savedEvent, savedEventDetail});
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  },

  //GET ALL EVENTS
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.find();
      let resultDetail, eventDetail;
      for(const i =0; i< events.eventDetailId.length; i++){
        eventDetail = this.getAllEventDetail(events.eventDetailId);
        resultDetail.push(eventDetail);
      }
      res.status(200).json({events, resultDetail});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  getAllEventDetail: async (req, res, eventDetailId) => {
    try {
      const eventDetail = await EventDetail.findById({_id: eventDetailId});
      res.status(200).json(eventDetail);
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
      const eventDetail = await EventDetail.findOne({eventId: event._id});

      await event.updateOne({ $set: req.body });
      await eventDetail.updateOne({ $set: req.body });
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
