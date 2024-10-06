# tcc-match-backend

## Overview

`tcc-match-backend` is a backend application designed to help students and teachers at UFCG manage their course conclusion papers. The application provides functionalities for managing themes, approvals, stages, and user interactions, ensuring a smooth workflow for both students and advisors.

## Features

- User authentication and role management (Students, Teachers, Coordinators)
- Theme management (creation, editing, listing)
- Approval management for course papers
- Stage management for tracking paper progress
- Email notifications for important deadlines
- Database seeding for initial data setup

## Technologies Used

- **Node.js**: JavaScript runtime for building the backend
- **Express**: Web framework for building APIs
- **TypeScript**: Superset of JavaScript for type safety
- **Prisma**: ORM for database interactions
- **PostgreSQL**: Relational database for data storage
- **Cypress**: End-to-end testing framework
- **Docker**: Containerization for easy deployment

### Prerequisites

- Node.js (version 20.14.0)
- PostgreSQL
- Docker (optional, for containerized setup)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/tcc-match-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory
   - Add the following environment variables:

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/tcc-match?schema=public"
   ```

4. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

5. Seed the database (optional):

   ```bash
   npx ts-node prisma/seed/seed.ts
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

### Running with Docker

1. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

2. Access the application at `http://localhost:8080`.

## Maintaining and Creating New Features

### Project Structure

Before adding new features, familiarize yourself with the project structure. The main directories include:

- **src/**: Contains the source code for the application.
  - **controllers/**: Handles incoming requests and responses.
  - **usecases/**: Contains business logic and application rules.
  - **models/**: Defines data structures and types.
  - **repositories/**: Manages data access and persistence.
  - **routes/**: Defines API endpoints and their handlers.
  - **configs/**: Contains configuration files and middleware setup.
  - **factories/**: Responsible for creating instances of services and repositories.
  - **utils/**: Utility functions and helpers.

### Adding New Features

1. **Identify the Feature**:
   Clearly define the feature you want to implement. Consider how it fits into the existing architecture and what components will be affected.

2. **Create a New Use Case**:
   In the `src/usecases/` directory, create a new file for your use case. This file should contain the business logic for your feature.

   ```typescript
   // src/usecases/new-feature.ts
   export class NewFeature implements UseCase {
     // Implementation of the new feature
     async perform() {}
   }
   ```

   2.1 **Create a Repository**:
   In the `src/repositories/` directory, create a new file for your repository. This file should contain the data access logic for your feature.

   > You may need to create a new interface (or edit an existing one) in the `src/repositories/ports/` directory. This interface should contain the methods that your repository needs to implement.

   ```typescript
   // src/repositories/new-feature-repository.ts
   export class PrismaNewFeatureRepository implements NewFeatureRepository {
     // Implementation of the new feature repository
   }
   ```

3. **Create a Controller**:
   In the `src/controllers/` directory, create a new controller that will handle requests related to your feature.

   ```typescript
   // src/controllers/new-feature-controller.ts
   import { NewFeature } from '@/usecases/new-feature';

   export class NewFeatureController implements Controller {
     constructor(private readonly useCase: NewFeature) {}

     async handle(req, res) {
       // Handle the request and response
     }
   }
   ```

4. **Create Factory**:
   In the `src/factories/` directory, create a new factory that will be responsible for creating instances of your controller and other dependencies.

   ```typescript
   // src/factories/new-feature-factory.ts
   import { NewFeatureController } from '@/controllers/new-feature-controller';
   import { NewFeature } from '@/usecases/new-feature';

   export const makeNewFeatureController = () => {
     const useCase = new NewFeature();
     const controller = new NewFeatureController(useCase);
     return controller;
   };
   ```

5. **Define Routes**:
   In the `src/routes/` directory, create or update a file to define the API endpoints for your feature.

   ```javascript
   // src/routes/new-feature.js
   app.post('/new-feature', makeNewFeatureController());
   ```

   5.1 **Define Validations**:
   In the `src/factories/validators/` directory, create or update a file to define the validations for your feature.

   ```typescript
   // src/validations/new-feature-validation.ts
   export const makeNewFeatureValidator = (): Validator => {
     const joiSchema = Joi.object<interface>({
       //...Feature body validation
     });

     return new PayloadValidation(joiSchema);
   };
   ```

### Best Practices

- **Follow Coding Standards**: Adhere to the coding standards and style guides used in the project.
- **Keep Features Small**: Break down larger features into smaller, manageable tasks to make development easier and more organized.
- **Communicate**: If you're working in a team, communicate with other developers about your changes and seek feedback.
- **Review Pull Requests**: Participate in code reviews to maintain code quality and share knowledge with the team.

### Conclusion

By following these guidelines, you can effectively maintain and contribute to the `tcc-match-backend` project. Your contributions are valuable, and together we can enhance the functionality and usability of the application!
