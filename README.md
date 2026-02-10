# Secure Task Management System

**Assessment Project for Turbovets**

This project is a secure, role-based task management system built using Nx, NestJS, and Angular. It features a modern, responsive UI with TailwindCSS and a robust backend with RBAC, JWT authentication, and TypeORM.

## Features

- **Authentication**: Secure Login with JWT.
- **Role-Based Access Control (RBAC)**: Supports roles (`ADMIN`, `OWNER`, `VIEWER`) to restrict access.
- **Task Management**: Create, Read, Update, and Delete tasks.
- **Drag & Drop Dashboard**: Kanban-style board to manage task statuses (`OPEN`, `IN_PROGRESS`, `DONE`).
- **Organization Hierarchy**: Tasks and Users are scoped to Organizations.
- **Audit Logging**: Tracks access and actions (stored in `access.log`).
- **Data Seeding**: Automatically creates default `admin` and `demo` users on first run.

## Technology Stack

- **Monorepo**: Nx
- **Backend**: NestJS, TypeORM, SQLite, Passport, JWT
- **Frontend**: Angular, TailwindCSS, Angular CDK (Drag & Drop)
- **Shared Libraries**: TypeScript Interfaces, Enums

## Prerequisites

- Node.js (v18+)
- npm or pnpm

## Getting Started

1.  **Clone the Repository** (if not already done).

2.  **Install Dependencies**:
    ```bash
    npm install
    # or
    pnpm install
    ```

3.  **Start the Backend (API)**:
    ```bash
    npx nx serve api
    ```
    - The API will run on `http://localhost:3000`.
    - On first run, it will create a `db.sqlite` file and seed two users:
        - **Admin**: `admin` / `password`
        - **Viewer**: `demo` / `password`

4.  **Start the Frontend (Dashboard)**:
    ```bash
    npx nx serve dashboard
    ```
    - Access the dashboard at `http://localhost:4200`.

## Architecture

### Backend (`apps/api`)
- **Modules**:
    - `AuthModule`: Handles Login and JWT generation.
    - `UsersModule`: Manages user data including hashed passwords.
    - `TasksModule`: CRUD for tasks with ownership checks.
    - `OrganizationsModule`: Organization structure.
    - `AuditModule`: Logs access events.
- **Security**:
    - `JwtAuthGuard`: Protects endpoints.
    - `RolesGuard`: Enforces RBAC permissions.
    - `LocalStrategy`: Validates username/password.

### Frontend (`apps/dashboard`)
- **Features**:
    - `AuthService`: Manages token storage and login state.
    - `TaskBoardComponent`: Main dashboard with drag-and-drop columns.
    - `HasRoleDirective`: Utility to hide UI elements based on user role.
    - `JwtInterceptor`: Attaches Bearer token to all HTTP requests.

## Testing

To run backend unit tests:
```bash
npx nx test api
```

To run frontend unit tests:
```bash
npx nx test dashboard
```

## License

This project is for assessment purposes only.
