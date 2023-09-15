const express = require("express");
const router = express.Router();
const { hashGenerator } = require("../hashing");
const { hashValidator } = require("../hashing");
const userModel = require("../models/UserModel");

router.get("/", (req, res) => res.send("User Route"));

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!password) {
    return res.json({
      msg: "Password Empty",
    });
  }

  try {
    const isUser = await userModel.findOne({ email: email });

    if (isUser) {
      if (!isUser.aflag) {
        return res.json({
          msg: "This account has been deactivated",
        });
      } else {
        console.log("Already");

        return res.json({
          msg: "Email Already Exist",
        });
      }
    } else {
      const hashPassword = await hashGenerator(password);
      const queryData = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashPassword,
        isNotifySound: true,
        aflag: true,
      };

      const user = await userModel.create(queryData);

      return res.json({
        success: true,
        msg: "User registration successful ",
        userID: user._id,
      });
    }
  } catch (err) {
    return res.json({
      msg: "User Registration failed",
      error: err,
    });
  }
});

module.exports = router;
