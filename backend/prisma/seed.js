const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const name = process.env.ADMIN_NAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!name || !email || !password) {
    throw new Error("Missing ADMIN_NAME, ADMIN_EMAIL, or ADMIN_PASSWORD in .env");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: { email },
    update: {
      name,
      password: hashedPassword,
    },
    create: {
      name,
      email,
      password: hashedPassword,
    },
  });

  console.log("✅ Admin seeded:", { id: admin.id, name: admin.name, email: admin.email });
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
