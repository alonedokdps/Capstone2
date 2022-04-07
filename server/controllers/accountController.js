const { Account, User, Role } = require("../model/model");

const accountController = {
  //ADD A ACCOUNT
  addAAccount: async (req, res) => {
    try {
      const newAccount = new Account(req.body);
      const savedAccount = await newAccount.save();
      res.status(200).json(savedAccount);
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

  //GET A ACCOUNT
    getAAccount: async (req, res) => {
        try {
            const account = await Account.findById(req.params.id).populate(['userId', 'roleId']);
            res.status(200).json(account);
        } catch (err) {
            res.status(500).json(err);
        }
    },

  //UPDATE ACCOUNT
  updateAccount: async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      await account.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully!");
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //DELETE ACCOUNT
  deleteAccount: async (req, res) => {
    try {
      await Account.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully");
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = accountController;
