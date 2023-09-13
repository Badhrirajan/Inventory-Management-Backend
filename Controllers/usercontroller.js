const UserRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/user");
const jwt = require('jsonwebtoken');

UserRouter.post("/createuser", async (req, res) => {
    const { username, email, addressline1, addressline2, postalcode ,password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      addressline1,
      addressline2,
      postalcode,
      password: encryptedPassword,
    });
    try {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        res.json("User Already existing");
      } else {
        user.save();
        res.json("Data Successfully Stored");
      }
    } catch (err) {
      res.json("Error Occured");
    }
  });

UserRouter.post("/uslogin", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign({role: "user"},'process.env.JWT_TOKEN',{expiresIn: '1d'})
            res.json({
              message: "Success",
              data: token
            });
          } else {
            res.json("Invalid Password");
          }
        });
      } else {
        res.json("No record found!!, Please Create User");
      }
    });
});

module.exports = UserRouter