const accountController = require("../controllers/accountController");
const auth = require("../controllers/auth");

const router = require("express").Router();

//ADD A ACCOUNT
router.post("/register", accountController.addAAccount);

router.post("/login", auth.login);

//ADD A ACCOUNT DEPARTMENT MANAGER
router.post(
  "/",
  auth.isAuthenticated,
  auth.role(["Admin"]),
  accountController.addAAccountDepartmentManager
);

//GET ALL ACCOUNTS
router.get(
  "/",
  auth.isAuthenticated,
  auth.role(["Admin"]),
  accountController.getAllAccounts
);

//GET A ACCOUNT
router.get(
  "/:id",
  auth.isAuthenticated,
  auth.role(["Admin"]),
  accountController.getAAccount
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
