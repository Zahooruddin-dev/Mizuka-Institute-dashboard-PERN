# 🎓 Eduportal — PERN Stack Education Portal

A full-stack education portal built with the **PERN Stack** (PostgreSQL, Express, React, Node.js), developed as part of **Mizuka's enterprise solutions** for institute partners. Provides end-to-end class management, announcements, and student enrollment in a single platform.

🔗 **Live Demo:** [eduportal-pern.vercel.app](https://eduportal-pern.vercel.app)

---

## ✨ Features

### 🔐 Authentication & Roles
- JWT-based auth with **Teacher** and **Student** roles
- Each role gets a different dashboard on login
- Forgot password flow with a 6-digit email reset code (15 min expiry)
- Change password from profile with current password verification
- Delete account with full credential confirmation — cascades all data

### 🏫 Class Management
- Teachers create and delete classes with schedule info
- Students browse the full class directory and enroll/unenroll
- Duplicate enrollment prevented at both frontend and backend

### 📢 Announcements
- Teachers post announcements per class with optional expiry dates
- Expiry badges: active (teal), expiring soon within 3 days (amber), expired (red)
- Expired announcements automatically filtered out at the database level
- Students see only announcements from their enrolled classes

### 👤 Profile
- Update username with live preview
- Upload profile picture — stored on **Cloudinary**
- Responsive avatar with fallback to username initial

### ⚡ Performance
- Pages stay mounted after first visit — no refetch on tab switch
- Announcement panels cached per class — no repeat API calls on drawer reopen
- Auth context is reactive — token changes update the UI without page reload

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, React Router, Axios, Lucide React |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (hosted on Neon) |
| **Auth** | JSON Web Tokens, bcrypt |
| **File Storage** | Cloudinary + Multer |
| **Deployment** | Vercel (frontend) |

---

## 📂 Project Structure

```
Eduportal-PERN/
├── backend/
│   ├── controllers/       # authControl, announcementControl, etc.
│   ├── db/                # queryAuth, queryAnnouncements, queryEnrollment
│   ├── middleware/        # authMiddleware, uploadMiddleware (Cloudinary)
│   ├── routes/            # authRoutes, classRoutes, enrollRoutes, announcements
│   └── app.js
├── frontend/
│   ├── src/
│   │   ├── api/           # authApi, api (classes/enrollments/announcements)
│   │   ├── components/    # Layout, Sidebar, Profile, TeacherClasses, Enrolled, etc.
│   │   ├── css/           # Per-component stylesheets
│   │   └── utils/         # AuthContext, auth helpers
│   └── index.html
└── README.md
```

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

## 🚦 API Reference

### Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/login` | ❌ | Login, returns JWT |
| POST | `/register` | ❌ | Register new user |
| PUT | `/update-profile` | ✅ | Update username and/or profile picture |
| PUT | `/change-password` | ✅ | Change password (requires current password) |
| DELETE | `/delete` | ✅ | Delete account with credential verification |
| POST | `/request-reset` | ❌ | Request 6-digit password reset code |
| POST | `/reset-password` | ❌ | Reset password using code |

### Classes — `/api/class`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | ❌ | All classes |
| POST | `/` | ✅ Teacher | Create class |
| GET | `/mine` | ✅ Teacher | Teacher's own classes |
| GET | `/:id` | ❌ | Single class details |
| DELETE | `/:id` | ✅ Teacher | Delete class — cascades enrollments and announcements |

### Enrollments — `/api/enroll`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | ✅ | Enroll student in class |
| GET | `/class/:id` | ✅ | Get class roster |
| GET | `/student/:id` | ✅ | Get student's enrolled classes |
| DELETE | `/student/:studentId/class/:classId` | ✅ | Unenroll student |

### Announcements — `/api/class/:classId/announcements`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | ✅ Teacher | Post announcement with optional expiry |
| GET | `/` | ✅ | Get active (non-expired) announcements |
| DELETE | `/:announcementId` | ✅ Teacher | Delete own announcement |

---

## 🔧 Local Setup

**1. Clone the repo**
```bash
git clone https://github.com/Zahooruddin-dev/Eduportal-PERN.git
cd Eduportal-PERN
```

**2. Install dependencies**
```bash
# Backend (from root)
npm install

# Frontend
cd frontend && npm install
```

**3. Create `.env` in the root directory**
```env
DATABASE_URL=your_postgres_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

> ⚠️ Never commit your `.env` — it is already listed in `.gitignore`.

**4. Run**
```bash
# Backend
npm start

# Frontend (separate terminal)
cd frontend && npm run dev
```

Backend: `http://localhost:3000`  
Frontend: `http://localhost:5173`

---

## 🌐 Deployment Notes

- **Frontend** deployed on [Vercel](https://vercel.com) — set `VITE_API_URL` env var to your backend URL
- **Backend** can be deployed on Railway, Render, or any Node.js host
- **Database** hosted on [Neon](https://neon.tech) — serverless PostgreSQL, free tier works fine
- **Images** stored on [Cloudinary](https://cloudinary.com) — free tier sufficient for development

---

## 📬 Contact

**Zahooruddin** — [mzkhan886@gmail.com](mailto:mzkhan886@gmail.com) — [@Zahooruddin-dev](https://github.com/Zahooruddin-dev)