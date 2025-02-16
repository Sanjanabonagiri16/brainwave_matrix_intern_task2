'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const apiEndpoints = [
  {
    title: 'Authentication',
    description: 'Endpoints for user authentication and authorization.',
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/register',
        description: 'Register a new user account.',
        request: `{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}`,
        response: `{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2024-03-15T10:00:00Z"
  },
  "token": "jwt_token_here"
}`
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Authenticate user and get access token.',
        request: `{
  "email": "user@example.com",
  "password": "securepassword123"
}`,
        response: `{
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "jwt_token_here"
}`
      }
    ]
  },
  {
    title: 'Posts',
    description: 'Endpoints for managing blog posts.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/posts',
        description: 'Get a list of blog posts.',
        request: null,
        response: `{
  "posts": [
    {
      "id": "post_123",
      "title": "My First Post",
      "excerpt": "This is a preview...",
      "author": {
        "id": "user_123",
        "name": "John Doe"
      },
      "createdAt": "2024-03-15T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalPosts": 48
  }
}`
      },
      {
        method: 'POST',
        path: '/api/posts',
        description: 'Create a new blog post.',
        request: `{
  "title": "My New Post",
  "content": "# Hello World\\n\\nThis is my post content...",
  "category": "Technology",
  "tags": ["webdev", "tutorial"]
}`,
        response: `{
  "post": {
    "id": "post_123",
    "title": "My New Post",
    "content": "# Hello World\\n\\nThis is my post content...",
    "category": "Technology",
    "tags": ["webdev", "tutorial"],
    "author": {
      "id": "user_123",
      "name": "John Doe"
    },
    "createdAt": "2024-03-15T10:00:00Z"
  }
}`
      }
    ]
  },
  {
    title: 'Comments',
    description: 'Endpoints for managing post comments.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/posts/:postId/comments',
        description: 'Get comments for a specific post.',
        request: null,
        response: `{
  "comments": [
    {
      "id": "comment_123",
      "content": "Great post!",
      "author": {
        "id": "user_123",
        "name": "John Doe"
      },
      "createdAt": "2024-03-15T10:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalComments": 15
  }
}`
      },
      {
        method: 'POST',
        path: '/api/posts/:postId/comments',
        description: 'Add a new comment to a post.',
        request: `{
  "content": "This is my comment"
}`,
        response: `{
  "comment": {
    "id": "comment_123",
    "content": "This is my comment",
    "author": {
      "id": "user_123",
      "name": "John Doe"
    },
    "createdAt": "2024-03-15T10:00:00Z"
  }
}`
      }
    ]
  }
]

const errorResponses = [
  {
    code: 400,
    title: 'Bad Request',
    description: 'The request was malformed or contains invalid parameters.',
    example: `{
  "error": "Bad Request",
  "message": "Invalid email format",
  "code": "INVALID_INPUT"
}`
  },
  {
    code: 401,
    title: 'Unauthorized',
    description: 'Authentication is required or the provided credentials are invalid.',
    example: `{
  "error": "Unauthorized",
  "message": "Invalid authentication token",
  "code": "INVALID_TOKEN"
}`
  },
  {
    code: 403,
    title: 'Forbidden',
    description: 'The authenticated user does not have permission to perform the requested action.',
    example: `{
  "error": "Forbidden",
  "message": "Insufficient permissions",
  "code": "INSUFFICIENT_PERMISSIONS"
}`
  },
  {
    code: 404,
    title: 'Not Found',
    description: 'The requested resource was not found.',
    example: `{
  "error": "Not Found",
  "message": "Post not found",
  "code": "RESOURCE_NOT_FOUND"
}`
  },
  {
    code: 429,
    title: 'Too Many Requests',
    description: 'The user has sent too many requests in a given amount of time.',
    example: `{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded",
  "code": "RATE_LIMIT_EXCEEDED",
  "retryAfter": 60
}`
  }
]

const CodeBlock = ({ code, method, path }: { code: string | null, method?: string, path?: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative mt-4 mb-6">
      {(method || path) && (
        <div className="flex items-center gap-2 mb-2">
          {method && (
            <span className={`px-2 py-1 rounded text-xs font-mono
              ${method === 'GET' ? 'bg-green-500/20 text-green-400' :
                method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                method === 'DELETE' ? 'bg-red-500/20 text-red-400' :
                'bg-gray-500/20 text-gray-400'}`}
            >
              {method}
            </span>
          )}
          {path && (
            <span className="font-mono text-sm text-gray-300">{path}</span>
          )}
        </div>
      )}
      <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
        <code className="text-gray-300 text-sm font-mono">
          {code || 'No request body required'}
        </code>
      </pre>
      {code && (
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
      )}
    </div>
  )
}

export default function RestApiPage() {
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
            <span>REST API</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            REST API Reference
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Complete reference for the BlogApp REST API
          </motion.p>
        </div>

        {/* Authentication Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-12"
        >
          <h2 className="text-xl font-bold mb-2 text-blue-400">Authentication</h2>
          <p className="text-gray-300 mb-4">
            All API requests must include an authentication token in the Authorization header:
          </p>
          <CodeBlock 
            code="Authorization: Bearer your_jwt_token_here"
            method="AUTH"
            path="Header Required"
          />
        </motion.div>

        {/* API Endpoints */}
        <div className="space-y-12">
          {apiEndpoints.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-3">{section.title}</h2>
              <p className="text-gray-400 mb-6">{section.description}</p>
              
              <div className="space-y-8">
                {section.endpoints.map((endpoint) => (
                  <div key={endpoint.path} className="border-t border-gray-700 pt-6 first:border-0 first:pt-0">
                    <h3 className="font-bold mb-2">{endpoint.description}</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Request</h4>
                        <CodeBlock 
                          code={endpoint.request}
                          method={endpoint.method}
                          path={endpoint.path}
                        />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-400 mb-2">Response</h4>
                        <CodeBlock code={endpoint.response} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Error Responses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Error Responses</h2>
          
          <div className="grid gap-6">
            {errorResponses.map((error) => (
              <div key={error.code} className="border-t border-gray-700 pt-6 first:border-0 first:pt-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-red-500/10 text-red-400 rounded text-sm font-mono">
                    {error.code}
                  </span>
                  <h3 className="font-bold">{error.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{error.description}</p>
                <CodeBlock code={error.example} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Rate Limiting Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6"
        >
          <h2 className="text-xl font-bold mb-2 text-yellow-400">Rate Limiting</h2>
          <p className="text-gray-300">
            The API is rate limited to 100 requests per minute per IP address. When the rate limit is exceeded,
            requests will receive a 429 Too Many Requests response.
          </p>
        </motion.div>

        {/* Need Help */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
          <p className="text-gray-400 mb-6">
            Having trouble with the API? Check out our guides or reach out to our support team.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/guides"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              View Guides
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