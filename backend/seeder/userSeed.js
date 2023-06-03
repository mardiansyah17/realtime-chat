const prisma = require("../db");

const data = [
  {
    name: "Muhammad Mardiansyah",
    email: "mardiansyahm002@gmail.com",
    picture: "https://example.com/pictures/john_doe.jpg",
  },
  {
    name: "Mark Zuckerberg",
    email: "mardiansyahm12@gmail.com",
    picture: "https://example.com/pictures/jane_smith.jpg",
  },
];

async function main() {
  await prisma.user.createMany({
    data,
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);

    await prisma.$disconnect();

    process.exit(1);
  });
