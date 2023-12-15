const { Router } = require("express");
const router = Router();

const {
  getMessages,
  createMessage,
  getMessageById,
  deleteMessage,
  updateMessage,
} = require("../controllers/index.controller");

router.get("/messages", getMessages);
router.get("/messages/:id", getMessageById);
router.post("/messages", createMessage);
router.delete("/messages/:id", deleteMessage);
router.put("/messages/:id", updateMessage);



module.exports = router;
