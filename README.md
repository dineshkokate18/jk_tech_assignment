
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
Database: PostgreSQL
Validation: class-validator
Testing: Jest

#Folder Structure
src/
│
├── auth/             # Authentication module
├── users/             # User module
├── document/         # Document Crud module
├── ingestion/        # microsevices trigger module
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


## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
