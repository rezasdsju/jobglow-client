# ✨ JobGlow

> Light up your career.

JobGlow is a job portal that connects job seekers, recruiters, and admins.
This repository contains the frontend web application.

🔗 **Live Demo:** [jobglow-career-hub.vercel.app](https://jobglow-career-hub.vercel.app/)


## 🚀 Features

- 📱 **Responsive navbar** with a drawer menu on mobile
- 👤 **Profile menu drawer** with user avatar, tooltip, and a loading skeleton while the session is pending
- 🔐 **Authentication** with email sign-up and sign-in, plus Google sign-in
- 👥 **Role selection at sign-up:** Seeker, Recruiter, or Admin
- 🌗 **Light and dark themes** with a toggle button, powered by `next-themes`
- 💼 **Job creation for Recruiters** to post new job listings

> **Note:** For now, anyone can choose any role. Verification for the Recruiter and Admin roles is planned.

### Planned

- **Role verification** for Recruiters and Admins
- **Job Seekers:** Search and filter jobs, apply, and track applications
- **Recruiters:** Review applicants and manage hiring
- **Admins:** Approve companies and jobs, and manage users


## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Better Auth](https://www.better-auth.com/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/rezasdsju/jobglow-client.git
cd jobglow-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
jobglow-client/
├── app/          # Pages and routes
├── components/   # Reusable UI components
├── lib/          # Utilities and helpers
└── types/        # TypeScript types
```

## 📸 Screenshots

_Coming soon._

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

## 🤝 Contributing

Feel free to clone, fork, and contribute!