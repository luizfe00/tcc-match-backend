import { EurekaASService, EurekaDASService } from '@/interfaces/eureka';
import { ProfileResponse, TokenResponse } from '@/interfaces/eureka-responses';
import {
  EurekaGetStudentRequest,
  EurekaGetTeacherRequest,
  EurekaProfileRequest,
  EurekaTokenRequest,
} from '@/interfaces/eureka-service';
import axios, { AxiosInstance } from 'axios';

export class EurekaService implements EurekaASService, EurekaDASService {
  private readonly EurekaUrl = process.env.EUREKA_URL ?? 'https://eureca.sti.ufcg.edu.br';
  private readonly DASUrl_v2 = 'das-dev';
  private readonly DASUrl_v1 = 'das';
  private readonly ASUrl = 'as';
  private eurekaAxiosInstance: AxiosInstance;

  constructor() {
    this.init();
  }

  private init() {
    const axiosInstance = axios.create({ baseURL: this.EurekaUrl });
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
      `${this.EurekaUrl}/${this.ASUrl}/tokens`,
      body
    );
    return data;
  };

  public profile: EurekaProfileRequest = async (token) => {
    this.eurekaAxiosInstance.defaults.headers['Authentication-Token'] = token;
    const { data } = await this.eurekaAxiosInstance.get<ProfileResponse>(
      `${this.EurekaUrl}/${this.ASUrl}/profile`
    );
    return data;
  };

  getStudent: EurekaGetStudentRequest;
  getTeacher: EurekaGetTeacherRequest;
}
