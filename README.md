# ✨ JobGlow

> Light up your career.

JobGlow is a job portal that connects job seekers, recruiters, and admins.
This repository contains the frontend web application, built with the Next.js
App Router and a separate Express/MongoDB API.

🔗 **Live Demo:** [jobglow-career-hub.vercel.app](https://jobglow-career-hub.vercel.app/)

## 🚀 Features

### Platform

- 📱 **Responsive navbar** with a drawer menu on mobile
- 👤 **Profile menu drawer** with user avatar, tooltip, and a loading skeleton
  while the session is pending
- 🔐 **Authentication** with email/password and Google sign-in
- 👥 **Role selection at sign-up:** Seeker, Recruiter, or Admin
- 🌗 **Light and dark themes** powered by `next-themes`
- 🧭 **Role-based dashboard sidebar** with links for each account type

### Browse jobs

- 🔎 **Keyword search** across title, company, responsibilities, and
  qualifications (handled by the jobs API)
- 🎛️ **Filter sidebar** built from the job schema:
  - **Job Type** and **Category** — single-select
  - **Work Mode** — multi-select
  - Live option counts calculated from the full catalogue
- 🔗 **URL-driven state** — initial search, filters, sort, and page are read
  from the query string so links are shareable
- ↕️ **Sort control** and **pagination** (6 jobs per page)
- 🃏 **Job cards** with salary, job type, work mode, company, location, and a
  closed-listing badge
- 📄 **Job detail page** with:
  - company logo placeholder, role title, and hiring status
  - salary, location, job type, and deadline cards
  - description, responsibilities, requirements, and highlights
  - company overview sidebar with a link to that company's jobs

### Recruiter tools

- 💼 **Create job posts** with title, company, category, type, work mode,
  location, salary range/frequency, deadline, responsibilities, and
  qualifications
- 📋 **Manage job posts** with salary, status, applicant count, and quick
  actions
- 🗑️ **Delete job posts** behind a confirmation dialog with toast feedback

> **Current status:** search is wired to the API. Filter, sort, and pagination
> controls render from the URL but do not write back to it yet, and the
> **Apply Now** / **Save** actions are placeholders.

> **Note:** For now, anyone can choose any role. Verification for the Recruiter
> and Admin roles is planned.

### Planned

- **Job Seekers:** apply to jobs, save listings, and track applications
- **Recruiters:** edit/duplicate jobs, review applicants, and manage hiring
- **Admins:** approve companies and jobs, and manage users
- **Role verification** for Recruiters and Admins
- Server-side sorting and pagination

## 🛠️ Tech Stack

- [Next.js 16](https://nextjs.org/) — App Router and Server Components
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) on [Base UI](https://base-ui.com/)
- [Better Auth](https://www.better-auth.com/) with the MongoDB adapter
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Lucide](https://lucide.dev/) icons and [Sonner](https://sonner.emilkowal.ski/)
  toasts
- ESLint and Prettier (`prettier-plugin-tailwindcss`)

## 📦 Getting Started

### Prerequisites

- Node.js 20+
- A running JobGlow API (Express + MongoDB)
- A MongoDB connection string for Better Auth

### 1. Clone and install

```bash
git clone https://github.com/rezasdsju/jobglow-client.git
cd jobglow-client
npm install
```

### 2. Configure environment variables

Create a `.env.local` file (`.env*` files are git-ignored):

```bash
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/jobglow
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_BASE_API_URL=http://localhost:5000
```

| Variable                   | Purpose                          |
| -------------------------- | -------------------------------- |
| `BETTER_AUTH_URL`          | Base URL used by Better Auth     |
| `MONGODB_URI`              | MongoDB connection for auth data |
| `GOOGLE_CLIENT_ID`         | Google OAuth client id           |
| `GOOGLE_CLIENT_SECRET`     | Google OAuth client secret       |
| `NEXT_PUBLIC_BASE_API_URL` | Base URL of the JobGlow jobs API |

### 3. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Script              | Description                           |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Start the development server          |
| `npm run build`     | Create a production build             |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | Run ESLint                            |
| `npm run format`    | Format `ts`/`tsx` files with Prettier |
| `npm run typecheck` | Run `tsc --noEmit`                    |

## 🔌 Backend API

The client expects a separate jobs API (Express + MongoDB) at
`NEXT_PUBLIC_BASE_API_URL`. Endpoints used by the app:

| Method   | Endpoint    | Purpose                                                                          |
| -------- | ----------- | -------------------------------------------------------------------------------- |
| `GET`    | `/jobs`     | List jobs. Supports `jobType`, `category`, `isRemote`, and `search` query params |
| `POST`   | `/jobs`     | Create a job post                                                                |
| `DELETE` | `/jobs/:id` | Delete a job post                                                                |

## 📁 Project Structure

```
jobglow-client/
├── app/
│   ├── (auth)/              # Sign-in and sign-up routes
│   ├── api/auth/[...all]/   # Better Auth route handler
│   ├── browse-jobs/         # Job listing and [id] detail pages
│   ├── dashboard/           # Seeker, recruiter, and admin dashboards
│   └── components/          # Page-level feature components
├── components/
│   ├── homepage/            # Homepage sections
│   ├── shared/              # Navbar, auth, and theme components
│   └── ui/                  # shadcn/Base UI primitives
├── lib/
│   ├── actions/             # Job create/delete actions
│   ├── api/                 # Jobs API client
│   ├── jobs/                # Filters, options, formatting, query helpers
│   ├── auth.ts              # Better Auth server config
│   └── auth-client.ts       # Better Auth client
└── types/                   # Shared TypeScript types
```

### Routes

| Route                           | Description                    |
| ------------------------------- | ------------------------------ |
| `/`                             | Homepage                       |
| `/browse-jobs`                  | Search and filter job listings |
| `/browse-jobs/[id]`             | Job detail page                |
| `/sign-in`, `/sign-up`          | Authentication                 |
| `/dashboard/seeker`             | Seeker dashboard               |
| `/dashboard/recruiter`          | Recruiter dashboard            |
| `/dashboard/recruiter/jobs`     | Manage job posts               |
| `/dashboard/recruiter/jobs/new` | Create a job post              |
| `/dashboard/admin`              | Admin dashboard                |

## 📸 Screenshots

_Coming soon._

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🤝 Contributing

Feel free to clone, fork, and contribute!
