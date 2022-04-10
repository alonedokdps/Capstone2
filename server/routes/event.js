const eventController = require("../controllers/eventController");
const auth = require("../controllers/auth");

const router = require("express").Router();

//ADD EVENT
router.post("/", auth.isAuthenticated, auth.role(['Admin', 'DepartmentManager']), eventController.addEvent);

//GET ALL EVENTS
router.get("/", auth.isAuthenticated, eventController.getAllEvents);

//GET AN EVENT
router.get("/:id", eventController.getAnEvent);

//UPDATE AN EVENT
router.put("/:id", auth.isAuthenticated, auth.role(['Admin', 'DepartmentManager']), eventController.updateEvent);

//DELETE EVENT
router.delete("/:id", auth.isAuthenticated, auth.role(['Admin', 'DepartmentManager']), eventController.deleteEvent);

module.exports = router;