require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/auth");
const initialSocket = require("./socketio");

const http = require("http").Server(app);

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(morgan("dev"));
initialSocket(http);
app.use("/login", require("./routes/auth"));
app.use("/api/conversation", require("./routes/conversation"));
app.use("/api/user", require("./routes/user"));
app.use(errorHandler);

http.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});
