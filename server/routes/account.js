const accountController = require("../controllers/accountController");
const auth = require("../controllers/auth");

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

//UPDATE A ACCOUNT
router.put("/:id", auth.isAuthenticated, accountController.updateAccount);

//DELETE A ACCOUNT
router.delete(
  "/:id",
  auth.isAuthenticated,
  auth.role(["Admin"]),
  accountController.deleteAccount
);

module.exports = router;
