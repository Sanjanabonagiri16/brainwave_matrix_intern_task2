# Blogging Platform

A modern, feature-rich blogging platform built with Next.js, TypeScript, and Prisma.

## Features

- 🔐 User Authentication
- 📝 Rich Text Editor
- 💬 Real-time Comments
- 👍 Like System
- 🔔 Notifications
- 📊 Analytics
- 🌓 Dark Mode
- 📱 Responsive Design
- 🔍 Search & Filtering
- 🏷️ Tags & Categories

## Tech Stack

- **Frontend:**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - Framer Motion

- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - NextAuth.js

- **Features:**
  - Real-time updates with SSE
  - Email notifications
  - Image uploads
  - Markdown support
  - SEO optimization

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Sanjanabonagiri16/brainwave_matrix_intern_task2.git
   cd brainwave_matrix_intern_task2
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables with your values

4. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env` file with the following variables:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blogapp?schema=public"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (SMTP)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
SMTP_FROM="BlogApp <noreply@blogapp.com>"
```

## Project Structure

```
├── src/
│   ├── app/             # Next.js app router
│   ├── components/      # React components
│   ├── contexts/        # React contexts
│   ├── lib/            # Utility functions
│   ├── services/       # API services
│   └── types/          # TypeScript types
├── prisma/
│   └── schema.prisma   # Database schema
└── public/             # Static files
```

## API Routes

- `/api/auth/*` - Authentication endpoints
- `/api/posts/*` - Blog post management
- `/api/comments/*` - Comment system
- `/api/users/*` - User management
- `/api/notifications/*` - Notification system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 