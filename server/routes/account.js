const accountController = require("../controllers/accountController");
const auth = require("../controllers/auth");
const upload = require("../middlewares/Upload.js");

const router = require("express").Router();

//ADD A ACCOUNT
router.post("/register", accountController.addAAccount);

router.post("/login", auth.login);

//ADD A ACCOUNT DEPARTMENT MANAGER
router.post(
  "/addAAccountDepartmentManager/",
  auth.isAuthenticated,
  auth.role(["Admin"]),
  accountController.addAAccountDepartmentManager
);

//GET ALL ACCOUNTS
router.get(
  "/getAllAccount/",
  // auth.isAuthenticated,
  // auth.role(["Admin"]),
  accountController.getAllAccounts
);

//GET A ACCOUNT BY ID
router.get(
  "/getAccount/:id",
  // auth.isAuthenticated,
  // auth.role(["Admin"]),
  accountController.getAccountByID
);
router.put("/updateScore", accountController.updateScore);
router.put(
  "/updateAvatar",
  upload.single("avatar"),
  accountController.updateAvatar
);
//UPDATE A ACCOUNT
router.put("/:id", auth.isAuthenticated, accountController.updateAccount);

//DELETE A ACCOUNT
router.delete("/deleteAccount/:id", accountController.deleteAccount);
router.get("/getAccountByQuery/:role", accountController.getAccountByQuery);
router.put("/updateRole/:id", accountController.updateRole);
router.get("/getAllAccQuery", accountController.getAllAccQuery);
router.put("/updatePassword/:id", accountController.updatePassword);
module.exports = router;
