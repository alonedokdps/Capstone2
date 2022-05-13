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
router.get("/getRegistered", participantController.getRegistered);
router.get("/getAttended", participantController.getAttended);
router.get(
  "/getRegisteredOfEvent/:id",
  participantController.getRegisteredOfEvent
);
router.get("/getAttendedOfEvent/:id", participantController.getAttendedOfEvent);
router.get(
  "/checkStatusAttendedOrRegistered/:id",
  participantController.checkStatusAttendedOrRegistered
);
module.exports = router;
