const roleController = require("../controllers/roleController");

const router = require("express").Router();

//ADD ROLE
router.post("/", roleController.addRole);

//GET ALL ROLES
router.get("/", roleController.getAllRoles);

//GET AN ROLE
router.get("/:id", roleController.getAnRole);

//UPDATE AN ROLE
router.put("/:id", roleController.updateRole);

//DELETE ROLE
router.delete("/:id", roleController.deleteRole);

module.exports = router;