const eventController = require("../controllers/eventController");

const router = require("express").Router();

//ADD EVENT
router.post("/", eventController.addEvent);

//GET ALL EVENTS
router.get("/", eventController.getAllEvents);

//GET AN EVENT
router.get("/:id", eventController.getAnEvent);

//UPDATE AN EVENT
router.put("/:id", eventController.updateEvent);

//DELETE EVENT
router.delete("/:id", eventController.deleteEvent);

module.exports = router;