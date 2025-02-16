'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const securityGuidelines = [
  {
    title: 'Authentication & Authorization',
    sections: [
      {
        title: 'JWT Security',
        description: 'Best practices for securing JSON Web Tokens (JWT) in your application.',
        guidelines: [
          'Store tokens securely using HttpOnly cookies',
          'Set appropriate token expiration times',
          'Implement token refresh mechanism',
          'Use strong secret keys for token signing',
          'Include only necessary claims in the payload'
        ],
        code: `// Example of secure JWT configuration
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
      algorithm: 'HS256'
    }
  );
};`
      },
      {
        title: 'Password Security',
        description: 'Guidelines for secure password handling and storage.',
        guidelines: [
          'Use strong password hashing (bcrypt/Argon2)',
          'Enforce minimum password requirements',
          'Implement rate limiting for login attempts',
          'Provide secure password reset flow',
          'Never store plain-text passwords'
        ],
        code: `// Example of secure password hashing
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

const verifyPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};`
      }
    ]
  },
  {
    title: 'Data Protection',
    sections: [
      {
        title: 'Input Validation',
        description: 'Protecting against injection attacks and malicious input.',
        guidelines: [
          'Validate and sanitize all user input',
          'Use parameterized queries for database operations',
          'Implement request size limits',
          'Validate file uploads (type, size, content)',
          'Escape special characters in output'
        ],
        code: `// Example of input validation
const validatePost = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    content: Joi.string().min(10).max(50000).required(),
    category: Joi.string().valid('Technology', 'Design', 'Business'),
    tags: Joi.array().items(Joi.string()).max(5)
  });
  
  return schema.validate(data);
};`
      },
      {
        title: 'XSS Prevention',
        description: 'Protecting against Cross-Site Scripting (XSS) attacks.',
        guidelines: [
          'Use Content Security Policy (CSP)',
          'Sanitize HTML content',
          'Encode user-generated content',
          'Use secure cookie attributes',
          'Implement XSS filters'
        ],
        code: `// Example of content sanitization
const sanitizeHtml = require('sanitize-html');

const sanitizeContent = (content) => {
  return sanitizeHtml(content, {
    allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
    allowedAttributes: {
      'a': [ 'href' ]
    }
  });
};`
      }
    ]
  },
  {
    title: 'API Security',
    sections: [
      {
        title: 'Rate Limiting',
        description: 'Protecting your API from abuse and DoS attacks.',
        guidelines: [
          'Implement rate limiting per IP/user',
          'Set appropriate rate limits per endpoint',
          'Use token bucket algorithm',
          'Provide rate limit headers',
          'Handle rate limit errors gracefully'
        ],
        code: `// Example of rate limiting configuration
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
  headers: true,
});

app.use('/api/', apiLimiter);`
      },
      {
        title: 'CORS Policy',
        description: 'Configuring Cross-Origin Resource Sharing (CORS) securely.',
        guidelines: [
          'Restrict allowed origins',
          'Specify allowed methods',
          'Configure allowed headers',
          'Set appropriate max age',
          'Handle preflight requests'
        ],
        code: `// Example of CORS configuration
const cors = require('cors');

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','),
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400, // 24 hours
  credentials: true,
};

app.use(cors(corsOptions));`
      }
    ]
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

export default function SecurityPage() {
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
            <span>Security</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            Security Guidelines
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Best practices and guidelines for securing your application
          </motion.p>
        </div>

        {/* Security Guidelines Sections */}
        <div className="space-y-12">
          {securityGuidelines.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
              
              <div className="space-y-8">
                {category.sections.map((section, sectionIndex) => (
                  <div
                    key={section.title}
                    className="bg-gray-800 rounded-xl p-6"
                  >
                    <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                    <p className="text-gray-400 mb-6">{section.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-blue-400 mb-3">Guidelines</h4>
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {section.guidelines.map((guideline) => (
                          <li key={guideline}>{guideline}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">Implementation Example</h4>
                      <CodeBlock code={section.code} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Additional Resources</h2>
          <p className="text-gray-400 mb-6">
            Learn more about API security and implementation details in our other documentation sections.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/api-reference"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              API Reference
            </Link>
            <Link
              href="/docs/rest-api"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              REST API Guide
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 