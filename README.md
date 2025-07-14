# jk_tech_assignment
A scalable and maintainable backend application built using NestJS and TypeScript. This project follows a modular architecture and includes best practices for building RESTful APIs, integrating databases, and applying clean code principles.

#Features
1.Modular architecture using @Module, @Controller, and @Service
2.REST API development
3.MVC folder structure (src/module-name/{controller, service, dto, entity})
4.JWT-based authentication and authorization (optional)
5.PostgreSQL integration
6.Validation using class-validator and class-transformer
7.Environment configuration using @nestjs/config


#Tech Stack
Backend: NestJS (TypeScript)
Database: PostgreSQL / MongoDB (configurable)
Validation: class-validator
Testing: Jest

#Folder Structure
src/
│
├── auth/             # Authentication module
├── user/             # User module
├── common/           # Shared utilities and interceptors
├── config/           # Environment and app configuration
├── main.ts           # App entry point
└── app.module.ts     # Root module


# Install dependencies
npm install

# Run in development
npm run start:dev

# Build for production
npm run build

# Test the application
npm run test
