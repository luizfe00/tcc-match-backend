import { EurekaASService, EurekaDASService } from '@/interfaces/eureka';
import { GetTeacherResponse, ProfileResponse, TokenResponse } from '@/interfaces/eureka-responses';
import {
  EurekaGetStudentRequest,
  EurekaGetTeacherRequest,
  EurekaGetTeachersRequest,
  EurekaProfileRequest,
  EurekaTokenRequest,
} from '@/interfaces/eureka-service';
import axios, { AxiosInstance } from 'axios';

export class EurecaService implements EurekaASService, EurekaDASService {
  private readonly EurecaUrl = process.env.EUREKA_URL ?? 'https://eureca.sti.ufcg.edu.br';
  private readonly DASUrl_v2 = 'das-dev';
  private readonly DASUrl_v1 = 'das/v1';
  private readonly ASUrl = 'as';
  private eurekaAxiosInstance: AxiosInstance;

  constructor() {
    this.init();
  }

  private init() {
    const axiosInstance = axios.create({ baseURL: this.EurecaUrl });
    this.eurekaAxiosInstance = axiosInstance;
  }

  public tokens: EurekaTokenRequest = async (username, password) => {
    const body = {
      credentials: {
        username,
        password,
      },
    };
    const { data } = await this.eurekaAxiosInstance.post<TokenResponse>(
      `${this.EurecaUrl}/${this.ASUrl}/tokens`,
      body
    );

    return data;
  };

  public profile: EurekaProfileRequest = async (token) => {
    this.eurekaAxiosInstance.defaults.headers['Authentication-Token'] = token;
    this.eurekaAxiosInstance.defaults.headers['token-De-Autenticacao'] = token;
    const { data } = await this.eurekaAxiosInstance.get<ProfileResponse>(
      `${this.EurecaUrl}/${this.ASUrl}/profile`
    );
    return data;
  };

  getStudent: EurekaGetStudentRequest;
  getTeacher: EurekaGetTeacherRequest;

  public getTeachers: EurekaGetTeachersRequest = async (
    academicUnitCode: string,
    token: string
  ) => {
    this.eurekaAxiosInstance.defaults.headers['Authentication-Token'] = token;
    const { data } = await this.eurekaAxiosInstance.get<GetTeacherResponse[]>(
      `${this.EurecaUrl}/${this.DASUrl_v1}/teachers/getAllByAcademicUnit?academicUnitCode=${academicUnitCode}&anonymize=true`
    );
    return data;
  };

  public getSubjects = async (academicUnitCode: string, token: string) => {
    this.eurekaAxiosInstance.defaults.headers['Authentication-Token'] = token;
    const { data } = await this.eurekaAxiosInstance.get(
      `${this.EurecaUrl}/${this.DASUrl_v1}/subjects/getAllByAcademicUnit?academicUnitCode=${academicUnitCode}&anonymize=true`
    );
    return data;
  };

  private getActiveStudents = async (
    courseCode: string,
    curriculumCode: string,
    from: string,
    to: string,
    token: string
  ) => {
    this.eurekaAxiosInstance.defaults.headers['Authentication-Token'] = token;
    const { data } = await this.eurekaAxiosInstance.get(
      `${this.EurecaUrl}/${this.DASUrl_v1}/students/getActives?courseCode=${courseCode}&curriculumCode=${curriculumCode}&from=${from}&to=${to}&anonymize=true`
    );
    return data;
  };
}
