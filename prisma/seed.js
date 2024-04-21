const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  const password = "Lyraeth123";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const lyraeth = await prisma.user.upsert({
    where: { user_id: 1 },
    update: {},
    create: {
      user_id: 1,
      user_username: "Lyraeth",
      user_email: "nurfarhan52@gmail.com",
      user_name: "Mahsa Nurfarhan Hidayat",
      user_password: hashedPassword,
      Account: {
        create: {
          account_id: 1,
          account_idAccount: 103797355,
          account_server: 2538,
        },
      },
    },
  });
  console.log(lyraeth);
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
