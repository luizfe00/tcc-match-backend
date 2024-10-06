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
