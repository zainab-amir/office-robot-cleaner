# Office Robot Cleaner

A Node.js microservice built with TypeScript and Fastify framework.
For improvement considerations: [docs](./docs/improvments).

## Prerequisites

- Node.js v22 or higher
- Docker and Docker Compose
- npm package manager

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Query Builder**: Knex.js
- **Containerization**: Docker
- **Input Validation**: Joi/Zod

## Getting Started

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/zainab-amir/office-robot-cleaner.git
cd office-robot-cleaner
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Start the development environment using Docker Compose:

If you are running this on Mac then chances are port `5000` is already in use by "AirPlay Receiver". Change 
the port or disable the service from `System Settings > General > AirDrop & Handoff > AirPlay Receiver.`

```bash
docker compose up
```

```bash
npm run migrate
```

The service will be available at `http://localhost:5000`

## API Documentation

The API documentation is available through Swagger when the server is running:

```
http://localhost:5000/docs
http://localhost:5000/docs/json
```

### Running Tests

The project includes both unit and integration tests:

- Run unit tests:

```bash
npm run test:unit
```

- Run integration tests (requires Docker):

```bash
npm run test:integration
```

- Run all tests (requires Docker):

```bash
npm test
```

### Database Migrations

The project uses Knex.js for database migrations:

- Create a new migration:

```bash
npm run migrate:make <migration-name>
```

- Run migrations (If you are running it for development using Docker, make sure the container is running):

```bash
npm run migrate
```

- Rollback migrations:

```bash
npm run migrate:rollback
```

## Docker Support

The project includes multi-stage Docker builds for optimized production images.

### Available Services

The Docker Compose configuration includes:

- **API Service**: Runs on port 5000
- **PostgreSQL Database**:
  - Development: Port 5432
  - Test: Port 5433

## Project Structure

```
office-robot-cleaner/
├── config/
│   ├── app.config.ts
│   ├── jest.config.ts
│   ├── jest.unit.config.ts
│   ├── jest.integration.config.ts
│   └── knexfile.ts
├── scripts/
│   └── runMigrations.ts
├── src/
│   └── controllers/
│   │   └── v1/
│   │   │   └── robotController.ts
│   └── db/
│   │   └── migrations/
│   │   │   └── YYYYMMDDHHMMSS_<file name>.ts
│   └── plugins/
│   └── repositories/
│   └── routes/
│   │   └── v1/
│   │   │   └── robotRoutes.ts
│   └── services/
│   │   └── robot/
│   │   │   └── robotService.ts
│   │   │   └── robotService.types.ts
│   └── tests/
│   └── utils/
│   └── validators/
│   └── app.ts
│   └── server.ts
├── docker-compose.yml
├── docker-compose.test.yml
├── Dockerfile
├── package.json
└── package-lock.json
```
