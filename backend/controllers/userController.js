const prisma = require("../db");
/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
exports.getUser = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email tidak valid" });
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) return res.status(400).json({ msg: "Pengguna tidak di temukan" });

  return res.json(user);
};
