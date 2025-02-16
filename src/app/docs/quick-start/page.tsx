'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const steps = [
  {
    title: '1. Create an Account',
    description: 'Sign up for a new account to get started.',
    code: null,
    action: {
      text: 'Create Account',
      link: '/signup'
    }
  },
  {
    title: '2. Set Up Your Profile',
    description: 'Customize your profile with a bio, avatar, and social links.',
    code: null,
    action: {
      text: 'Edit Profile',
      link: '/dashboard/profile'
    }
  },
  {
    title: '3. Create Your First Post',
    description: 'Write and publish your first blog post using our rich text editor.',
    code: `// Example API call to create a new post
const createPost = async (post) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
  return response.json();
};

// Example post data
const post = {
  title: 'My First Blog Post',
  content: '# Hello World\\n\\nThis is my first post!',
  category: 'Technology',
  tags: ['beginner', 'introduction'],
};`,
    action: {
      text: 'Start Writing',
      link: '/write'
    }
  },
  {
    title: '4. Customize Settings',
    description: 'Configure your blog settings, including themes and notifications.',
    code: null,
    action: {
      text: 'Open Settings',
      link: '/dashboard/settings'
    }
  },
  {
    title: '5. Engage with the Community',
    description: 'Follow other writers, leave comments, and build your network.',
    code: null,
    action: {
      text: 'Explore Community',
      link: '/explore'
    }
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

export default function QuickStartPage() {
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
            <span>Quick Start</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            Quick Start Guide
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Get up and running with our platform in just a few minutes
          </motion.p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
              <p className="text-gray-400 mb-4">{step.description}</p>
              
              {step.code && <CodeBlock code={step.code} />}
              
              <Link
                href={step.action.link}
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {step.action.text}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
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
          <h2 className="text-2xl font-bold mb-4">Ready to Learn More?</h2>
          <p className="text-gray-400 mb-6">
            Explore our detailed documentation for advanced features and best practices.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Browse Documentation
            </Link>
            <Link
              href="/help"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Help
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 