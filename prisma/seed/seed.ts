import prismaClient from '@/repository/prisma-client';

async function seed() {
  // Seed Users
  const john = await prismaClient.user.create({
    data: {
      enrollment: '119210050',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'STUDENT',
    },
  });

  const luiz = await prismaClient.user.create({
    data: {
      enrollment: '119210052',
      name: 'Luiz Felipe',
      email: 'luiz.farias@example.com',
      role: 'STUDENT',
    },
  });

  const emma = await prismaClient.user.create({
    data: {
      enrollment: '119210058',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      role: 'STUDENT',
    },
  });

  const michael = await prismaClient.user.create({
    data: {
      enrollment: '119210059',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'STUDENT',
    },
  });

  const massoni = await prismaClient.user.create({
    data: {
      enrollment: '119210053',
      name: 'Massoni',
      email: 'massoni@example.com',
      role: 'TEACHER',
    },
  });

  const dalton = await prismaClient.user.create({
    data: {
      enrollment: '119210054',
      name: 'dalton',
      email: 'dalton@example.com',
      role: 'TEACHER',
    },
  });

  const fubica = await prismaClient.user.create({
    data: {
      enrollment: '119210055',
      name: 'Fubica',
      email: 'fubica@example.com',
      role: 'COORDINATOR',
    },
  });

  const alice = await prismaClient.user.create({
    data: {
      enrollment: '119210056',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'TEACHER',
    },
  });

  const bob = await prismaClient.user.create({
    data: {
      enrollment: '119210057',
      name: 'Bob Smith',
      email: 'bob.smith@example.com',
      role: 'TEACHER',
    },
  });

  // Seed Themes
  const theme1 = await prismaClient.theme.create({
    data: {
      label: 'Machine Learning',
      summary: 'Exploring various ML algorithms',
      ownerId: massoni.id,
      endDate: new Date('2024-12-31'),
    },
  });

  const theme2 = await prismaClient.theme.create({
    data: {
      label: 'Web Development',
      summary: 'Modern web technologies and frameworks',
      ownerId: massoni.id,
      endDate: new Date('2024-10-31'),
    },
  });

  const theme3 = await prismaClient.theme.create({
    data: {
      label: 'Cybersecurity',
      summary: 'Network security and ethical hacking',
      ownerId: dalton.id,
      endDate: new Date('2025-03-31'),
    },
  });

  const theme4 = await prismaClient.theme.create({
    data: {
      label: 'Data Science',
      summary: 'Big data analysis and visualization',
      ownerId: massoni.id,
      endDate: new Date('2024-11-30'),
    },
  });

  const theme5 = await prismaClient.theme.create({
    data: {
      label: 'Internet of Things',
      summary: 'Connected devices and smart systems',
      ownerId: dalton.id,
      endDate: new Date('2025-01-31'),
    },
  });

  const theme6 = await prismaClient.theme.create({
    data: {
      label: 'Quantum Computing',
      summary: 'Exploring quantum algorithms and applications',
      ownerId: alice.id,
      endDate: new Date('2025-06-30'),
    },
  });

  const theme7 = await prismaClient.theme.create({
    data: {
      label: 'Blockchain Technology',
      summary: 'Decentralized systems and cryptocurrencies',
      ownerId: bob.id,
      endDate: new Date('2025-05-31'),
    },
  });

  const theme8 = await prismaClient.theme.create({
    data: {
      label: 'Augmented Reality',
      summary: 'Developing AR applications and experiences',
      ownerId: alice.id,
      endDate: new Date('2025-04-30'),
    },
  });

  const theme9 = await prismaClient.theme.create({
    data: {
      label: 'Green Computing',
      summary: 'Sustainable and energy-efficient computing practices',
      ownerId: bob.id,
      endDate: new Date('2025-07-31'),
    },
  });

  // Seed Interests
  await prismaClient.interest.create({
    data: {
      text: 'Interested in neural networks',
      ownerId: john.id,
      themeId: theme1.id,
    },
  });

  // Seed Papers
  const paper1 = await prismaClient.paper.create({
    data: {
      type: 'PTCC',
      status: 'PENDING',
      ptccDocumentUrl: 'https://www.google.com',
      studentId: john.id,
      professorId: massoni.id,
      themeId: theme1.id,
      createdAt: new Date('2024-03-01'),
    },
  });

  const paper2 = await prismaClient.paper.create({
    data: {
      type: 'TCC',
      status: 'PENDING',
      tccDocumentUrl: 'https://www.google.com',
      studentId: emma.id,
      professorId: alice.id,
      themeId: theme6.id,
      createdAt: new Date('2024-05-01'),
    },
  });

  const paper3 = await prismaClient.paper.create({
    data: {
      type: 'PTCC',
      status: 'PENDING',
      tccDocumentUrl: 'https://www.google.com',
      studentId: luiz.id,
      professorId: dalton.id,
      themeId: theme5.id,
      createdAt: new Date('2024-05-01'),
    },
  });

  await prismaClient.interest.create({
    data: {
      text: 'Curious about blockchain applications',
      ownerId: michael.id,
      themeId: theme7.id,
    },
  });

  // Seed Approvals
  await prismaClient.approval.create({
    data: {
      type: 'PTCC',
      paperId: paper1.id,
    },
  });

  // Seed Categories
  const category1 = await prismaClient.categories.create({
    data: {
      name: 'Artificial Intelligence',
      description: 'Topics related to AI and ML',
      themes: {
        connect: [{ id: theme1.id }, { id: theme5.id }],
      },
      users: {
        connect: [{ id: john.id }, { id: massoni.id }],
      },
    },
  });

  const category2 = await prismaClient.categories.create({
    data: {
      name: 'Emerging Technologies',
      description: 'Cutting-edge technological advancements',
      themes: {
        connect: [{ id: theme6.id }, { id: theme7.id }, { id: theme8.id }],
      },
      users: {
        connect: [{ id: alice.id }, { id: bob.id }, { id: emma.id }, { id: michael.id }],
      },
    },
  });

  const category3 = await prismaClient.categories.create({
    data: {
      name: 'Sustainable Computing',
      description: 'Environmentally friendly computing practices',
      themes: {
        connect: [{ id: theme9.id }],
      },
      users: {
        connect: [{ id: bob.id }, { id: emma.id }],
      },
    },
  });

  console.log('Seed data created successfully');
}

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });
