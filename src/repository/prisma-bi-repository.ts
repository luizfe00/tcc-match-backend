import { DashboardBI, InterestBI, PaperBI, ThemeBI, CategoryBI } from '@/interfaces/BI';
import { BIRepository } from '@/usecases/ports/bi-repository';
import prismaClient from './prisma-client';
import { Paper } from '@/models/paper';
import {
  countApprovedPapersByType,
  countPapersByType,
  getPaperPerMonthStats,
  getProfessorPaperBI,
} from '@/utils/BiUtil';

export class PrismaBIRepository implements BIRepository {
  async getDashboardData(startDate: Date, endDate: Date): Promise<DashboardBI> {
    const [paperData, themeData, interestData, categoryData] = await Promise.all([
      this.getPaperData(startDate, endDate),
      this.getThemeData(startDate, endDate),
      this.getInterestData(startDate, endDate),
      this.getCategoryData(startDate, endDate),
    ]);

    return {
      papers: paperData,
      themes: themeData,
      interests: interestData,
      categories: categoryData,
    };
  }

  private async fetchPaperData(startDate: Date, endDate: Date): Promise<Paper[]> {
    return await prismaClient.paper.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        advisor: true,
        theme: {
          include: {
            categories: true,
          },
        },
      },
    });
  }

  private async getPaperData(startDate: Date, endDate: Date): Promise<PaperBI> {
    const papers = await this.fetchPaperData(startDate, endDate);

    return {
      totalPapers: papers.length,
      ptccCount: countPapersByType(papers, 'PTCC'),
      ptccApprovedCount: countApprovedPapersByType(papers, 'PTCC'),
      tccCount: countPapersByType(papers, 'TCC'),
      tccApprovedCount: countApprovedPapersByType(papers, 'TCC'),
      paperPerMonth: getPaperPerMonthStats(papers),
      professorPaperBI: getProfessorPaperBI(papers),
    };
  }

  private async getThemeData(startDate: Date, endDate: Date): Promise<ThemeBI> {
    const themes = await prismaClient.theme.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        owner: true,
        paper: true,
        interests: true,
        categories: true,
      },
    });

    const themeCount = themes.length;
    const themeActiveCount = themes.filter((theme) => !!theme.paper).length;
    const studentThemes = themes.filter((theme) => theme.owner.role === 'STUDENT');
    const professorThemes = themes.filter((theme) => theme.owner.role === 'TEACHER');

    // Sort themes by interest count
    const sortedThemes = [...themes].sort((a, b) => b.interests.length - a.interests.length);
    const themesWithMostInterests = sortedThemes.slice(0, 5);
    const themesWithLeastInterests = sortedThemes.slice(-5).reverse();

    const professorThemeStats = await this.getProfessorThemeStats(startDate, endDate);

    return {
      themeCount,
      themeActiveCount,
      studentThemeCount: studentThemes.length,
      studentActiveThemeCount: studentThemes.filter((theme) => !!theme.paper).length,
      professorThemeCount: professorThemes.length,
      professorActiveThemeCount: professorThemes.filter((theme) => !!theme.paper).length,
      themesWithMostInterests: themesWithMostInterests
        .map((theme) => ({
          id: theme.id,
          label: theme.label,
          interestCount: theme.interests.length,
        }))
        .sort((a, b) => b.interestCount - a.interestCount),
      themesWithLeastInterests: themesWithLeastInterests
        .map((theme) => ({
          id: theme.id,
          label: theme.label,
          interestCount: theme.interests.length,
        }))
        .sort((a, b) => a.interestCount - b.interestCount),
      professorThemeStats,
    };
  }

  private async getProfessorThemeStats(startDate: Date, endDate: Date) {
    const professors = await prismaClient.user.findMany({
      where: {
        role: 'TEACHER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        enrollment: true,
        themes: {
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          include: {
            paper: true,
          },
        },
      },
    });

    return professors.map((professor) => {
      const totalThemes = professor.themes.length;
      const activeThemes = professor.themes.filter((theme) => !!theme.paper).length;
      const inactiveThemes = totalThemes - activeThemes;

      return {
        professorId: professor.id,
        professorName: professor.name,
        professorEmail: professor.email,
        professorEnrollment: professor.enrollment,
        totalThemes,
        activeThemes,
        inactiveThemes,
      };
    });
  }

  private async getInterestData(startDate: Date, endDate: Date): Promise<InterestBI> {
    const interests = await prismaClient.interest.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        theme: {
          include: {
            categories: true,
          },
        },
      },
    });

    const interestsCount = interests.length;
    const interestsApprovedCount = interests.filter((interest) => interest.approved).length;

    // Group interests by category
    const interestsByCategory = interests.reduce(
      (acc, interest) => {
        interest.theme.categories.forEach((category) => {
          if (!acc[category.id]) {
            acc[category.id] = { id: category.id, name: category.name, count: 0 };
          }
          acc[category.id].count++;
        });
        return acc;
      },
      {} as Record<string, { id: string; name: string; count: number }>
    );

    const sortedCategories = Object.values(interestsByCategory).sort((a, b) => b.count - a.count);

    return {
      interestsCount,
      interestsApprovedCount,
      categoriesWithMostInterests: sortedCategories.slice(0, 5),
      categoriesWithLeastInterests: sortedCategories.slice(-5).reverse(),
    };
  }

  private async getCategoryData(startDate: Date, endDate: Date): Promise<CategoryBI> {
    const categories = await prismaClient.categories.findMany({
      include: {
        themes: {
          where: {
            createdAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          include: {
            paper: true,
          },
        },
      },
    });

    const categoriesData = categories.map((category) => ({
      id: category.id,
      name: category.name,
      themeCount: category.themes.length,
      paperCount: category.themes.filter((theme) => !!theme.paper).length,
    }));

    const sortedByThemes = [...categoriesData].sort((a, b) => b.themeCount - a.themeCount);
    const sortedByPapers = [...categoriesData].sort((a, b) => b.paperCount - a.paperCount);

    return {
      categoriesWithMostThemes: sortedByThemes.slice(0, 5),
      categoriesWithLeastThemes: sortedByThemes.slice(-5).reverse(),
      categoriesWithMostPapers: sortedByPapers.slice(0, 5),
      categoriesWithLeastPapers: sortedByPapers.slice(-5).reverse(),
    };
  }
}
