import { PaperPerMonthQuery, PaperPerProfessorQuery } from '@/interfaces/BI';
import { Paper } from '@/models/paper';
import { PaperType } from '@prisma/client';

export const countPapersByType = (papers: Paper[], type: PaperType) => {
  return papers.filter((paper) => paper.type === type).length;
};

export const countApprovedPapersByType = (papers: Paper[], type: PaperType) => {
  return papers.filter((paper) => paper.type === type && paper.status === 'COMPLETED').length;
};

const createInitialMonthStat = (date: Date): PaperPerMonthQuery => {
  return {
    month: date.getMonth(),
    year: date.getFullYear(),
    totalPapers: 0,
    ptccCount: 0,
    ptccApprovedCount: 0,
    tccCount: 0,
    tccApprovedCount: 0,
  };
};

export const getPaperPerMonthStats = (papers: Paper[]) => {
  const monthStats = new Map<string, PaperPerMonthQuery>();

  papers.forEach((paper) => {
    const key = `${paper.createdAt.getFullYear()}-${paper.createdAt.getMonth()}`;
    const stat = monthStats.get(key) || createInitialMonthStat(paper.createdAt);

    stat.totalPapers++;
    if (paper.type === 'PTCC') {
      stat.ptccCount++;
      if (paper.status === 'COMPLETED') {
        stat.ptccApprovedCount++;
      }
    } else {
      stat.tccCount++;
      if (paper.status === 'COMPLETED') {
        stat.tccApprovedCount++;
      }
    }
    monthStats.set(key, stat);
  });

  return Array.from(monthStats.values());
};

const createInitialProfessorStat = (paper: Paper): PaperPerProfessorQuery => {
  return {
    professorName: paper?.advisor?.name,
    professorEmail: paper?.advisor?.email,
    professorId: paper?.advisor?.id,
    totalPapers: 0,
    ptccCount: 0,
    ptccApprovedCount: 0,
    tccCount: 0,
    tccApprovedCount: 0,
  };
};

export const getProfessorPaperBI = (papers: Paper[]) => {
  const professorStats = new Map<string, PaperPerProfessorQuery>();

  papers.forEach((paper) => {
    const stat = professorStats.get(paper.professorId) || createInitialProfessorStat(paper);

    stat.totalPapers++;
    if (paper.type === 'PTCC') {
      stat.ptccCount++;
      if (paper.status === 'COMPLETED') {
        stat.ptccApprovedCount++;
      }
    } else {
      stat.tccCount++;
      if (paper.status === 'COMPLETED') {
        stat.tccApprovedCount++;
      }
    }
    professorStats.set(paper.professorId, stat);
  });

  return Array.from(professorStats.values());
};
