const prisma = require("../db");
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getAllConversation = async (req, res) => {
  const { email } = req.auth;
  if (!email) return res.status(400).json({ msg: "Email tidak valid" });
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      conversations_one: {
        select: {
          id: true,
          user_two: true,
        },
      },
      conversations_two: {
        select: {
          id: true,
          user_one: true,
        },
      },
    },
  });
  const conversations = user.conversations_one
    .map((data) => {
      return {
        conversationId: data.id,
        user: data.user_two,
      };
    })
    .concat(
      user.conversations_two.map((data) => {
        return {
          conversationId: data.id,
          user: data.user_one,
        };
      })
    );
  return res.json({ conversations });
};
exports.getConversation = async (req, res) => {
  const { conversationId } = req.query;
  if (!conversationId) return res.status(400).json({ msg: "ID tidak valid" });
  const messages = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
    select: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  return res.json(messages);
};
