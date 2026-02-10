# Entity Relationship Diagram

```mermaid
erDiagram
    ORGANIZATION ||--o{ USER : "has"
    ORGANIZATION ||--o{ TASK : "contains"
    USER ||--o{ TASK : "creates"
    USER ||--o{ TASK : "assigned_to"
    USER }o--o{ USER : "manages"

    ORGANIZATION {
        string id PK
        string name
        datetime createdAt
        datetime updatedAt
    }

    USER {
        string id PK
        string username UK
        string password
        string email
        enum role "OWNER|ADMIN|VIEWER"
        string organizationId FK
        datetime createdAt
        datetime updatedAt
    }

    TASK {
        string id PK
        string title
        string description
        enum status "OPEN|IN_PROGRESS|DONE"
        string organizationId FK
        string createdById FK
        string assignedToId FK
        datetime createdAt
        datetime updatedAt
    }

    AUDIT_LOG {
        string id PK
        string userId FK
        string action
        string resource
        string method
        datetime timestamp
    }
```

## Database Schema Details

### Organization

- **Primary Key**: `id` (UUID)
- **Relationships**:
  - One-to-Many with Users
  - One-to-Many with Tasks

### User

- **Primary Key**: `id` (UUID)
- **Unique Constraint**: `username`
- **Roles**: OWNER, ADMIN, VIEWER
- **Relationships**:
  - Many-to-One with Organization
  - One-to-Many with Tasks (as creator)
  - One-to-Many with Tasks (as assignee)
  - Many-to-Many with Users (manager hierarchy)

### Task

- **Primary Key**: `id` (UUID)
- **Status Values**: OPEN, IN_PROGRESS, DONE
- **Relationships**:
  - Many-to-One with Organization
  - Many-to-One with User (creator)
  - Many-to-One with User (assignee)

### Audit Log

- **Primary Key**: `id` (UUID)
- **Purpose**: Track all user actions for security and compliance
- **Relationships**:
  - Many-to-One with User
