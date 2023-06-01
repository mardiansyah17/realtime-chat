const { expressjwt: jwt } = require("express-jwt");

const auth = jwt({ secret: process.env.JWT_SECRET_KEY, algorithms: ["HS256"] });

function errorHandler(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("UnauthorizedError");
  } else {
    next(err);
  }
}

module.exports = {
  auth,
  errorHandler,
};
