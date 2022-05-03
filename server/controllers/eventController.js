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
    const updateStatus = await Event.findByIdAndUpdate(
      req.params.id,
      {status: req.body.status},
      (err, data) => {
        err
          ? res.status(500).send(err.message)
          : res.status(200).send("update status success");
      }
    );
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
          // res.send(details);
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
      res.status(200).json("Deleted successfully!");
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
};

module.exports = eventController;
