const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express.Router();

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (email && username && password) {
      const doesEmailMatch = await User.findOne({ email: email });
      if (!doesEmailMatch) {
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);
        const newUser = new User({
          email: email,
          username: username,
          token: token,
          salt: salt,
          hash: hash,
        });
        await newUser.save();
        res.status(200).json({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          token: newUser.token,
        });
      } else {
        console.log("ok");
        res.status(409).json({ message: "email does already exist" });
      }
    } else {
      res.status(406).json({ message: "Missing information" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (password && email) {
      const user = await User.findOne({ email: email });
      if (user) {
        const hash = SHA256(password + user.salt).toString(encBase64);
        if (hash === user.hash) {
          res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: user.token,
          });
        } else {
          res.status(401).json({ error: "Unauthorized" });
        }
      } else {
        res.status(400).json({ message: "User not found" });
      }
    } else {
      res.status(406).json({ message: "Missing informations" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
