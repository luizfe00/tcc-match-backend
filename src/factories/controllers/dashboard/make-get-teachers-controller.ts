import { GetTeachersController } from '@/controllers/dashboard/get-teachers-controller';
import { Controller } from '@/controllers/ports';
import { makeUserRepository } from '@/factories/repository/make-user-repository';
import { makeEurekaService } from '@/factories/services/make-eureka-service';
import { GetTeachers } from '@/usecases/dashboard/get-teachers';

export const makeGetTeachersController = (): Controller => {
  const eurecaService = makeEurekaService();
  const userRepository = makeUserRepository();
  const useCase = new GetTeachers(eurecaService, userRepository);
  return new GetTeachersController(useCase);
};
