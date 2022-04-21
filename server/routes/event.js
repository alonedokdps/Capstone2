const eventController = require("../controllers/eventController");
const auth = require("../controllers/auth");

const router = require("express").Router();

//ADD EVENT
router.post("/addEvent", eventController.addEvent);

//GET ALL EVENTS
router.post("/updateStatus/:id", eventController.updateStatusEvent);

//GET ALL EVENT
router.get("/getAllEvent", eventController.getAllEvents);

//GET ALL EVENT BY ACCOUNT ID
router.get("/getEventByAccountId/:id", eventController.getAllEventByAccountId);

//GET ALL EVENT PENDING
router.get("/getEventPending", eventController.getAllEventPending);

//GET ALL EVENT ACCEPT
router.get("/getEventAccept", eventController.getAllEventAccept);

//GET ALL EVENT REJECT 
router.get("/getEventReject", eventController.getAllEventReject);

//GET AN EVENT 
router.get("/getEvent/:id", eventController.getEventByEventId);

//UPDATE EVENT
router.put("/updateEvent/:id", eventController.updateEvent);

//DELETE EVENT
router.delete("/deleteEvent/:id", eventController.deleteEvent);// auth.isAuthenticated, auth.role(['Admin', 'DepartmentManager']),

module.exports = router;