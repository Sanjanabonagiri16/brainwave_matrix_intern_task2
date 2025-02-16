'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const requirements = {
  node: '>=18.0.0',
  npm: '>=8.0.0',
  storage: '500MB',
  memory: '1GB RAM'
}

const installSteps = [
  {
    title: 'Clone the Repository',
    description: 'Clone the project repository from GitHub.',
    code: `git clone https://github.com/yourusername/blogging-platform.git
cd blogging-platform`,
    note: 'Make sure you have Git installed on your system.'
  },
  {
    title: 'Install Dependencies',
    description: 'Install all required dependencies using npm.',
    code: `npm install`,
    note: 'This may take a few minutes depending on your internet connection.'
  },
  {
    title: 'Configure Environment Variables',
    description: 'Create a .env file in the root directory with your configuration.',
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
    note: 'Replace placeholder values with your actual configuration.'
  },
  {
    title: 'Initialize Database',
    description: 'Set up the database with initial schema and data.',
    code: `npx prisma generate
npx prisma db push
npx prisma db seed`,
    note: 'This will create the database tables and seed initial data.'
  },
  {
    title: 'Build and Start',
    description: 'Build the project and start the development server.',
    code: `# Development
npm run dev

# Production
npm run build
npm start`,
    note: 'The development server will run on http://localhost:3000'
  }
]

const troubleshooting = [
  {
    problem: 'Database Connection Error',
    solution: 'Check if your DATABASE_URL is correct and the database server is running.'
  },
  {
    problem: 'Missing Dependencies',
    solution: 'Run npm install again or clear your node_modules folder and reinstall.'
  },
  {
    problem: 'Environment Variables Not Loading',
    solution: 'Ensure your .env file is in the root directory and contains all required variables.'
  },
  {
    problem: 'Build Errors',
    solution: 'Check for TypeScript errors and ensure all dependencies are compatible.'
  }
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
        <code className="text-gray-300 text-sm font-mono whitespace-pre">{code}</code>
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

export default function InstallationPage() {
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
            <span>Installation</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            Installation Guide
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Complete guide to installing and configuring the blogging platform
          </motion.p>
        </div>

        {/* System Requirements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12 bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">System Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(requirements).map(([key, value]) => (
              <div key={key} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <span className="text-gray-400 capitalize">{key}:</span>
                  <span className="ml-2 text-white">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Installation Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Installation Steps</h2>
          <div className="space-y-8">
            {installSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 mb-4">{step.description}</p>
                <CodeBlock code={step.code} />
                {step.note && (
                  <div className="flex items-start gap-2 text-yellow-500 text-sm">
                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{step.note}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Troubleshooting */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12 bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Troubleshooting</h2>
          <div className="space-y-4">
            {troubleshooting.map((item) => (
              <div key={item.problem} className="border-b border-gray-700 last:border-0 pb-4 last:pb-0">
                <h3 className="text-lg font-semibold mb-2 text-red-400">{item.problem}</h3>
                <p className="text-gray-400">{item.solution}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-gray-400 mb-6">
            Now that you have the platform installed, check out our quick start guide to begin building your blog.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/quick-start"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Quick Start Guide
            </Link>
            <Link
              href="/docs/configuration"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Configuration Guide
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 