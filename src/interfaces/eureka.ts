import {
  EurekaTokenRequest,
  EurekaProfileRequest,
  EurekaGetStudentRequest,
  EurekaGetTeacherRequest,
} from './eureka-service';

export interface EurekaASService {
  tokens: EurekaTokenRequest;
  profile: EurekaProfileRequest;
}

export interface EurekaDASService {
  getStudent: EurekaGetStudentRequest;
  getTeacher: EurekaGetTeacherRequest;
}
