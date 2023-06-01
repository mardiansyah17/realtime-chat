const prisma = require("../db");

exports.getAllConversation = async (req, res) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: req.auth.user.email,
    },
    include: {
      conversationsOne: true,
      conversationsTwo: true,
    },
  });
  return res.json(user);
  res.send("mantap bro");
};
