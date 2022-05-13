const {json} = require("express/lib/response");
const Event = require("../model/event");
const EventDetail = require("../model/eventDetail");
const eventDetailController = require("./eventDetailController");

const eventController = {
  //ADD EVENT
  addEvent: async (req, res) => {
    const event = new Event(req.body);
    if (req.file) {
      event.img = req.file.path;
    }
    return await event
      .save()
      .then((event) => {
        if (event) {
          if (req.body.details) {
            const convertDetail = JSON.parse(req.body.details);
            const eventDetails = Promise.all(
              convertDetail.map(async (data) => {
                let eventDetail = new EventDetail(data);
                eventDetail.eventId = event._id;
                await eventDetail.save();
              })
            );
          }
          res.json({
            status: true,
            message: "created event successfully",
            data: event,
          });
        }
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  //DUYET EVENT //Truyen vao Status {"status": "Accept"}/ {"status": "Reject"}
  updateStatusEvent: async (req, res) => {
    if (!req.body.status)
      return res.json({success: false, message: "Status is required"});
    const updateStatus = await Event.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
      new: true,
    });
    if (updateStatus) {
      res.status(200).json({success: true, message: "update status success"});
    }
  },

  //GET ALL EVENTS
  getAllEvents: async (req, res) => {
    return await Event.find()
      .then(async (events) => {
        if (events) {
          let allEvent = await Promise.all(
            events.map(async (data) => {
              let details = await EventDetail.find({eventId: data._id}).then(
                (eventD) => {
                  return eventD;
                }
              );
              return {...data.toJSON(), details};
            })
          );
          res.send(await allEvent);
        }
        res.send("something went wrong");
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  //GET ALL EVENT BY ACCOUNT
  //lAY RA CAC SU KIEN MA ACCOUNT DA DANG KI
  getAllEventByAccountId: async (req, res) => {
    return await Event.find({accountId: req.params.id})
      .then(async (events) => {
        if (events) {
          let allEvent = await Promise.all(
            events.map(async (data) => {
              let details = await EventDetail.find({eventId: data._id}).then(
                (eventD) => {
                  return eventD;
                }
              );
              return {...data.toJSON(), details};
            })
          );
          res.status(200).send(await allEvent);
        }
        res.status(400).send("Something went wrong");
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  getEventByEventId: async (req, res) => {
    let event = await Event.findById(req.params.id)
      .then(async (data) => {
        let details = await EventDetail.find({eventId: data._id}).then(
          (eventD) => {
            return eventD;
          }
        );
        res.status(200).send({...data.toJSON(), details});
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  //GET ALL EVENT PENDING
  getAllEventPending: async (req, res) => {
    return await Event.find({status: "Pending"})
      .then(async (events) => {
        if (events) {
          let allEvent = await Promise.all(
            events.map(async (data) => {
              let details = await EventDetail.find({eventId: data._id}).then(
                (eventD) => {
                  return eventD;
                }
              );
              return {...data.toJSON(), details};
            })
          );
          res.status(200).send(await allEvent);
        }
        res.status(400).send("Something went wrong");
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  //GET ALL EVENT ACCEPT
  getAllEventAccept: async (req, res) => {
    return await Event.find({status: "Accept"})
      .then(async (events) => {
        if (events) {
          let allEvent = await Promise.all(
            events.map(async (data) => {
              let details = await EventDetail.find({eventId: data._id}).then(
                (eventD) => {
                  return eventD;
                }
              );
              return {...data.toJSON(), details};
            })
          );
          res.status(200).send(await allEvent);
        }
        res.status(400).send("Something went wrong");
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  //GET ALL EVENT REJECT
  getAllEventReject: async (req, res) => {
    return await Event.find({status: "Reject"})
      .then(async (events) => {
        if (events) {
          let allEvent = await Promise.all(
            events.map(async (data) => {
              let details = await EventDetail.find({eventId: data._id}).then(
                (eventD) => {
                  return eventD;
                }
              );
              return {...data.toJSON(), details};
            })
          );
          res.status(200).send(await allEvent);
        }
        res.status(400).send("Something went wrong");
      })
      .catch((err) => {
        res.status(500).send(err.message);
      });
  },

  //UPDATE EVENT
  updateEvent: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      await event.updateOne({$set: req.body});

      await EventDetail.find({eventId: req.params.id})
        .then((details) => {
          // res.send(details);
          details.map((detail) => {
            const eventDetail = EventDetail.findById(detail._id);
            eventDetail.updateOne({$set: req.body});
          });
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });

      await event.updateOne({$set: req.body});
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE EVENT
  deleteEvent: async (req, res) => {
    try {
      await EventDetail.find({eventId: req.params.id})
        .then((details) => {
          details.map((detail) => {
            let isDelete = eventDetailController.deleteEventDetail(detail._id);
            if (!isDelete) {
              res.status(500).send("Delete Detail Error!");
            }
          });
        })
        .catch((err) => {
          res.status(500).send(err.message);
        });
      await Event.findByIdAndDelete(req.params.id);
      res.status(200).json({success: true, message: "Deleted successfully!"});
    } catch (err) {
      res.status(500).json(err.message);
    }
  },

  //SEARCH EVENT BY EVENT NAME
  Search: async (req, res) => {
    try {
      const q = req.query.name;
      if (!q) return res.status(200).json([]);
      const result = await Event.find({name: {$regex: q, $options: "i"}});
      if (result) {
        res.status(200).json({success: true, data: result});
      }
    } catch (err) {
      res.json({success: false, message: "error"});
    }
  },

  SortByDate: async (req, res) => {
    try {
      const today = new Date(Date.now() - 86400000);
      console.log(today);
      const event = await Event.find({dateOfEvent: {$gte: today}});

      if (event.length > 0) {
        const top10Event = await event.sort(
          (a, b) => a.dateOfEvent - b.dateOfEvent
        );
        // if(top10Event.length>10) top10Event.length = 10
        res.json({
          top10Event,
        });
      } else {
        res.json({message: "Have not Event"});
      }
    } catch (err) {
      res.json({message: err});
    }
  },

  getDate: async (req, res) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const event = await Event.find({dateOfEvent: {$gte: start, $lt: end}});
    if (event.length > 0) {
      res.json({
        event,
      });
    } else {
      res.json({message: "Have not Event"});
    }
  },

  getMonth: async (req, res) => {
    const query = req.query.eventType;
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const event = await Event.find({
      eventTypeId: query,
      dateOfEvent: {$gte: firstDay, $lt: lastDay},
    });
    if (event.length > 0) {
      res.json({
        event,
      });
    } else {
      res.json({message: "Have not Event"});
    }
  },

  getWeek: async (req, res) => {
    const date = new Date();
    const week = Array(7)
      .fill(new Date(date))
      .map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)));

    const event = await Event.find({
      dateOfEvent: {$gte: week.shift(), $lt: week.pop()},
    });
    if (event.length > 0) {
      res.json({
        event,
      });
    } else {
      res.json({message: "Have not Event"});
    }
  },
  getEventByStatus: async (req, res) => {
    const query = req.query.status;

    if (query) {
      const event = await Event.find({status: query});
      if (event.length > 0) {
        res.json({success: true, event});
      } else {
        res.json({success: false, message: "404 Not found"});
      }
    } else {
      const event = await Event.find({});
      res.json({success: true, event});
    }
  },
  getEventByEventype: async (req, res) => {
    const eventType = req.query.eventType;
    const getMethod = req.query.getMethod;
    // const getDay = req.query.getDay;
    // const getWeek = req.query.getWeek;
    // const getOnline = req.query.getOnline;
    // const getDepartment = req.query.getDepartment;
    const date = new Date();
    const week = Array(7)
      .fill(new Date(date))
      .map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)));
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    if (!eventType) return res.json([]);

    if (eventType && getMethod === "get%month") {
      const data = await Event.find({
        status: "Accept",
        eventTypeId: eventType,
        dateOfEvent: {$gte: firstDay, $lt: lastDay},
      });
      if (data) {
        res.json({data});
      } else {
        res.json({message: "No events this week"});
      }
    } else if (eventType && getMethod === "get%week") {
      const data = await Event.find({
        status: "Accept",
        eventTypeId: eventType,
        dateOfEvent: {$gte: week.shift(), $lt: week.pop()},
      });
      if (data) {
        res.json({data});
      } else {
        res.json({message: "No events this week"});
      }
    } else if (eventType && getMethod === "get%day") {
      const tomorrow = new Date();
      tomorrow.setHours(24, 0, 0, 0);
      const data = await Event.find({
        status: "Accept",
        eventTypeId: eventType,
        dateOfEvent: {$gte: new Date(), $lt: tomorrow},
      });
      if (data) {
        res.json(data);
      } else {
        res.json({message: "There are no events today !"});
      }
    } else if (eventType && getMethod === "get%online") {
      const data = await Event.find({
        status: "Accept",
        eventTypeId: eventType,
        online: true,
      });
      if (data) {
        res.json({data});
      } else {
        res.json("No anything event");
      }
    } else {
      const data = await Event.find({
        status: "Accept",
        eventTypeId: eventType,
      });
      if (data) {
        res.json({data});
      } else {
        res.json("No anything event");
      }
    }
  },
};

module.exports = eventController;
