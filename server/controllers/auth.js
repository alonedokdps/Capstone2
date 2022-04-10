const jwt = require("jsonwebtoken");
const Account = require('../model/account');

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, "secretkey", function (err, decodedToken) {
        if (err) {
          console.log(err);
        } else {
          req.userId = decodedToken._id;
          next();
        }
      });
    } else res.redirect("/");
  };

const role = (roles) => {
  return function (req, res, next) {
    // console.log(req.userId);
    User.findById({_id: req.userId}, function (err, data) {
      if (err) {
        res.json({ error: "user not found" });
        return next(err);
      }
      if (roles.includes(data.role)) {
        return next();
      }
      res.json({ error: "You are not authorized to view this content" });
      return next("Unauthorized");
    });
  };
};


async function login(req, res) {
  const { username, password } = req.body;
  const account = await Account.findOne({ username: username });
  try {
    if (!account) {
      return res.json({ message: "User Not found", status: "error" });
    } else {
      if (password != account.password) {
        return res.json({ message: "Invalid Password", status: "error" });
      } else {
        jwt.sign({ _id: account._id }, "secretkey", (err, token) => {
          res.cookie("token", token, { maxAge: 300000 });//maxAge in 5 minutes
          res.json({ message: "Login Success", status: "success" });
        });
      }
    }
  } catch (err) {
    return res.json({ message: err });
  }
}

module.exports = {isAuthenticated, role, login}