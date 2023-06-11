const express = require("express");
const { auth } = require("../middleware/auth");
const { getUser } = require("../controllers/userController");
const router = express.Router();

router.post("/get-user", auth, getUser);

module.exports = router;
