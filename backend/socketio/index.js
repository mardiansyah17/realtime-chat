const { Server } = require("socket.io");
const prisma = require("../db");
const { onReciveMessage } = require("../controllers/messagaController");

/**
 * @param {import('http').Server} server
 */
function initialSocket(server) {
  const socketIO = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  const rooms = {};
  socketIO.on("connection", (io) => {
    console.log(`⚡: ${io.id} user just connected!`);
    io.on("message", (data) => onReciveMessage(data, socketIO));
    // io.on("message", (data) => onReciveMessage(data, socketIO));

    io.on("joinUser", (userId) => {
      console.log(`Pengguna ${userId} bergabung`);

      // Bergabung dengan ruangan berdasarkan ID pengguna
      io.join(userId);

      // Tambahkan pengguna ke ruangan yang sesuai
      if (rooms[userId]) {
        rooms[userId].add(io.id);
      } else {
        rooms[userId] = new Set([io.id]);
      }
    });

    io.on("userLeave", (userId) => {
      console.log(`Pengguna ${userId} meninggalkan`);

      // Hapus pengguna dari ruangan yang sesuai
      if (rooms[userId]) {
        rooms[userId].delete(io.id);

        // Jika tidak ada pengguna lagi dalam ruangan, hapus ruangan
        if (rooms[userId].size === 0) {
          delete rooms[userId];
        }
      }

      // Tinggalkan ruangan berdasarkan ID pengguna
      io.leave(userId);
    });

    io.on("disconnect", () => {
      console.log(`⚡: ${io.id} user disconnected!`);

      // Hapus pengguna dari semua ruangan saat terputus
      for (const roomId in rooms) {
        if (rooms.hasOwnProperty(roomId)) {
          if (rooms[roomId].has(io.id)) {
            rooms[roomId].delete(io.id);
            if (rooms[roomId].size === 0) {
              delete rooms[roomId];
            }
          }
        }
      }
    });
  });
}

module.exports = initialSocket;
