require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/auth");

const http = require("http").Server(app);
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  //Listens and logs the message to the console
  socket.on("message", (data) => {
    console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(morgan("dev"));
app.use("/login", require("./routes/auth"));
app.use("/api/conversation", require("./routes/conversation"));

app.use(errorHandler);

http.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
