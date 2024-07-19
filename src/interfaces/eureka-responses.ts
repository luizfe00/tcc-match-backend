export type TokenResponse = { token: string };
export type ProfileResponse = {
  id: string;
  name: string;
  identityProviderId: string;
  attributes: {
    code: string;
    type: string;
    email: string;
  };
};
export type GetStudentResponse = {
  registration: string;
  courseCode: number;
  curriculumCode: number;
  campus: number;
  maritalStatus: string;
  gender: string;
  birthDate: string;
  status: string;
  inactivityReason: string;
  inactivityYear: string;
  inactivityPeriod: string;
  admissionType: string;
  admissionYear: number;
  admissionPeriod: number;
  nationality: string;
  countryOfBirth: string;
  race: string;
  secondarySchoolGraduationYear: number;
  secondarySchoolType: string;
  affirmativePolicy: string;
  ufpb: string;
};

export type GetTeacherResponse = {
  registration: number;
  name: string;
  academicUnitCode: number;
  email: string;
  status: string;
  cpf: string;
  siape: number;
  titration: string;
};
