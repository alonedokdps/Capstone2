const eventController = require("../controllers/eventController");
const auth = require("../controllers/auth");

const router = require("express").Router();
const upload = require("../middlewares/Upload.js");
const {route} = require("express/lib/application");
//ADD EVENT
router.post("/addEvent", upload.single("img"), eventController.addEvent);

//GET ALL EVENTS
router.put("/updateStatus/:id", eventController.updateStatusEvent);

//GET ALL EVENT
router.get("/getAllEvent", eventController.getAllEvents);

//GET ALL EVENT BY ACCOUNT ID
// router.get("/getEventByAccountId/:id", eventController.getAllEventByAccountId);

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

router.post("/uppdateAllow/:id", eventController.uppdateAllow);
//DELETE EVENT
router.delete("/deleteEvent/:id", eventController.deleteEvent); // auth.isAuthenticated, auth.role(['Admin', 'DepartmentManager']),

////SEARCH EVENT EVENT ID AND EVENT NAME
router.get("/Search/", eventController.Search);

router.get("/SortByDate/", eventController.SortByDate);

router.get("/getWeek/", eventController.getWeek);

router.get("/getMonth/", eventController.getMonth);

router.get("/getDate/", eventController.getDate);
router.get("/getEventByStatus", eventController.getEventByStatus);
router.get("/getEventByEventype/", eventController.getEventByEventype);
router.get("/getEventByDepartment/", eventController.getEventByDepartment);
router.get(
  "/getEventByAccountRegisters/:id",
  eventController.getEventByAccountRegisters
);

module.exports = router;
