export const SystemRoles = {
  STUDENT: 'STUDENT',
  TEACHER: 'TEACHER',
  COORDINATOR: 'COORDINATOR',
} as const;

export type SystemRole = keyof typeof SystemRoles;
