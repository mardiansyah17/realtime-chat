const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "colorless",
});

module.exports = prisma;
