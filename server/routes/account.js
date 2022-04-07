const accountController = require("../controllers/accountController");

const router = require("express").Router();

//ADD A ACCOUNT
router.post("/", accountController.addAAccount);

//GET ALL ACCOUNTS
router.get("/", accountController.getAllAccounts);

//GET A ACCOUNT
router.get("/:id", accountController.getAAccount);

//UPDATE A ACCOUNT
router.put("/:id", accountController.updateAccount);

//DELETE A ACCOUNT
router.delete("/:id", accountController.deleteAccount);

module.exports = router;