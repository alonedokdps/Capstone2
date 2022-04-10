const courseController = require("../controllers/courseController");

const router = require("express").Router();

//ADD COURSE
router.post("/", courseController.addCourse);

//GET ALL COURSES
router.get("/", courseController.getAllCourses);

//GET AN COURSE
router.get("/:id", courseController.getAnCourse);

//UPDATE AN COURSE
router.put("/:id", courseController.updateCourse);

//DELETE COURSE
router.delete("/:id", courseController.deleteCourse);

module.exports = router;