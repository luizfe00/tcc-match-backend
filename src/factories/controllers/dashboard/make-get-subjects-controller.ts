import { GetSubjectsController } from '@/controllers/dashboard/get-subjects-controller';
import { Controller } from '@/controllers/ports';
import { makeUserRepository } from '@/factories/repository/make-user-repository';
import { makeEurekaService } from '@/factories/services/make-eureka-service';
import { GetSubjects } from '@/usecases/dashboard/get-subjects';

export const makeGetSubjectsController = (): Controller => {
  const eurecaService = makeEurekaService();
  const userRepository = makeUserRepository();
  const getSubjects = new GetSubjects(eurecaService, userRepository);
  return new GetSubjectsController(getSubjects);
};
