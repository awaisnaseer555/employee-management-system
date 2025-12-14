# Employee Management System — System Design

## 1. Overview
The Employee Management System is a small full-stack application designed to manage employee records.
It allows an admin user to authenticate, view employees, apply filters, paginate results, and create new employee records.

The system is intentionally kept simple while following production-ready architectural patterns.

---

## 2. Architecture
The application follows a three-tier architecture:

Frontend (Next.js)
        ↓
Backend API (NestJS)
        ↓
Database (MySQL)

Each layer is independently scalable and loosely coupled.

---

## 3. Backend Design (NestJS)

### Responsibilities
- Expose RESTful APIs
- Handle authentication using hardcoded credentials
- Perform Add / View operations on employees
- Apply searching, filtering, and pagination
- Validate inserting data

### Authentication
Hardcoded credentials:
- Email: admin@example.com
- Password: admin123

On success, a dummy token is returned.
On failure, HTTP 401 Unauthorized is returned.

---

## 4. Database Design (MySQL)

### Table: employees

id (INT, Primary Key, Auto Increment)
name (VARCHAR, required)
role (VARCHAR, required)
salary (INT, must be greater than 0)

The database is managed using MySQL Workbench and seeded with sample employee records.

---

## 5. API Design

### POST /login
- Validates hardcoded credentials
- Returns a dummy authentication token

### GET /employees
Supports:
- Name search using SQL LIKE
- Salary filtering using minSalary and maxSalary
- Pagination using page and limit (LIMIT + OFFSET)

### POST /employees
Creates a new employee record.

Validation rules:
- name is required
- role is required
- salary must be greater than 0

---

## 6. Frontend Design (Next.js)

### Responsibilities
- User interface and user experience
- Communication with backend APIs
- Client-side validation
- State management

### Features
- Login page
- Employees dashboard with table view
- Search by name
- Salary range filtering
- Pagination with boundary checks
- Create employee form
- Dark and light theme toggle
- Responsive UI using Tailwind CSS

---

## 7. Application Flow

User
 ↓
Next.js UI
 ↓
NestJS REST API
 ↓
MySQL Database
 ↓
NestJS
 ↓
Next.js UI

---

## 8. Non-Functional Considerations

### Scalability
- Backend services can be scaled independently
- Database queries optimized using server-side filtering

### Security
- Input validation on frontend and backend
- SQL injection prevented using parameterized queries
- Authentication can be upgraded to JWT

### Extensibility
- Modular NestJS architecture
- Easy to add update/delete operations
- Role-based access control
- Caching using Redis

---

## 9. Conclusion
This system demonstrates a clean, maintainable, and scalable full-stack design using modern technologies while remaining aligned with the task requirements.
