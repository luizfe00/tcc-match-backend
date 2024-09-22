import {
  GetStudentResponse,
  GetTeacherResponse,
  ProfileResponse,
  TokenResponse,
} from './eureka-responses';

export type EurekaTokenRequest = (username: string, password: string) => Promise<TokenResponse>;
export type EurekaProfileRequest = (token: string) => Promise<ProfileResponse>;
export type EurekaGetStudentRequest = (
  enrollment: string,
  token: string,
  anonymize?: boolean
) => Promise<GetStudentResponse>;
export type EurekaGetTeacherRequest = (
  siape: number,
  token: string,
  anonymize?: boolean
) => Promise<GetTeacherResponse>;
export type EurekaGetTeachersRequest = (
  academicUnitCode: string,
  token: string
) => Promise<GetTeacherResponse[]>;
