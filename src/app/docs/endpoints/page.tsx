'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const endpoints = [
  {
    category: 'Authentication',
    routes: [
      {
        method: 'POST',
        path: '/api/auth/register',
        description: 'Create a new user account',
        requestBody: `{
  "email": "string",     // User's email address
  "password": "string",  // User's password (min 8 chars)
  "name": "string"       // User's full name
}`,
        response: `{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "user",
    "createdAt": "string"
  },
  "token": "string"      // JWT access token
}`
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Authenticate user and get access token',
        requestBody: `{
  "email": "string",     // User's email address
  "password": "string"   // User's password
}`,
        response: `{
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string"
  },
  "token": "string"      // JWT access token
}`
      },
      {
        method: 'POST',
        path: '/api/auth/reset-password',
        description: 'Request password reset link',
        requestBody: `{
  "email": "string"      // User's email address
}`,
        response: `{
  "message": "Password reset email sent"
}`
      }
    ]
  },
  {
    category: 'Posts',
    routes: [
      {
        method: 'GET',
        path: '/api/posts',
        description: 'Get list of blog posts',
        queryParams: [
          { name: 'page', type: 'number', description: 'Page number for pagination' },
          { name: 'limit', type: 'number', description: 'Number of posts per page' },
          { name: 'category', type: 'string', description: 'Filter by category' },
          { name: 'tag', type: 'string', description: 'Filter by tag' },
          { name: 'author', type: 'string', description: 'Filter by author ID' }
        ],
        response: `{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "excerpt": "string",
      "author": {
        "id": "string",
        "name": "string"
      },
      "category": "string",
      "tags": ["string"],
      "createdAt": "string"
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalPosts": "number"
  }
}`
      },
      {
        method: 'POST',
        path: '/api/posts',
        description: 'Create a new blog post',
        auth: true,
        requestBody: `{
  "title": "string",     // Post title
  "content": "string",   // Post content in Markdown
  "category": "string",  // Post category
  "tags": ["string"],   // Array of tags
  "status": "draft"     // Post status (draft/published)
}`,
        response: `{
  "post": {
    "id": "string",
    "title": "string",
    "content": "string",
    "author": {
      "id": "string",
      "name": "string"
    },
    "category": "string",
    "tags": ["string"],
    "status": "string",
    "createdAt": "string"
  }
}`
      }
    ]
  },
  {
    category: 'Comments',
    routes: [
      {
        method: 'GET',
        path: '/api/posts/:postId/comments',
        description: 'Get comments for a specific post',
        queryParams: [
          { name: 'page', type: 'number', description: 'Page number for pagination' },
          { name: 'limit', type: 'number', description: 'Number of comments per page' }
        ],
        response: `{
  "comments": [
    {
      "id": "string",
      "content": "string",
      "author": {
        "id": "string",
        "name": "string"
      },
      "createdAt": "string"
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalComments": "number"
  }
}`
      },
      {
        method: 'POST',
        path: '/api/posts/:postId/comments',
        description: 'Add a comment to a post',
        auth: true,
        requestBody: `{
  "content": "string",   // Comment content
  "parentId": "string"   // Optional parent comment ID for replies
}`,
        response: `{
  "comment": {
    "id": "string",
    "content": "string",
    "author": {
      "id": "string",
      "name": "string"
    },
    "parentId": "string",
    "createdAt": "string"
  }
}`
      }
    ]
  }
]

const methodColors = {
  GET: 'bg-green-500/10 text-green-500',
  POST: 'bg-blue-500/10 text-blue-500',
  PUT: 'bg-yellow-500/10 text-yellow-500',
  DELETE: 'bg-red-500/10 text-red-500'
}

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

export default function EndpointsPage() {
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
            <span>Endpoints</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            API Endpoints
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Complete list of all available API endpoints with request/response details
          </motion.p>
        </div>

        {/* Endpoints Sections */}
        <div className="space-y-12">
          {endpoints.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + categoryIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold mb-6">{category.category}</h2>
              
              <div className="space-y-8">
                {category.routes.map((route) => (
                  <div
                    key={route.path}
                    className="bg-gray-800 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded text-sm font-medium ${methodColors[route.method as keyof typeof methodColors]}`}>
                            {route.method}
                          </span>
                          <code className="text-gray-300">{route.path}</code>
                          {route.auth && (
                            <span className="px-2 py-1 bg-purple-500/10 text-purple-500 rounded text-sm">
                              Requires Auth
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400">{route.description}</p>
                      </div>
                    </div>

                    {route.queryParams && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-blue-400 mb-2">Query Parameters</h4>
                        <div className="bg-gray-900 rounded-lg p-4">
                          <table className="w-full">
                            <thead>
                              <tr className="text-left text-gray-400 text-sm">
                                <th className="pb-2">Parameter</th>
                                <th className="pb-2">Type</th>
                                <th className="pb-2">Description</th>
                              </tr>
                            </thead>
                            <tbody className="text-gray-300">
                              {route.queryParams.map((param) => (
                                <tr key={param.name}>
                                  <td className="py-2 pr-4 font-mono text-sm">{param.name}</td>
                                  <td className="py-2 pr-4 text-blue-400">{param.type}</td>
                                  <td className="py-2">{param.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {route.requestBody && (
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-blue-400 mb-2">Request Body</h4>
                        <CodeBlock code={route.requestBody} />
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-medium text-green-400 mb-2">Response</h4>
                      <CodeBlock code={route.response} />
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
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-gray-400 mb-6">
            Check out our guides and API reference for detailed information and examples.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/guides"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              View Guides
            </Link>
            <Link
              href="/docs/api-reference"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              API Reference
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 