const { Server } = require("socket.io");
const prisma = require("../db");

/**
 * @param {import('http').Server} server
 */
function initialSocket(server) {
  const socketIO = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

  socketIO.on("connection", (io) => {
    console.log(`⚡: ${io.id} user just connected!`);
    //Listens and logs the message to the console
    io.on("message", async (data) => {
      const message = await prisma.message
        .create({
          data,
        })
        .catch((err) => console.log("ups", err));
      socketIO.to(data.conversation_id).emit("reciveMessage", message);
    });
    io.on("join", (conversationId) => {
      io.join(conversationId);
      console.log(`user ${io.id} join conversation ${conversationId}`);
    });

    io.on("disconnect", () => {
      console.log("🔥: A user disconnected");
    });
  });
}

module.exports = initialSocket;
