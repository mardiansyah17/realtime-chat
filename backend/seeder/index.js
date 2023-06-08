const prisma = require("../db");

const dataUser = [
  {
    id: "9e9f4266-8bf5-4edc-8a56-9e3b7009158e",
    name: "Muhammad Mardiansyah",
    email: "mardiansyahm002@gmail.com",
    picture: "https://example.com/pictures/john_doe.jpg",
  },
  {
    id: "22ca4299-7e2c-4703-9bb3-4e498afc3ca9",
    name: "Mark Zuckerberg",
    email: "mardiansyahm12@gmail.com",
    picture: "https://example.com/pictures/jane_smith.jpg",
  },
];

const conversations = [
  {
    id: "c8d3772b-2ab2-4afa-ae3d-bd2ec695c7dd",
    user_id_one: "9e9f4266-8bf5-4edc-8a56-9e3b7009158e",
    user_id_two: "22ca4299-7e2c-4703-9bb3-4e498afc3ca9",
  },
];

const messages = [
  {
    id: "c6f0fd3b-97c8-48ca-a955-27e53bfce7d3",
    content: "halo mark",
    sender_id: "9e9f4266-8bf5-4edc-8a56-9e3b7009158e",
    conversation_id: "c8d3772b-2ab2-4afa-ae3d-bd2ec695c7dd",
  },
];
async function main() {
  await prisma.user.createMany({
    data: dataUser,
  });
  await prisma.conversation.createMany({
    data: conversations,
  });
  await prisma.message.createMany({
    data: messages,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("seeder berhasil");
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
