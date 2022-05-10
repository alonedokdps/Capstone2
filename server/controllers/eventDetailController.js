const Event = require("../model/event");
const EventDetail = require("../model/eventDetail");

const eventDetailController = {
  //ADD EVENT DETAIL
  addEventDetail: async (req, res) => {
    try {
      // console.log(req.body);
      const eventDetails = await Promise.all(
        req.body.map(async (data) => {
          const event = Event.findById(data.eventId);
          if (event) {
            let eventDetail = new EventDetail(data);
            await eventDetail.save();
          } else {
            res.send("something went wrong");
          }
        })
      );
      res.status(200).send("add event detail success");
    } catch (err) {
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
    const eventdetail = await EventDetail.findById(req.params.id).exec();
    res.json(eventdetail);

    // try {
    //   const eventDetail = await EventDetail.findById(req.params.id).populate(
    //     "eventId"
    //   );

    //   res.json({success: true, eventDetail});
    // } catch (err) {
    //   res.status(500).json(err);
    // }
  },

  //UPDATE EVENT DETAIL
  updateEventDetail: async (detail) => {
    const eventDetail = await EventDetail.findById(detail._id);
    await eventDetail.updateOne({$set: detail.body});
  },

  //DELETE EVENT DETAIL
  deleteEventDetail: async (eventDetailId) => {
    let isDelete = await EventDetail.findByIdAndDelete(eventDetailId);
    return isDelete ? true : false;
  },
};

module.exports = eventDetailController;
