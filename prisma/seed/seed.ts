import prismaClient from '@/repository/prisma-client';

async function seed() {
  await prismaClient.user.create({
    data: {
      enrollment: '119210052',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'STUDENT',
    },
  });
  await prismaClient.user.create({
    data: {
      enrollment: '119210053',
      name: 'Massoni',
      email: 'massoni@example.com',
      role: 'TEACHER',
    },
  });
  await prismaClient.user.create({
    data: {
      enrollment: '119210054',
      name: 'Fubica',
      email: 'fubica@example.com',
      role: 'COORDINATOR',
    },
  });
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
