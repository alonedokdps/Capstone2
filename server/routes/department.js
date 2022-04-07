const departmentController = require("../controllers/departmentController");

const router = require("express").Router();

//ADD DEPARTMENT
router.post("/", departmentController.addDepartment);

//GET ALL DEPARTMENTS
router.get("/", departmentController.getAllDepartments);

//GET AN DEPARTMENT
router.get("/:id", departmentController.getAnDepartment);

//UPDATE AN DEPARTMENT
router.put("/:id", departmentController.updateDepartment);

//DELETE DEPARTMENT
router.delete("/:id", departmentController.deleteDepartment);

module.exports = router;