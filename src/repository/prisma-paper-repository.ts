import { PaperPayload, Paper } from '@/models/paper';
import { PaperRepository } from '@/usecases/ports/paper-repository';
import prismaClient from './prisma-client';
import { PaperPerMonthQuery } from '@/interfaces/BI';

export class PrismaPaperRepository implements PaperRepository {
  async add(paper: PaperPayload): Promise<Paper> {
    return await prismaClient.paper.create({
      data: {
        ptccDocumentUrl: paper?.documentUrl,
        theme: {
          connect: {
            id: paper.themeId,
          },
        },
        orientee: {
          connect: {
            id: paper.studentId,
          },
        },
        advisor: {
          connect: {
            id: paper.professorId,
          },
        },
      },
    });
  }

  async update(paper: Partial<Paper>): Promise<void> {
    await prismaClient.paper.update({
      where: {
        id: paper.id,
      },
      data:
        paper.type === 'PTCC'
          ? { ptccDocumentUrl: paper.documentUrl }
          : { tccDocumentUrl: paper.documentUrl },
    });
  }

  async findByThemeId(id: string): Promise<Paper> {
    return await prismaClient.paper.findUnique({
      where: {
        themeId: id,
      },
    });
  }

  async listByUser(userId: string): Promise<Paper[]> {
    return await prismaClient.paper.findMany({
      where: {
        OR: [{ professorId: userId }, { studentId: userId }],
      },
      include: {
        advisor: true,
        orientee: true,
        theme: true,
        approvals: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.paper.delete({
      where: {
        id,
      },
    });
  }

  async findById(id: string): Promise<Paper> {
    return await prismaClient.paper.findUnique({
      where: { id },
      include: {
        advisor: true,
        orientee: true,
        stages: true,
        theme: true,
        approvals: true,
      },
    });
  }

  // async getPaperData(): Promise<PaperPerMonthQuery[]> {
  //   const sixMonthsAgo = subMonths(new Date(), 5); // Start from 5 months ago to cover the last 6 months

  //   const papersPerMonth = await prismaClient.$queryRaw<PaperPerMonthQuery[]>`
  //     SELECT
  //       EXTRACT(YEAR FROM p."createdAt") AS year,
  //       EXTRACT(MONTH FROM p."createdAt") AS month,
  //       COUNT(p.id) AS "totalPapers",
  //       SUM(CASE WHEN p."type" = 'PTCC' THEN 1 ELSE 0 END) AS "ptccCount",
  //       SUM(CASE WHEN p."type" = 'PTCC' AND a."approval" = true THEN 1 ELSE 0 END) AS "ptccApprovedCount",
  //       SUM(CASE WHEN p."type" = 'TCC' THEN 1 ELSE 0 END) AS "tccCount",
  //       SUM(CASE WHEN p."type" = 'TCC' AND a."approval" = true THEN 1 ELSE 0 END) AS "tccApprovedCount"
  //     FROM "Paper" p
  //     LEFT JOIN "Approval" a ON a."paperId" = p."id"
  //     WHERE p."createdAt" >= ${sixMonthsAgo}
  //     GROUP BY year, month
  //     ORDER BY year ASC, month ASC;
  // `;

  //   return handleBigIntFields(papersPerMonth);
  // }
}

function handleBigIntFields(data: PaperPerMonthQuery[]): PaperPerMonthQuery[] {
  return data.map((item) => ({
    ...item,
    totalPapers: Number(item.totalPapers),
    ptccCount: Number(item.ptccCount),
    ptccApprovedCount: Number(item.ptccApprovedCount),
    tccCount: Number(item.tccCount),
    tccApprovedCount: Number(item.tccApprovedCount),
  }));
}
