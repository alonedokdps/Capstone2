const Event = require("../model/event");
const EventDetail = require("../model/eventDetail");

const eventDetailController = {
  //ADD EVENT DETAIL
  addEventDetail: async (req, res) => {
    try{
      // console.log(req.body);
      const eventDetails = await Promise.all(req.body.map(async data =>{
        const event = Event.findById(data.eventId);
        if(event){
          let eventDetail = new EventDetail(data);
          await eventDetail.save();
        }else {
          res.send("something went wrong");
        }
      }));
      res.status(200).send("add event detail success");
    }catch (err){
      res.status(500).send(err.message);
    }
  },

  //GET ALL EVENT DETAILS
  getAllEventDetails: async (req, res) => {
    try {
      const eventDetails = await EventDetail.find();
      res.status(200).json(eventDetails);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET AN EVENT DETAIL
  getAnEventDetail: async (req, res) => {
    try {
      const eventDetail = await EventDetail.findById(req.params.id).populate("eventId");
      res.status(200).json(eventDetail);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE EVENT DETAIL
  updateEventDetail: async (req, res) => {
    try {
      const eventDetail = await EventDetail.findById(req.params.id);
      await eventDetail.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE EVENT DETAIL
  deleteEventDetail: async (req, res) => {
    try {
        await EventDetail.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfully");
      } catch (err) {
        res.status(500).json(err);
      }
  },
};

module.exports = eventDetailController;
