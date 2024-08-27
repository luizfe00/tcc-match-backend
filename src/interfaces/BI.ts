export type PaperPerMonthQuery = {
  year: number;
  month: number;
  totalPapers: number;
  ptccCount: number;
  ptccApprovedCount: number;
  tccCount: number;
  tccApprovedCount: number;
};

export type StageBI = {
  stagesCount: number;
  stagesViewedCount: number;
  stagesRespondedCount: number;
};

export type CategoryInterestsQuery = {
  id: string;
  name: string;
  count: number;
};

export type InterestBI = {
  interestsCount: number;
  interestsApprovedCount: number;
  categoriesWithMostInterests: CategoryInterestsQuery[];
  categoriesWithLeastInterests: CategoryInterestsQuery[];
};

export type ThemeInterestsQuery = {
  id: string;
  label: string;
  interestCount: number;
};

export type ThemeBI = {
  themeCount: number;
  themeActiveCount: number;
  studentThemeCount: number;
  studentActiveThemeCount: number;
  professorThemeCount: number;
  professorActiveThemeCount: number;
  themesWithMostInterests: ThemeInterestsQuery[];
  themesWithLeastInterests: ThemeInterestsQuery[];
  professorThemeStats: ProfessorThemeStatsQuery[];
};

export type ProfessorThemeStatsQuery = {
  professorId: string;
  professorName: string;
  professorEmail: string;
  professorEnrollment: string;
  totalThemes: number;
  activeThemes: number;
  inactiveThemes: number;
};

export type PaperPerProfessorQuery = {
  professorId: string;
  professorName: string;
  professorEmail: string;
  totalPapers: number;
  ptccCount: number;
  ptccApprovedCount: number;
  tccCount: number;
  tccApprovedCount: number;
};

export type PaperBI = {
  totalPapers: number;
  ptccCount: number;
  ptccApprovedCount: number;
  tccCount: number;
  tccApprovedCount: number;
  paperPerMonth: PaperPerMonthQuery[];
  professorPaperBI: PaperPerProfessorQuery[];
};

export type CategoryThemesQuery = {
  id: string;
  name: string;
  themeCount: number;
  paperCount: number;
};

export type CategoryBI = {
  categoriesWithMostThemes: CategoryThemesQuery[];
  categoriesWithLeastThemes: CategoryThemesQuery[];
  categoriesWithMostPapers: CategoryThemesQuery[];
  categoriesWithLeastPapers: CategoryThemesQuery[];
};

export type DashboardBI = {
  papers: PaperBI;
  interests: InterestBI;
  themes: ThemeBI;
  categories: CategoryBI;
};

export type DashboardBIQuery = {
  startDate: string;
  endDate: string;
};
