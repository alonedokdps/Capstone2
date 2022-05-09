const participantController = require("../controllers/participantController");

const router = require("express").Router();

//REGISTER EVENT ADD A PARTICIPANT
router.post("/RegisterEvent/", participantController.RegisterEvent);

//ATTEND EVENT
router.patch("/AttendEvent/", participantController.AttendEvent);

//GET ALL PARTICIPANTS IN EVENT
router.get("/GetAllParticipants", participantController.getAllParticipants);

//DELETE ALL PARTICIPANTS IN EVENT
router.delete(
  "/RemoveAllParticipant",
  participantController.RemoveAllParticipant
);

module.exports = router;
