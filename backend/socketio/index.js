// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();
// function socketIo(server) {
//   const io = require("socket.io")(server, {
//     cors: {
//       origin: "http://localhost:3000", // Ganti dengan domain atau URL yang diizinkan
//       methods: ["GET", "POST"], // Metode HTTP yang diizinkan
//     },
//   });

//   io.on("connection", (socket) => {
//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });

//     // Menangani peristiwa atau pesan dari klien
//     socket.on("sendMessage", async (data) => {
//       const { conversationId, message, email } = data;
//       const conversation = await prisma.conversation.findUnique({
//         where: { id: conversationId },
//       });

//       if (!conversation) {
//         console.log(conversation);
//       }
//       io.emit("newMessage", data);
//     });
//   });
// }
// module.exports = { socketIo };
