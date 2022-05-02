const Account = require("../model/account");
const jwt = require("jsonwebtoken");

const accountController = {
  //ADD A ACCOUNT
  addAAccount: async (req, res) => {
    const user = await Account.findOne({username: req.body.username});

    try {
      if (user) {
        return res.json({success: false, message: "Username already exists"});
      } else {
        const newAccount = new Account(req.body);
        const savedAccount = await newAccount.save();
        jwt.sign({_id: savedAccount._id}, "secretkey", (err, token) => {
          res.cookie("token", token, {maxAge: 300000}); //maxAge in 5 minutes
        });

        res
          .status(200)
          .json({success: true, message: "Created account successfully"});
      }
    } catch (err) {
      res.status(500).json({success: false, message: "Error in server"});
    }
  },

  //ADD A ACCOUNT DEPARTMENT MANAGER
  addAAccountDepartmentManager: async (req, res) => {
    try {
      const newAccount = new Account(req.body);
      newAccount.role = "DepartmentManager";
      const savedAccount = await newAccount.save();
      jwt.sign({_id: savedAccount._id}, "secretkey", (err, token) => {
        res.cookie("token", token, {maxAge: 300000}); //maxAge in 5 minutes
        res.status(200).json(savedAccount);
      });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //GET ALL ACCOUNTS
  getAllAccounts: async (req, res) => {
    try {
      const allAccounts = await Account.find();
      res.status(200).json(allAccounts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //GET A ACCOUNT BY ID
  getAccountByID: async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      res.status(200).json(account);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //UPDATE ACCOUNT
  updateAccount: async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      await account.updateOne({$set: req.body});
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE ACCOUNT
  deleteAccount: async (req, res) => {
    try {
      await Account.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = accountController;
