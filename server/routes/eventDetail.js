const eventDetailController = require("../controllers/eventDetailController");

const router = require("express").Router();

//ADD EVENT DETAIL
router.post("/", eventDetailController.addEventDetail);

//GET ALL EVENT DETAILS
router.get("/", eventDetailController.getAllEventDetails);

//GET AN EVENT DETAIL
router.get("/getAnEventDetail/:id", eventDetailController.getAnEventDetail);

//UPDATE AN EVENT DETAIL
router.put("/:id", eventDetailController.updateEventDetail);

//DELETE EVENT DETAIL
router.delete("/:id", eventDetailController.deleteEventDetail);

module.exports = router;
