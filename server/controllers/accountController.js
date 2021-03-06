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
  updateRole: async (req, res) => {
    try {
      const account = await Account.findById(req.params.id);
      const update = await account.updateOne({
        $set: {
          role: req.body.nameRole,
        },
      });
      if (update) {
        res
          .status(200)
          .json({success: true, message: "Updated Role successfully!"});
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  getAllAccQuery: async (req, res) => {
    const search = req.query.search;
    const department = req.query.department;
    const roleGet = req.query.roleGet;
    const course = req.query.course;
    const classes = req.query.classes;
    const byDepart = req.query.byDep;
    try {
      if (roleGet === "Admin") {
        if (department && search) {
          const event = await Account.find({
            departmentId: department,
            fullname: search,
            role: {$nin: ["Admin"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else if (search) {
          const event = await Account.find({
            fullname: search,
            role: {$nin: ["Admin"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else if (department) {
          const event = await Account.find({
            departmentId: department,
            role: {$nin: ["Admin"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else {
          const event = await Account.find({
            role: {$nin: ["Admin"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        }
      } else if (roleGet === "DepartmentManager") {
        if (course && search && classes) {
          const event = await Account.find({
            courseId: course,
            departmentId: byDepart,
            fullname: search,
            class: classes,
            role: {$nin: ["Admin", "DepartmentManager"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else if (search) {
          const event = await Account.find({
            fullname: search,
            departmentId: byDepart,
            role: {$nin: ["Admin", "DepartmentManager"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else if (classes) {
          const event = await Account.find({
            class: classes,
            departmentId: byDepart,
            role: {$nin: ["Admin", "DepartmentManager"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else if (course) {
          const event = await Account.find({
            courseId: course,
            departmentId: byDepart,
            role: {$nin: ["Admin", "DepartmentManager"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else if (search && classes) {
          const event = await Account.find({
            fullname: search,
            class: classes,
            departmentId: byDepart,
            role: {$nin: ["Admin", "DepartmentManager"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else if (course && search) {
          const event = await Account.find({
            courseId: course,
            departmentId: byDepart,
            fullname: search,
            role: {$nin: ["Admin", "DepartmentManager"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else if (classes && course) {
          const event = await Account.find({
            courseId: course,
            class: classes,
            departmentId: byDepart,
            role: {$nin: ["Admin", "DepartmentManager"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        } else {
          const event = await Account.find({
            departmentId: byDepart,
            role: {$nin: ["Admin", "DepartmentManager"]},
          });
          if (event) {
            res.json(event);
          } else {
            res.json([]);
          }
        }
      }
    } catch (err) {}
  },
  deleteAccount: async (req, res) => {
    try {
      if (req.params.id) {
        await Account.findByIdAndDelete(req.params.id);
        res.json({success: true, message: "Account deleted successfully"});
      }
    } catch (err) {
      console.log(err);
    }
  },
  updatePassword: async (req, res) => {
    const id = req.params.id;
    const password = req.body.password;
    try {
      const account = await Account.findByIdAndUpdate(req.params.id, {
        password: password,
      });
      if (account) {
        res.json({success: true, message: "Account updated successfully"});
      }
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = accountController;
