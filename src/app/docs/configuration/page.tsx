'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const configSections = [
  {
    title: 'Environment Variables',
    description: 'Essential environment variables for configuring your application.',
    code: `# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database
DATABASE_URL="file:./dev.db"

# Authentication
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRES_IN=7d

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=your-email@gmail.com
SMTP_SECURE=false

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Feature Flags
ENABLE_AI_RECOMMENDATIONS=true
ENABLE_EMAIL_NOTIFICATIONS=true
ENABLE_SUBSCRIPTIONS=true`,
    subsections: [
      {
        title: 'App Configuration',
        content: 'Set your application URL and other basic settings.',
      },
      {
        title: 'Database Configuration',
        content: 'Configure your database connection string.',
      },
      {
        title: 'Authentication Settings',
        content: 'Set up JWT secrets and expiration times.',
      },
      {
        title: 'Email Configuration',
        content: 'Configure SMTP settings for email notifications.',
      },
      {
        title: 'API Keys',
        content: 'Add third-party API keys for various integrations.',
      },
      {
        title: 'Feature Flags',
        content: 'Enable or disable specific platform features.',
      },
    ],
  },
  {
    title: 'Database Setup',
    description: 'Configure and initialize your database.',
    code: `// Initialize database with Prisma
npx prisma generate
npx prisma db push

// Seed database with initial data
npx prisma db seed`,
    subsections: [
      {
        title: 'Database Migration',
        content: 'Learn how to create and run database migrations.',
      },
      {
        title: 'Data Seeding',
        content: 'Populate your database with initial data.',
      },
      {
        title: 'Backup & Restore',
        content: 'Set up database backup and restore procedures.',
      },
    ],
  },
  {
    title: 'Email Templates',
    description: 'Customize email templates for various notifications.',
    code: `// Example email template configuration
export const emailTemplates = {
  welcomeEmail: (username: string) => ({
    subject: 'Welcome to Our Platform!',
    html: \`
      <h1>Welcome, \${username}!</h1>
      <p>Thanks for joining our community.</p>
    \`,
  }),
  passwordReset: (resetToken: string) => ({
    subject: 'Password Reset Request',
    html: \`
      <h2>Reset Your Password</h2>
      <p>Click the link below:</p>
      <a href="/reset-password?token=\${resetToken}">
        Reset Password
      </a>
    \`,
  }),
}`,
    subsections: [
      {
        title: 'Template Customization',
        content: 'Modify email templates to match your brand.',
      },
      {
        title: 'Notification Settings',
        content: 'Configure which events trigger email notifications.',
      },
      {
        title: 'Testing Emails',
        content: 'Test email delivery in development environment.',
      },
    ],
  },
  {
    title: 'Theme Configuration',
    description: 'Customize the appearance of your platform.',
    code: `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF3B30',
          // ... color variants
        },
        secondary: {
          DEFAULT: '#FF9500',
          // ... color variants
        },
      },
      // ... other theme settings
    },
  },
}`,
    subsections: [
      {
        title: 'Color Scheme',
        content: 'Customize your platform\'s color palette.',
      },
      {
        title: 'Typography',
        content: 'Configure fonts and text styles.',
      },
      {
        title: 'Dark Mode',
        content: 'Customize dark mode appearance.',
      },
    ],
  },
]

const CodeBlock = ({ code }: { code: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative mt-4 mb-6">
      <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-gray-300 text-sm font-mono">{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        aria-label="Copy code"
      >
        {isCopied ? (
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
          </svg>
        )}
      </button>
    </div>
  )
}

export default function ConfigurationPage() {
  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-gray-400 mb-6"
          >
            <Link href="/docs" className="hover:text-white transition-colors">
              Documentation
            </Link>
            <span>/</span>
            <span>Configuration</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            Configuration Guide
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Learn how to configure and customize your blogging platform
          </motion.p>
        </div>

        {/* Configuration Sections */}
        <div className="space-y-12">
          {configSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
              <p className="text-gray-400 mb-4">{section.description}</p>
              
              <CodeBlock code={section.code} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {section.subsections.map((subsection) => (
                  <div
                    key={subsection.title}
                    className="bg-gray-700 rounded-lg p-4"
                  >
                    <h3 className="font-bold mb-2">{subsection.title}</h3>
                    <p className="text-gray-400 text-sm">{subsection.content}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-gray-400 mb-6">
            Check out our troubleshooting guide or reach out to our support team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/troubleshooting"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Troubleshooting Guide
            </Link>
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 