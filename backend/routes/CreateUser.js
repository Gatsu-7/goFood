const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "34tgadrga35eh";

router.post(
  "/createuser",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 characters long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let hashedPass = await bcrypt.hash(req.body.password, 10);
    try {
      await User.create({
        name: req.body.name,
        password: hashedPass,
        email: req.body.email,
        location: req.body.location,
      });

      // await user.save();

      res.json({
        success: true,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters long"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({
        email,
      });

      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (userData && pwdCompare) {
        const token = jwt.sign(
          {
            id: userData._id.toString(),
          },
          JWT_SECRET
        );
        res.json({
          success: true,
          token,
        });
      } else {
        res.status(403).json({
          message: "Incorrect Credentials",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  }
);

module.exports = router;
