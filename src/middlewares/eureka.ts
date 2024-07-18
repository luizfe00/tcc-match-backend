import { EurekaASService, EurekaDASService } from '@/interfaces/eureka';
import {
  EurekaGetStudentRequest,
  EurekaGetTeacherRequest,
  EurekaProfileRequest,
  EurekaTokenRequest,
} from '@/interfaces/eureka-service';

export class EurekaService implements EurekaASService, EurekaDASService {
  getStudent: EurekaGetStudentRequest;
  getTeacher: EurekaGetTeacherRequest;
  profile: EurekaProfileRequest;
  tokens: EurekaTokenRequest;
}
