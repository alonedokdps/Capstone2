const participantController = require("../controllers/participantController");

const router = require("express").Router();

//ADD A PARTICIPANT
router.post("/", participantController.addAParticipant);

//GET ALL PARTICIPANTS
router.get("/", participantController.getAllParticipants);

//GET A PARTICIPANT
router.get("/:id", participantController.getAParticipant);

//UPDATE A PARTICIPANT
router.put("/:id", participantController.updateParticipant);

//DELETE A PARTICIPANT
router.delete("/:id", participantController.deleteParticipant);

module.exports = router;