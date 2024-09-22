import prismaClient from '@/repository/prisma-client';

async function main() {
  const existingConfig = await prismaClient.systemConfiguration.findUnique({
    where: { id: 1 }, // Assuming id is 1 for the default config
  });

  if (!existingConfig) {
    await prismaClient.systemConfiguration.create({
      data: {
        activeProfessors: '',
        preRequisites: '',
        minCredits: 0,
        minPeriods: 0,
        reminderTemplate: 'O prazo final para submissão da trabalho é dia {date}.',
        reminderDaysBefore: 0,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaClient.$disconnect();
  });

export const makeSystemConfiguration = async () => {
  await main();
};
