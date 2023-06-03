const express = require("express");
const { getAllConversation, getConversation } = require("../controllers/conversation");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/get-all-conversations", auth, getAllConversation);
router.get("/get-conversation", auth, getConversation);
module.exports = router;
