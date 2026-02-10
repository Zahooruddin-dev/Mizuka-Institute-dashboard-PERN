# 🎓 Mizuka Institute Dashboard (PERN)

A robust Full-Stack Student Management System built with the **PERN Stack**
(PostgreSQL, Express, React, Node.js). This project demonstrates advanced CRUD
operations, relational database management, and optimized React performance.

---

## 🚀 Features

- **Dynamic Student Management:** Full CRUD (Create, Read, Update, Delete) with
  server-side validation.
- **Advanced Pagination & Sorting:** Efficiently handles large datasets using
  SQL `LIMIT` and `OFFSET`.
- **Relational Data Architecture:** Implements Many-to-Many relationships
  between Students and Classes via an Enrollment bridge table.
- **Optimized UI:** High-performance React implementation using `useCallback`,
  `memoization`, and custom hooks.
- **Global Toast Notifications:** Real-time feedback for all user actions.
- **Advanced Search:** Natural language search dialog and case-insensitive
  filtering.

---

## 🛠 Tech Stack

| Layer                | Technology                                     |
| :------------------- | :--------------------------------------------- |
| **Frontend**         | React.js, Axios, Lucide-React, CSS3            |
| **Backend**          | Node.js, Express.js                            |
| **Database**         | PostgreSQL                                     |
| **State Management** | React Hooks (useState, useEffect, useCallback) |
| **API Testing**      | REST Client / Postman                          |

---

## 📂 Database Schema

This project utilizes a relational structure to manage student-class
enrollments.

```sql
-- Students Table
CREATE TABLE students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Classes Table
CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_name VARCHAR(100) NOT NULL,
    time_in_pakistan INTEGER NOT NULL
);

-- Enrollment (Many-to-Many Bridge)
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id UUID REFERENCES students(id) ON DELETE CASCADE,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);🚦 API Endpoints
Students
GET /api/students - Get all students (Paginated/Sorted)

POST /api/students - Add new student

GET /api/students/:id - Get specific student details

GET /api/students/:id/classes - Get classes for a specific student

Classes & Enrollment
GET /api/class - Fetch all classes

POST /api/enroll - Enroll a student in a class (Many-to-Many)

GET /api/class-stats/popularity - Get analytics on class enrollment

🔧 Installation & Setup
Clone the repository

Bash
git clone [https://github.com/Zahooruddin-dev/Mizuka-Institute-dashboard-PERN.git](https://github.com/Zahooruddin-dev/Mizuka-Institute-dashboard-PERN.git)
Install Dependencies

Bash
# Install for Backend
npm install
# Install for Frontend
cd client && npm install
Environment Variables Create a .env file in the root directory:

Code snippet
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=mizuka_db
PORT=3000
Run the Project

Bash
# Run Backend
npm start
# Run Frontend (in separate terminal)
cd client && npm start
📈 Future Roadmap
[ ] Text-to-SQL AI Integration: Natural language query bar to fetch data.

[ ] Attendance Tracking: Daily logs for each class.

[ ] Role-Based Access: Admin and Teacher login tiers.
```
