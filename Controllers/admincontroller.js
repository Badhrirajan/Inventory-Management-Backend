const AdminRouter = require('express').Router()
const Admin = require('../Models/admin')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

AdminRouter.post("/createadmin", async (req, res) => {
    const { username, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      email,
      password: encryptedPassword,
    });
    try {
      const oldadmin = await Admin.findOne({ email });
      if (oldadmin) {
        res.json("User Already existing");
      } else {
        admin.save();
        res.json("Data Successfully Stored");
      }
    } catch (err) {
      res.json("Error Occured");
    }
});

AdminRouter.post("/adlogin", (req, res) => {
    const { email, password } = req.body;
    Admin.findOne({ email: email }).then((admin) => {
      if (admin) {
        bcrypt.compare(password, admin.password, (err, response) => {
          if (response) {
            const token = jwt.sign({role: "admin"},'process.env.JWT_TOKEN',{expiresIn: '1d'})
            res.json({
              message: "Success",
              data: token
            });
          } else {
            res.json("Invalid Password");
          }
        });
      } else {
        res.json("No record found!!, Please Create");
      }
    });
});

module.exports = AdminRouter