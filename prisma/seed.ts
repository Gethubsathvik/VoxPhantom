// prisma/seed.ts - Updated to show VoxPhantom branding
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed for VoxPhantom...');
  
  // Generate sample data
  const sampleUsers = Array.from({ length: 10 }).map(() => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    country: faker.address.country,
    verified: faker.datatype.boolean(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  
  // Create sample data
  for (const userData of sampleUsers) {
    await prisma.user.create({
      data: {
        email: userData.email,
        password: await prisma.$executeRaw`SELECT bcrypt.hash(${userData.password}, 10)`,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        country: userData.country,
        verified: userData.verified,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt,
      },
    });
  }
  
  console.log('Seed complete for VoxPhantom!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });