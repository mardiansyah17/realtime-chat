const express = require("express");
const { getAllConversation, getConversation, deleteConversation} = require("../controllers/conversation");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.get("/get-all-conversations", auth, getAllConversation);
router.get("/get-conversation", auth, getConversation);
router.delete ("/delete/:id", auth, deleteConversation);
module.exports = router;
