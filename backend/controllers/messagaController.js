const prisma = require("../db");

exports.onReciveMessage = async (data, socket) => {
  const { content, sender_id, reciver, conversation_id } = data;
  const conversation = await prisma.conversation.findUnique({
    where: {
      id: conversation_id,
    },
  });

  if (!conversation) {
    const conversationRes = await prisma.conversation
      .create({
        data: {
          user_id_one: sender_id,
          user_id_two: reciver,
          messages: {
            create: {
              content,
              sender_id,
            },
          },
        },
        select: {
          id: true,
          user_one: true,
          user_two: true,
          messages: {
            take: 1,
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      })
      .then((res) => {
        return {
          conversationId: res.id,
          lastMessage: res.messages,
          userOne: res.user_one,
          userTwo: res.user_two,
        };
      });
    return socket.to([sender_id, reciver]).emit("reciveMessage", conversationRes);
  }
  const messsage = await prisma.message
    .create({
      data: {
        conversation_id,
        content,
        sender_id,
      },
      select: {
        id: true,
        conversation_id: true,
        content: true,
        createdAt: true,
        sender_id: true,
        conversation: {
          select: {
            user_one: true,
            user_two: true,
          },
        },
      },
    })
    .then((res) => {
      return {
        conversationId: res.conversation_id,
        lastMessage: res,
        userOne: res.conversation.user_one,
        userTwo: res.conversation.user_two,
      };
    });
  console.log(messsage);
  return socket.to([sender_id, reciver]).emit("reciveMessage", messsage);
};
