const prisma = require("../db");

exports.getAllConversation = async (req, res) => {
  const { email } = req.auth.user;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      conversations_one: {
        select: {
          id: true,
          user_id_two: true,
        },
      },
      conversations_two: {
        select: {
          id: true,
          user_id_one: true,
        },
      },
    },
  });
  const conversations = user.conversations_one
    .map((data) => {
      return {
        conversationId: data.id,
        user: data.user_id_two,
      };
    })
    .concat(
      user.conversations_two.map((data) => {
        return {
          conversationId: data.id,
          user: data.user_id_one,
        };
      })
    );
  return res.json(conversations);
};
exports.getConversation = async (req, res) => {
  const { conversationId } = req.query;
  const messages = await prisma.conversation.findUnique({
    where: {
      id: parseInt(conversationId),
    },
    select: {
      messages: true,
    },
  });
  console.log(messages);
  return res.json(messages);
};
