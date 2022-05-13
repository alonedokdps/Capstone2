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
      const update = await account.updateOne({$set: req.body});
      res.status(200).json({success: true, message: "Updated successfully!"});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  updateAvatar: async (req, res) => {
    const img = req.file?.path;
    if (!img) return res.json({success: false, message: "No image provided"});
    try {
      const account = await Account.findById(req.body.accountId);
      const update = await account.updateOne({
        $set: {
          avatar: img,
        },
      });
      if (update) {
        res
          .status(200)
          .json({success: true, message: "Updated avatar successfully", img});
      }
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
  updateScore: async (req, res) => {
    try {
      const account = await Account.findById(req.body.accountId);
      const update = await account.updateOne({
        $set: {
          score: account.score + 5,
        },
      });
      if (update) {
        res.json({
          success: true,
          message: "Congratulations ! You get 5 training points",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAccountByQuery: async (req, res) => {
    const search = req.query.search;
    const department = req.query.department;
    const course = req.query.course;
    const classs = req.query.classs;
    const role = req.params.role;
    if (role === "Admin") {
      if (!department && !course && !classs && !search) {
        const event = await Account.find({});
        if (event) {
          res.json({event});
        }
      }
      if (search) {
        const event = await Account.find({fullname: search});
        if (event) {
          res.json({event});
        }
      }
      if (department && course && classs && search) {
        const event = await Account.find({
          fullname: search,
          departmentId: department,
          courseId: courseId,
          class: classs,
        });
        if (event) {
          res.json({event});
        }
      }
    } else {
      if (!department && !course && !classs && !search) {
        const event = await Account.find({departmentId: department});
        if (event) {
          res.json({event});
        }
      }
      if (search) {
        const event = await Account.find({
          fullname: search,
          departmentId: department,
        });
        if (event) {
          res.json({event});
        }
      }
      if (department && course && classs && search) {
        const event = await Account.find({
          fullname: search,
          departmentId: department,
          courseId: courseId,
          class: classs,
        });
        if (event) {
          res.json({event});
        }
      }
    }
  },
};

module.exports = accountController;
