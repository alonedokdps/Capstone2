const Participant = require("../model/participant");

const participantController = {
  //REGISTER EVENT
  RegisterEvent: async (req, res) => {
    // const eventId = req.body.eventId;
    // const accountId = req.body.accountId;
    // console.log(accountId);
    const participantExists = await Participant.find({
      $and: [{eventId: req.body.eventId}, {accountId: req.body.accountId}],
    });
    if (participantExists.length > 0) {
      return res.json({
        success: false,
        message: "You have registered for this event ",
      });
    }
    try {
      const newParticipant = new Participant({
        Participant_id: "TOKEN_ID_" + req.body.Username + "_Participant",
        accountId: req.body.accountId,
        eventId: req.body.eventId,
      });
      const savedParticipant = await newParticipant.save();
      res.json({
        Data_QR: {
          success: true,
          _id: savedParticipant._id,
          eventId: savedParticipant.eventId,
          message: "Participant registered successfully !",
        },
      });
    } catch (err) {
      res.json({message: err});
    }
  },
  //get registered event
  getRegisteredOfEvent: async (req, res) => {
    try {
      const registered = await Participant.find({
        eventId: req.params.id,
        isAttended: false,
      });
      if (registered) {
        res.json(registered);
      } else {
        res.json([]);
      }
    } catch (err) {
      res.json({message: err});
    }
  },
  getAttendedOfEvent: async (req, res) => {
    try {
      const attended = await Participant.find({
        eventId: req.params.id,
        isAttended: true,
      });
      if (registered) {
        res.json(registered);
      } else {
        res.json([]);
      }
    } catch (err) {
      res.json({message: err});
    }
  },
  //get registered
  getRegistered: async (req, res) => {
    try {
      const registered = await Participant.find({isAttended: false});
      if (registered.length > 0) {
        res.json({registered});
      } else {
        res.json([]);
      }
    } catch (err) {
      res.json({message: err});
    }
  },
  //get attend
  getAttended: async (req, res) => {
    try {
      const attended = await Participant.find({isAttended: true});
      if (attended.length > 0) {
        res.json({attended});
      } else {
        res.json([]);
      }
    } catch (err) {
      res.json({message: err});
    }
  },
  //ATTEND EVENT
  AttendEvent: async (req, res) => {
    const participantExists = await Participant.find();

    for (let i = 0; i < participantExists.length; i++) {
      if (
        participantExists[i].eventId == req.body.eventId &&
        participantExists[i]._id == req.body._id
      ) {
        if (participantExists[i].isAttended == false) {
          const updatedParticipant = await Participant.updateOne(
            {_id: participantExists[i]._id},
            {
              $set: {
                isAttended: true,
                // timeAttended: new Date(),
              },
            }
          );

          res.json({
            success: true,
            message: " attended Successful",
            // data: updatedParticipant,
          });
        } else {
          res.json({
            success: true,
            message: "You already attended this event",
          });
        }
      }
    }
  },

  //GET ALL PARTICIPANT IN EVENT
  getAllParticipants: async (req, res) => {
    if (req.query.eventId === "") return res.json([]);
    try {
      const participants = await Participant.find({
        eventId: req.query.eventId,
      });
      if (participants) {
        res.json(participants);
      }
    } catch (err) {
      res.json({message: err});
    }
  },

  // REMOVE ALL PARTICIPANT IN EVENT
  RemoveAllParticipant: async (req, res) => {
    try {
      const removedParticipants = await Participant.remove({
        eventId: req.body.eventId,
      });
    } catch (err) {
      res.json({message: err});
    }
  },
  checkStatusAttendedOrRegistered: async (req, res) => {
    const check = await Participant.find({
      eventId: req.params.id,
      accountId: req.query.accId,
    });

    if (check.length === 0) return res.json("You are not registered");
    if (check) {
      const x = check.filter((item) => {
        if (item.accountId == req.query.accId) {
          return item;
        }
      });
      if (x !== []) {
        if (x[0].isAttended === false) {
          res.json("registered");
        } else {
          res.json("attended");
        }
      }
    }
  },
};

module.exports = participantController;
