# Employee Management System

A full-stack Employee Management System built using **Next.js**, **NestJS**, and **MySQL**.  
This project demonstrates clean architecture, REST APIs, database design, filtering, pagination, and a modern UI with dark/light theme support.

---

## 🚀 Tech Stack

### Frontend
- Next.js (App Router)
- React Hooks
- Tailwind CSS
- Axios

### Backend
- NestJS (Node.js)
- MySQL

### Tools
- MySQL Workbench
- Git & GitHub

---

## 🏗️ System Design & Architecture

Client (Next.js) → Backend (NestJS) → MySQL Database

- REST-based communication
- Backend handles filtering, pagination, validation
- Frontend handles UI state and user interactions

---

## 🔐 Authentication

**Hardcoded credentials**

Email: admin@example.com  
Password: admin123  

- On success → returns dummy token
- On failure → HTTP 401

---

## 🗄️ Database Design

Table: employees

id (INT, PK, AUTO_INCREMENT)  
name (VARCHAR, required)  
role (VARCHAR, required)  
salary (INT, > 0)

---

## 🧩 API Endpoints

POST /login  
GET /employees (search, salary filter, pagination)  
POST /employees (create employee)

---
## 🔐 Environment Variables (.env)

Create a `.env` file inside the **backend** folder:

```env

PORT=3001
DB_HOST=localhost 
DB_PORT=3306 
DB_USER=root 
DB_PASS=your_mysql_password 
DB_NAME=employee_db 

```
### Notes

 - Replace **your_mysql_password** with your MySQL password
---
## 🎨 Frontend Features

- Login
- Employee listing
- Search & filters
- Pagination with disabled controls
- Create employee form
- Dark / Light mode toggle
- Responsive Tailwind UI

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- npm
- MySQL Server
- MySQL Workbench

---

## 🛢️ Database Setup (MySQL Workbench)

```sql
CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(255),
  salary INT
);

INSERT INTO employees (name, role, salary) VALUES
('Awais Naseer', 'Senior Manager', 90000),
('Ali Khan', 'Software Engineer', 80000),
('Ahmed Raza', 'UI Designer', 65000);
```

---

## 🧠 Backend Setup

```bash
cd backend
npm install
npm run start:dev
```

---

## 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📁 Project Structure

employee-management-system/  
├── backend/  
├── frontend/  
└── README.md  
└── SYSTEM_DESIGN.md  

---

## 👤 Author

Mohammad Awais Naseer
