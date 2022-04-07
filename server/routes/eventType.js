const eventTypeController = require("../controllers/eventTypeController");

const router = require("express").Router();

//ADD EVENT TYPE
router.post("/", eventTypeController.addEventType);

//GET ALL EVENT TYPES
router.get("/", eventTypeController.getAllEventTypes);

//GET AN EVENT TYPE
router.get("/:id", eventTypeController.getAnEventType);

//UPDATE AN EVENT TYPE
router.put("/:id", eventTypeController.updateEventType);

//DELETE EVENT TYPE
router.delete("/:id", eventTypeController.deleteEventType);

module.exports = router;