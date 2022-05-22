const jwt = require("jsonwebtoken");
const Account = require("../model/account");

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
        res.json({error: "user not found"});
        return next(err);
      }
      if (roles.includes(data.role)) {
        return next();
      }
      res.json({error: "You are not authorized to view this content"});
      return next("Unauthorized");
    });
  };
};

async function login(req, res) {
  const {username, password} = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({success: false, message: "username and password is required"});
    }
    const account = await Account.findOne({
      username: username,
      password: password,
    });
    if (!account) {
      return res.json({
        success: false,
        message: "Account or password is not correctly",
      });
    } else {
      jwt.sign({_id: account._id}, "secretkey", (err, token) => {
        res.cookie("token", token, {maxAge: 300000});
        res.json({
          message: "Login Success",
          success: true,
          token,
          id: account._id,
          role: account.role,
          name: account.username,
          departmentId: account.departmentId,
          avatar: account.avatar,
        });
      });
    }
  } catch (err) {
    res.status(500).json({success: false, message: "error "});
  }
}

module.exports = {isAuthenticated, role, login};
