# 🎓 Mizuka Institute — EduPortal

A full-stack education portal built with the **PERN Stack** (PostgreSQL, Express, React, Node.js). Teachers can manage classes and post announcements. Students can enroll, view their schedule, and stay up to date with class announcements.

---

## ✨ Features

- **Role-Based Auth** — JWT authentication with Teacher and Student roles. Each role sees a different dashboard on login.
- **Class Management** — Teachers can create and delete classes. Students can browse and enroll from the class directory.
- **Announcements** — Teachers post announcements per class with optional expiry dates. Students see only announcements from their enrolled classes.
- **Enrollment System** — Students enroll and unenroll from classes. Duplicate enrollment is prevented.
- **Password Management** — Forgot password flow with 6-digit reset code. Change password from profile.
- **Profile** — Update username and profile picture. Delete account with credential confirmation.
- **Performance** — Pages stay mounted after first visit (no refetch on tab switch). Announcement panels cache per class.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, React Router, Axios, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL |
| **Auth** | JWT, bcrypt |
| **File Uploads** | Multer |

---

## 📂 Database Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'student',
    profile_pic TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL,
    time_in_pakistan INTEGER NOT NULL,
    teacher_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    class_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
    teacher_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE password_resets (
    email VARCHAR(100) PRIMARY KEY,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL
);
```

---

## 🚦 API Routes

### Auth — `/api/auth`
| Method | Route | Description |
|---|---|---|
| POST | `/login` | Login, returns JWT |
| POST | `/register` | Register new user |
| PUT | `/update-profile` | Update username / profile picture |
| PUT | `/change-password` | Change password (requires current password) |
| DELETE | `/delete` | Delete account |
| POST | `/request-reset` | Request password reset code |
| POST | `/reset-password` | Reset password with code |

### Classes — `/api/class`
| Method | Route | Description |
|---|---|---|
| GET | `/` | All classes |
| POST | `/` | Create class (teacher only) |
| GET | `/mine` | Teacher's own classes |
| GET | `/:id` | Single class |
| DELETE | `/:id` | Delete class + cascade (teacher only) |

### Enrollments — `/api/enroll`
| Method | Route | Description |
|---|---|---|
| POST | `/` | Enroll student |
| GET | `/class/:id` | Class roster |
| GET | `/student/:id` | Student's enrolled classes |
| DELETE | `/student/:studentId/class/:classId` | Unenroll |

### Announcements — `/api/class/:classId/announcements`
| Method | Route | Description |
|---|---|---|
| POST | `/` | Post announcement (teacher only) |
| GET | `/` | Get active announcements for class |
| DELETE | `/:announcementId` | Delete own announcement |

---

## 🔧 Setup

**1. Clone the repo**
```bash
git clone https://github.com/zahooruddin-dev/mizuka-institute.git
cd mizuka-institute
```

**2. Install dependencies**
```bash
# Backend
npm install

# Frontend
cd client && npm install
```

**3. Create `.env` in root**
```
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=mizuka_db
PORT=3000
JWT_SECRET=your_secret
```

**4. Run**
```bash
# Backend
npm start

# Frontend (separate terminal)
cd client && npm run dev
```

---

## 📬 Contact

**Zahooruddin** — [mzkhan886@gmail.com](mailto:mzkhan886@gmail.com) — [@zahooruddin-dev](https://github.com/zahooruddin-dev)