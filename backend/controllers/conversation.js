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
          messages: {
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
      conversations_two: {
        select: {
          id: true,
          user_one: true,
          messages: {
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  if (!user) return res.status(400).json({ msg: "ada yang tidak beres" });
  const conversations = user.conversations_one
    .map((data) => {
      return {
        conversationId: data.id,
        user: data.user_two,
        lastMessage: {
          message: data.messages[0].content,
          createdAt: data.messages[0].createdAt,
        },
      };
    })
    .concat(
      user.conversations_two.map((data) => {
        return {
          conversationId: data.id,
          user: data.user_one,
          lastMessage: {
            message: data.messages[0].content,
            createdAt: data.messages[0].createdAt,
          },
        };
      })
    )
    .sort((a, b) => {
      return a.lastMessage.createdAt > b.lastMessage.createdAt
        ? -1
        : a.lastMessage.createdAt < b.lastMessage.createdAt
        ? 1
        : 0;
    })
    .map((data) => {
      const { conversationId, lastMessage, user } = data;
      return {
        conversationId,
        lastMessage: { createdAt: lastMessage.createdAt, content: lastMessage.message },
        user,
      };
    });
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
