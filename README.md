# 📋 Task Team Manager

A full-stack collaborative task and team management application built with **Next.js**, **Express**, **Prisma**, and **PostgreSQL**. Manage workspaces, teams, projects, and tasks — all in one place.

🔗 **Live Demo:** [pure-determination-production-0657.up.railway.app](https://pure-determination-production-0657.up.railway.app)

---

## ✨ Features

- 🔐 **Authentication** — Secure JWT-based sign up / sign in
- 🏢 **Workspaces** — Organize work into isolated workspaces with role-based access (Admin / Member)
- 👥 **Teams** — Create and manage teams within a workspace
- 📁 **Projects** — Create projects tied to teams with member management
- ✅ **Tasks** — Full task lifecycle: `TODO → IN_PROGRESS → IN_REVIEW → DONE`
- 🎯 **Priority Levels** — `LOW`, `MEDIUM`, `HIGH`, `URGENT`
- 📊 **Member Performance** — Track and update member performance scores
- 🌗 **Dark / Light Mode** — Theme toggle with `next-themes`
- 📱 **Responsive UI** — Works across desktop and mobile
- 🔄 **Drag & Drop** — Kanban-style task management with `@dnd-kit`
- 📈 **Analytics** — Charts and overviews powered by `recharts`

---

## 🛠️ Tech Stack

### Frontend (`/client`)
| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling |
| [shadcn/ui](https://ui.shadcn.com/) + Radix UI | Component library |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [TanStack Query](https://tanstack.com/query) | Server state management |
| [Zustand](https://zustand-demo.pmnd.rs/) | Client state management |
| [React Hook Form](https://react-hook-form.com/) + Zod | Form validation |
| [Axios](https://axios-http.com/) | HTTP client |
| [@dnd-kit](https://dndkit.com/) | Drag and drop |
| [Recharts](https://recharts.org/) | Data visualisation |
| [Sonner](https://sonner.emilkowal.ski/) | Toast notifications |

### Backend (`/server`)
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/) | REST API server |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Prisma 7](https://www.prisma.io/) | ORM + migrations |
| [PostgreSQL](https://www.postgresql.org/) | Relational database |
| [JWT](https://jwt.io/) + bcryptjs | Authentication & password hashing |
| [Zod](https://zod.dev/) | Request validation |
| [Helmet](https://helmetjs.github.io/) | Security headers |
| [CORS](https://www.npmjs.com/package/cors) | Cross-origin resource sharing |
| [Morgan](https://www.npmjs.com/package/morgan) | HTTP request logging |

### Deployment
| Service | Purpose |
|---|---|
| [Railway](https://railway.app/) | Backend + Frontend hosting |
| [Railway PostgreSQL](https://railway.app/) | Managed database |

---

## 📁 Project Structure

```
task_team_manager/
├── client/                  # Next.js frontend
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── (auth)/      # Login & signup pages
│   │   │   └── (dashboard)/ # Protected dashboard pages
│   │   ├── components/      # Reusable UI components
│   │   │   ├── auth/        # Auth forms
│   │   │   ├── dashboard/   # Dashboard widgets
│   │   │   ├── projects/    # Project components
│   │   │   ├── tasks/       # Task components
│   │   │   ├── teams/       # Team components
│   │   │   └── ui/          # Base UI primitives
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/
│   │   │   ├── api/         # Axios client & API calls
│   │   │   └── constants/   # App-wide constants
│   │   ├── stores/          # Zustand state stores
│   │   └── types/           # TypeScript type definitions
│   ├── .env.local           # Local environment variables
│   └── next.config.mjs
│
└── server/                  # Express backend
    ├── src/
    │   ├── modules/         # Feature modules
    │   │   ├── auth/        # Auth routes & logic
    │   │   ├── project/     # Project CRUD
    │   │   ├── task/        # Task CRUD
    │   │   ├── team/        # Team CRUD
    │   │   └── workspace/   # Workspace management
    │   ├── config/          # Env validation & constants
    │   ├── middleware/       # Error handler, auth guard
    │   ├── prisma/          # Prisma client singleton
    │   ├── services/        # Business logic layer
    │   └── validators/      # Zod request schemas
    ├── prisma/
    │   └── schema.prisma    # Database schema
    └── railway.json         # Railway deployment config
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- PostgreSQL database
- npm

### 1. Clone the repository

```bash
git clone https://github.com/divya-agg-ethara/task_team_manager.git
cd task_team_manager
```

### 2. Set up the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/task_team_manager
JWT_SECRET=your-super-secret-key-at-least-32-characters
JWT_EXPIRES_IN=7d
PORT=4000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

Run database migrations and start the server:

```bash
npx prisma migrate dev
npm run dev
```

The API will be available at `http://localhost:4000/api/v1`.

### 3. Set up the Frontend

```bash
cd ../client
npm install
```

Create a `.env.local` file in the `client/` directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 🗄️ Database Schema

```
User ──< TeamMember >── Team ──< Project >── Task
 │                               │
 └── MemberPerformance           └── ProjectMember
```

| Model | Description |
|---|---|
| `User` | Registered users with workspace role (Admin/Member) |
| `Team` | Groups of users within a workspace |
| `TeamMember` | Join table: User ↔ Team with role |
| `Project` | Work containers linked to a team |
| `ProjectMember` | Join table: User ↔ Project with role |
| `Task` | Individual work items with status, priority, assignee |
| `MemberPerformance` | Performance score tracked per member |

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/signup` | Register a new user |
| `POST` | `/api/v1/auth/login` | Login and receive JWT |
| `GET` | `/api/v1/workspace` | Get workspace details |
| `GET` | `/api/v1/teams` | List all teams |
| `POST` | `/api/v1/teams` | Create a new team |
| `GET` | `/api/v1/projects` | List all projects |
| `POST` | `/api/v1/projects` | Create a new project |
| `GET` | `/api/v1/projects/:id/tasks` | List tasks in a project |
| `POST` | `/api/v1/projects/:id/tasks` | Create a task |
| `PATCH` | `/api/v1/projects/:id/tasks/:taskId` | Update a task |
| `GET` | `/api/v1/health` | Health check |

---

## ☁️ Deployment (Railway)

Both services are deployed on [Railway](https://railway.app/).

### Backend environment variables (Railway)

```env
DATABASE_URL=<railway-postgres-url>
JWT_SECRET=<strong-secret-min-32-chars>
NODE_ENV=production
CLIENT_URL=<your-frontend-railway-url>
PORT=<set-by-railway-automatically>
```

### Frontend environment variables (Railway)

```env
NEXT_PUBLIC_API_URL=https://<your-backend-railway-url>/api/v1
```

> **Note:** `NEXT_PUBLIC_*` variables are baked in at **build time** in Next.js. Always set them in Railway **before** deploying, and redeploy after any changes.

---

## 📜 Available Scripts

### Client
| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Lint the codebase |
| `npm run clean` | Clean `.next` build cache |

### Server
| Command | Description |
|---|---|
| `npm run dev` | Start with hot reload (nodemon + tsx) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Start compiled production server |
| `npm run prisma:migrate` | Run dev migrations |
| `npm run prisma:studio` | Open Prisma Studio |

---

## 📄 License

This project is for educational and personal use.
