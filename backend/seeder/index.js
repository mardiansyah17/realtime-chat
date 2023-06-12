const conversations = require("../dataSeed/conversationData");
const messages = require("../dataSeed/messagesData");
const dataUser = require("../dataSeed/userData");
const prisma = require("../db");

async function main() {
  // await prisma.user.createMany({
  //   data: dataUser,
  // });
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
