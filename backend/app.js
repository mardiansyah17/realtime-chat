require("dotenv").config();
const port = process.env.PORT;
const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware/auth");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(morgan("dev"));

app.use("/login", require("./routes/auth"));
app.use("/api/conversation", require("./routes/conversation"));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server http://localhost:${port}`);
});