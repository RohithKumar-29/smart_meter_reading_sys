# Smart Meter Readings System

Smart Meter Readings System is an EnergyTech platform for managing electricity meter readings and turning operational grid data into useful consumption, billing, capacity, and forecasting insights.

The project is primarily an academic DBMS project, developed with production-style structure and conventions so that it can grow into a realistic energy operations product.

## Project Purpose

The system will provide a central place to manage consumers, smart meters, readings, electricity consumption analytics, billing, and grid network information. Future modules will support demand forecasting, capacity monitoring, alerts, reporting, and authentication.

The first development step establishes the project foundation only. Application code, database schema, fake data, fake APIs, and UI implementation will be added incrementally in later steps.

## Architecture

The application follows a simple layered architecture:

```text
React frontend
    |
    v
Spring Boot REST API
    |
    v
Spring Data JPA / Hibernate
    |
    v
Supabase PostgreSQL
```

A future forecasting workflow will use historical meter readings as input to an explainable Python forecasting component. Spring Boot will expose the resulting forecast data to the React dashboard.

No unnecessary microservices, message brokers, container orchestration, caches, or complex queues are planned.

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Recharts
- Lucide React

### Backend

- Java
- Spring Boot
- Maven
- Spring Web
- Spring Data JPA
- Hibernate
- Bean Validation

### Database

- Supabase
- PostgreSQL

### Forecasting

- Python
- Pandas
- NumPy
- Scikit-learn or another simple, explainable forecasting approach

## Planned Modules

- Consumers
- Smart meters
- Meter readings
- Electricity consumption analytics
- Billing
- Substations
- Feeders
- Grid connections
- Demand forecasting
- Capacity monitoring
- Alerts
- Reports
- Authentication and access control

## Project Structure

```text
.
├── frontend/       React and TypeScript application
├── backend/        Spring Boot REST API
├── database/       Database design, migrations, and seed placeholders
├── forecasting/    Future Python forecasting work
├── docs/           Architecture and project documentation
├── .gitignore
└── README.md
```

## Development Roadmap

1. Project foundation
2. Database design
3. Supabase configuration
4. Backend foundation
5. Backend to Supabase connection
6. Database entities and repositories
7. REST APIs
8. API testing
9. Frontend foundation
10. Professional UI and UX
11. Frontend to backend integration
12. Consumption analytics
13. Billing
14. Grid network
15. Forecasting
16. Capacity monitoring
17. Alerts
18. Authentication
19. Testing
20. Deployment
21. Final cleanup and documentation

## Backend Foundation

The Spring Boot backend foundation is located in `backend/`. It is a modular monolith configured for Java 17, Maven, Spring Web, Spring Data JPA, Hibernate, Bean Validation, Actuator, and the PostgreSQL JDBC driver.

The backend connects to the existing Supabase PostgreSQL database through JDBC using environment variables. Hibernate uses `ddl-auto: validate`, so it validates mapped entities without creating, updating, or deleting database tables. No domain entities or business APIs have been added yet.

Required environment variables:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USERNAME`
- `DB_PASSWORD`

Optional variables include `DB_SSL_MODE`, `DB_SCHEMA`, `DB_POOL_SIZE`, and `SERVER_PORT`. Use [backend/.env.example](backend/.env.example) as a placeholder reference only. Do not commit real credentials or create a real `.env` file in the repository.

Run the backend from the `backend/` directory with Maven:

```bash
mvn spring-boot:run
```

The default server port is `8080`. The foundation health endpoint is `GET http://localhost:8080/api/health`; it reports the backend and PostgreSQL connectivity status. Spring Boot Actuator health and info endpoints are also exposed at `/actuator/health` and `/actuator/info`.

## Current Status

Step 4, Spring Boot foundation and Supabase PostgreSQL connection, is scaffolded. The database schema already exists in Supabase and is not recreated by the backend. Domain entities, business services, CRUD APIs, frontend, authentication, and forecasting remain planned for later steps.

## Working Principles

- Build incrementally and keep each layer understandable.
- Design the database carefully before implementing domain entities.
- Keep business logic in the backend service layer.
- Validate API input at the application boundary.
- Keep the frontend accessible, responsive, and focused on operational clarity.
- Avoid introducing infrastructure that is not needed for the academic project.
