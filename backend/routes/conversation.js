const express = require("express");
const { getAllConversation } = require("../controllers/conversation");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/", auth, getAllConversation);
module.exports = router;
