const addressController = require("../controllers/addressController");

const router = require("express").Router();

//ADD ADDRESS
router.post("/", addressController.addAddress);

//GET ALL ADDRESSES
router.get("/", addressController.getAllAddresses);

//GET AN ADDRESS
router.get("/:id", addressController.getAnAddress);

//UPDATE AN ADDRESS
router.put("/:id", addressController.updateAddress);

//DELETE ADDRESS
router.delete("/:id", addressController.deleteAddress);

module.exports = router;