import prismaClient from '@/repository/prisma-client';

async function seed() {
  // Seed Users
  const john = await prismaClient.user.create({
    data: {
      enrollment: '0000001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'STUDENT',
    },
  });

  const emma = await prismaClient.user.create({
    data: {
      enrollment: '0000002',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      role: 'STUDENT',
    },
  });

  const michael = await prismaClient.user.create({
    data: {
      enrollment: '0000003',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      role: 'STUDENT',
    },
  });

  const massoni = await prismaClient.user.create({
    data: {
      enrollment: '0000004',
      name: 'Massoni',
      email: 'massoni@example.com',
      role: 'TEACHER',
    },
  });

  const dalton = await prismaClient.user.create({
    data: {
      enrollment: '0000005',
      name: 'dalton',
      email: 'dalton@example.com',
      role: 'TEACHER',
    },
  });

  const melina = await prismaClient.user.create({
    data: {
      enrollment: '0000006',
      name: 'Melina',
      email: 'melina@example.com',
      role: 'TEACHER',
    },
  });

  // Seed Themes
  const theme1 = await prismaClient.theme.create({
    data: {
      label: 'Machine Learning',
      summary: 'Exploring various ML algorithms',
      ownerId: massoni.id,
      startDate: new Date('2024-08-02'),
      duration: 42,
    },
  });

  const theme2 = await prismaClient.theme.create({
    data: {
      label: 'Web Development',
      summary: 'Modern web technologies and frameworks',
      ownerId: massoni.id,
      startDate: new Date('2024-11-02'),
      duration: 62,
    },
  });

  const theme3 = await prismaClient.theme.create({
    data: {
      label: 'Cybersecurity',
      summary: 'Network security and ethical hacking',
      ownerId: dalton.id,
      startDate: new Date('2024-11-12'),
      duration: 142,
    },
  });

  const theme4 = await prismaClient.theme.create({
    data: {
      label: 'Data Science',
      summary: 'Big data analysis and visualization',
      ownerId: massoni.id,
      startDate: new Date('2024-10-02'),
      duration: 30,
    },
  });

  const theme5 = await prismaClient.theme.create({
    data: {
      label: 'Internet of Things',
      summary: 'Connected devices and smart systems',
      ownerId: dalton.id,
      startDate: new Date('2024-11-22'),
      duration: 82,
    },
  });

  const theme6 = await prismaClient.theme.create({
    data: {
      label: 'Quantum Computing',
      summary: 'Exploring quantum algorithms and applications',
      ownerId: melina.id,
      startDate: new Date('2024-11-22'),
      duration: 92,
    },
  });

  const theme7 = await prismaClient.theme.create({
    data: {
      label: 'Blockchain Technology',
      summary: 'Decentralized systems and cryptocurrencies',
      ownerId: dalton.id,
      startDate: new Date('2024-11-20'),
      duration: 60,
    },
  });

  const theme8 = await prismaClient.theme.create({
    data: {
      label: 'Augmented Reality',
      summary: 'Developing AR applications and experiences',
      ownerId: emma.id,
      startDate: new Date('2025-01-20'),
      duration: 92,
    },
  });

  const theme9 = await prismaClient.theme.create({
    data: {
      label: 'Green Computing',
      summary: 'Sustainable and energy-efficient computing practices',
      ownerId: john.id,
      startDate: new Date('2025-01-25'),
      duration: 122,
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
      type: 'TCC',
      status: 'ONGOING',
      tccDocumentUrl:
        'https://www.google.com/search?q=o+que+%C3%A9+tcc&sca_esv=8536d3cccb765549&sca_upv=1&rlz=1C1GCEA_enBR1109BR1109&sxsrf=ADLYWIIN2J4ZQElYPRDp5b3z8Ei119dV8Q%3A1727482440051&ei=SEr3ZsXZAvLW5OUPmbChyAQ&ved=0ahUKEwjFncfJreSIAxVyK7kGHRlYCEkQ4dUDCA8&uact=5&oq=o+que+%C3%A9+tcc&gs_lp=Egxnd3Mtd2l6LXNlcnAiDG8gcXVlIMOpIHRjYzINEAAYgAQYsQMYFBiHAjIFEAAYgAQyChAAGIAEGBQYhwIyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESNhIUH1Yg0ZwA3gBkAEBmAHVAaABgROqAQYwLjEzLjG4AQPIAQD4AQGYAg-gArIQqAIUwgIKEAAYsAMY1gQYR8ICDRAAGIAEGLADGEMYigXCAg4QABiwAxjkAhjWBNgBAcICGRAuGIAEGLADGEMYxwEYyAMYigUYrwHYAQHCAhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBwgINEAAYgAQYsQMYQxiKBcICChAAGIAEGEMYigXCAggQABiABBixA8ICBxAjGCcY6gLCAhMQABiABBhDGLQCGIoFGOoC2AEBwgIZEC4YgAQYQxi0AhjHARiKBRjqAhivAdgBAcICChAjGIAEGCcYigXCAgQQIxgnwgILEAAYgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICERAuGIAEGLEDGNEDGIMBGMcBwgIOEC4YgAQYsQMYgwEY1ALCAgsQLhiABBixAxjUAsICEBAAGIAEGLEDGEMYyQMYigXCAgsQABiABBiSAxiKBZgDBogGAZAGEboGBggBEAEYCZIHBjMuMTEuMaAHmV4&sclient=gws-wiz-serp',
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
      tccDocumentUrl:
        'https://www.google.com/search?q=o+que+%C3%A9+tcc&sca_esv=8536d3cccb765549&sca_upv=1&rlz=1C1GCEA_enBR1109BR1109&sxsrf=ADLYWIIN2J4ZQElYPRDp5b3z8Ei119dV8Q%3A1727482440051&ei=SEr3ZsXZAvLW5OUPmbChyAQ&ved=0ahUKEwjFncfJreSIAxVyK7kGHRlYCEkQ4dUDCA8&uact=5&oq=o+que+%C3%A9+tcc&gs_lp=Egxnd3Mtd2l6LXNlcnAiDG8gcXVlIMOpIHRjYzINEAAYgAQYsQMYFBiHAjIFEAAYgAQyChAAGIAEGBQYhwIyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESNhIUH1Yg0ZwA3gBkAEBmAHVAaABgROqAQYwLjEzLjG4AQPIAQD4AQGYAg-gArIQqAIUwgIKEAAYsAMY1gQYR8ICDRAAGIAEGLADGEMYigXCAg4QABiwAxjkAhjWBNgBAcICGRAuGIAEGLADGEMYxwEYyAMYigUYrwHYAQHCAhkQLhiABBiwAxjRAxhDGMcBGMgDGIoF2AEBwgINEAAYgAQYsQMYQxiKBcICChAAGIAEGEMYigXCAggQABiABBixA8ICBxAjGCcY6gLCAhMQABiABBhDGLQCGIoFGOoC2AEBwgIZEC4YgAQYQxi0AhjHARiKBRjqAhivAdgBAcICChAjGIAEGCcYigXCAgQQIxgnwgILEAAYgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICERAuGIAEGLEDGNEDGIMBGMcBwgIOEC4YgAQYsQMYgwEY1ALCAgsQLhiABBixAxjUAsICEBAAGIAEGLEDGEMYyQMYigXCAgsQABiABBiSAxiKBZgDBogGAZAGEboGBggBEAEYCZIHBjMuMTEuMaAHmV4&sclient=gws-wiz-serp',
      studentId: emma.id,
      professorId: massoni.id,
      themeId: theme6.id,
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
      status: 'APPROVED',
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
        connect: [{ id: melina.id }, { id: dalton.id }, { id: emma.id }, { id: michael.id }],
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
        connect: [{ id: john.id }, { id: melina.id }],
      },
    },
  });

  await prismaClient.systemConfiguration.create({
    data: {
      activeProfessors: '',
      preRequisites: '',
      minCredits: 80,
      minPeriods: 8,
      reminderTemplate: 'O prazo final para o envio do documento do TCC é {date}',
      reminderDaysBefore: 5,
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
