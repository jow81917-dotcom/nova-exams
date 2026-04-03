# Nova Exams

Nova Exams is a full‑stack exam preparation platform designed to provide students with structured study resources, mentorship opportunities, and an intuitive dashboard experience.  
The project combines a **React + Vite frontend** with a **Node.js/Express + PostgreSQL backend**, delivering a modern, scalable solution for exam readiness.

---

## 🎯 Project Idea

The motivation behind Nova Exams was to solve a common problem: students often struggle to find reliable study materials and personalized guidance in one place.  
Nova Exams brings together:

- 📚 **Downloadable Guides** — curated PDFs prepared by mentors.  
- 🎥 **Video Tutorials** — embedded YouTube and hosted videos for visual learning.  
- 🤝 **Mentorship Booking** — seamless scheduling via Calendly integration.  
- 💬 **Support Tools** — chatbot and WhatsApp button for instant help.  
- 🎨 **Polished UI** — responsive, animated, and consistent design across devices.  

The goal was to create a platform that feels professional, easy to use, and extensible for future features.

---

## 🛠 How I Built It

### Frontend
- **Framework:** React with Vite for fast development and builds.
- **Styling:** TailwindCSS for utility‑first styling and Framer Motion for smooth animations.
- **Icons:** Lucide React for consistent, professional icons.
- **Architecture:** Modular components (`Navbar`, `Footer`, `ChatBot`, `TelegramButton`, `Resources`).
- **Features Implemented:**
  - Dynamic resource rendering (guides/videos fetched from backend).
  - Responsive layouts with grid and flex utilities.
  - Booking flow integrated with Calendly in a native modal style.
  - Toast notifications for user feedback (e.g., “Message Sent!”).

### Backend
- **Framework:** Node.js with Express.
- **Database:** PostgreSQL for persistent storage of resources and user data.
- **ORM:** Prisma for schema management and queries.
- **API Design:**
  - REST endpoints for resources (`/resources`, `/resources/:id/download`).
  - Authentication and user management endpoints.
- **Scheduler:** Node‑cron jobs for background tasks (e.g., refreshing feeds, sending notifications).
- **Error Handling:** Centralized middleware for clean API responses.

### Deployment
- **Platform:** Render
  - Web Service for backend (`npm install`, `npm start`).
  - Static Site for frontend (`npm run build`, `npm run preview`).
  - Managed PostgreSQL instance for database.
- **Environment Variables:** Configured securely (`DATABASE_URL`, `PORT`, etc.).
- **CI/CD:** Automatic deploys on push to `main` branch.

---

## 📸 Screenshots

Here are some previews of Nova Exams:

### Home Page
![Home Page](./screenshots/screenshot1.png)

### Resources Section
![Resources](./screenshots/screenshot2.png)

### Mentorship Booking
![Booking](./screenshots/screenshot3.png)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 18.x recommended)
- PostgreSQL database

### Installation

Clone the repository:
```bash
git clone https://github.com/Israel-199/nova-exams.git
cd nova-exams
