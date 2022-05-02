const Participant = require("../model/participant");

const participantController = {
  //REGISTER EVENT
  RegisterEvent: async (req, res) => {
    const participantExists = await Participant.find(
        {
            $and: [
                {eventId: req.body.eventId},
                {accountId: req.body.accountId}
            ] 
        }
    );
    if(participantExists != "")
    {
        res.json({
            message: "You already register this event!"
        })
    }
    else 
    {
        const newParticipant = new Participant({
            Participant_id: "TOKEN_ID_"+req.body.Username + "_Participant",
            accountId: req.body.accountId,
            eventId: req.body.eventId,
        });
        try{
            const savedParticipant = await newParticipant.save();
            res.json({
                Data_QR: {
                    _id: savedParticipant._id,
                    eventId: savedParticipant.eventId
                }
            });
        }
        catch(err)
        {
            res.json({message: err});
        }
    }
  },

  //ATTEND EVENT
  AttendEvent: async (req, res) => {
    const participantExists = await Participant.find();

    for(let i = 0 ; i < participantExists.length ; i++)
    {   
        console.log(participantExists[i]);
        if(participantExists[i].eventId == req.body.eventId && participantExists[i]._id == req.body._id)
        {      
            if(participantExists[i].isAttended == false)
            {
                const updatedParticipant = await Participant.updateOne(
                    { _id: participantExists[i]._id },
                    { $set: { 
                        isAttended: true
                        } 
                    }
                );
    
                res.json({
                    message: "Change attended Successful",
                    // data: updatedParticipant
                });
            }
            else {
                res.json({
                    message: "You already attended this event",
                });
            }
        }
    }
  },

  //GET ALL PARTICIPANT IN EVENT
  getAllParticipants: async (req, res) => {
    try{
      const participants = await Participant.find(
          {eventId: req.body.eventId}
      );
      res.json(participants); 
    }
    catch(err)
    {
        res.json({message : err});
    }
  },

  // REMOVE ALL PARTICIPANT IN EVENT
  RemoveAllParticipant: async (req, res) => {
    try{    
      const removedParticipants = await Participant.remove(
          {eventId: req.body.eventId}
      )
      res.json(removedParticipants);
    }catch(err)
    {
        res.json({message: err});
    }
  },

};

module.exports = participantController;
