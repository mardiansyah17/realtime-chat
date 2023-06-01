const express = require("express");
const router = express.Router();
const passport = require("passport");
require("../controllers/auth");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failedLogin",
    session: false,
  }),
  async function (req, res) {
    const { email, name, picture } = req.user._json;
    const user = await prisma.user.upsert({
      where: {
        email,
      },
      update: {},
      create: {
        email,
        name,
        picture,
      },
    });
    const token = jwt.sign({ user: { email, name, picture } }, process.env.JWT_SECRET_KEY);
    res.cookie("auth_token", token, {
      // httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
    });
    return res.redirect("http://localhost:3000");
  }
);

module.exports = router;
