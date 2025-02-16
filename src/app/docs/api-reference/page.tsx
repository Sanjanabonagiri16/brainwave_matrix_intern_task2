'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const apiReference = [
  {
    title: 'User Management',
    endpoints: [
      {
        name: 'User Object',
        description: 'The user object contains all the information about a user.',
        schema: `{
  "id": "string",          // Unique identifier for the user
  "email": "string",       // User's email address
  "name": "string",        // User's full name
  "role": "string",        // User's role (admin, user)
  "avatar": "string?",     // URL to user's avatar image
  "bio": "string?",        // User's biography
  "createdAt": "string",   // ISO timestamp
  "updatedAt": "string"    // ISO timestamp
}`,
        example: `{
  "id": "user_123",
  "email": "john@example.com",
  "name": "John Doe",
  "role": "user",
  "avatar": "https://api.example.com/avatars/user_123.jpg",
  "bio": "Software developer and blogger",
  "createdAt": "2024-03-15T10:00:00Z",
  "updatedAt": "2024-03-15T10:00:00Z"
}`
      }
    ]
  },
  {
    title: 'Post Management',
    endpoints: [
      {
        name: 'Post Object',
        description: 'The post object represents a blog post with its content and metadata.',
        schema: `{
  "id": "string",          // Unique identifier for the post
  "title": "string",       // Post title
  "content": "string",     // Post content in Markdown
  "excerpt": "string",     // Short preview of the content
  "author": "User",        // Reference to User object
  "category": "string",    // Post category
  "tags": "string[]",      // Array of tag strings
  "status": "string",      // Post status (draft, published)
  "views": "number",       // View count
  "likes": "number",       // Like count
  "createdAt": "string",   // ISO timestamp
  "updatedAt": "string",   // ISO timestamp
  "publishedAt": "string?" // ISO timestamp
}`,
        example: `{
  "id": "post_123",
  "title": "Getting Started with Next.js",
  "content": "# Introduction\\n\\nNext.js is a React framework...",
  "excerpt": "Learn how to build applications with Next.js",
  "author": {
    "id": "user_123",
    "name": "John Doe",
    "avatar": "https://api.example.com/avatars/user_123.jpg"
  },
  "category": "Technology",
  "tags": ["nextjs", "react", "webdev"],
  "status": "published",
  "views": 1250,
  "likes": 48,
  "createdAt": "2024-03-15T10:00:00Z",
  "updatedAt": "2024-03-15T10:00:00Z",
  "publishedAt": "2024-03-15T10:00:00Z"
}`
      }
    ]
  },
  {
    title: 'Comment Management',
    endpoints: [
      {
        name: 'Comment Object',
        description: 'The comment object represents a user comment on a blog post.',
        schema: `{
  "id": "string",          // Unique identifier for the comment
  "content": "string",     // Comment content
  "author": "User",        // Reference to User object
  "post": "Post",          // Reference to Post object
  "likes": "number",       // Like count
  "parentId": "string?",   // ID of parent comment for replies
  "createdAt": "string",   // ISO timestamp
  "updatedAt": "string"    // ISO timestamp
}`,
        example: `{
  "id": "comment_123",
  "content": "Great article! Very helpful explanation.",
  "author": {
    "id": "user_123",
    "name": "John Doe",
    "avatar": "https://api.example.com/avatars/user_123.jpg"
  },
  "post": {
    "id": "post_123",
    "title": "Getting Started with Next.js"
  },
  "likes": 5,
  "parentId": null,
  "createdAt": "2024-03-15T10:00:00Z",
  "updatedAt": "2024-03-15T10:00:00Z"
}`
      }
    ]
  },
  {
    title: 'Analytics',
    endpoints: [
      {
        name: 'Analytics Object',
        description: 'The analytics object provides statistics and metrics for posts and user engagement.',
        schema: `{
  "id": "string",          // Unique identifier for the analytics record
  "postId": "string",      // Reference to Post ID
  "views": "number",       // Total view count
  "uniqueViews": "number", // Unique visitor count
  "likes": "number",       // Total like count
  "comments": "number",    // Total comment count
  "shares": "number",      // Total share count
  "avgReadTime": "number", // Average read time in seconds
  "bounceRate": "number",  // Bounce rate percentage
  "period": "string",      // Time period (daily, weekly, monthly)
  "date": "string"         // ISO timestamp
}`,
        example: `{
  "id": "analytics_123",
  "postId": "post_123",
  "views": 1250,
  "uniqueViews": 980,
  "likes": 48,
  "comments": 15,
  "shares": 25,
  "avgReadTime": 180,
  "bounceRate": 35.5,
  "period": "daily",
  "date": "2024-03-15T00:00:00Z"
}`
      }
    ]
  }
]

const CodeBlock = ({ title, code }: { title?: string, code: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative mt-4 mb-6">
      {title && (
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-medium text-gray-400">{title}</span>
        </div>
      )}
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

export default function ApiReferencePage() {
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
            <span>API Reference</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            API Reference
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Detailed technical reference for the BlogApp API objects and schemas
          </motion.p>
        </div>

        {/* API Reference Sections */}
        <div className="space-y-12">
          {apiReference.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold mb-6">{section.title}</h2>
              
              <div className="space-y-8">
                {section.endpoints.map((endpoint) => (
                  <div key={endpoint.name} className="border-t border-gray-700 pt-6 first:border-0 first:pt-0">
                    <h3 className="text-xl font-bold mb-2">{endpoint.name}</h3>
                    <p className="text-gray-400 mb-6">{endpoint.description}</p>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-sm font-medium text-blue-400 mb-2">Schema</h4>
                        <CodeBlock code={endpoint.schema} />
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-green-400 mb-2">Example</h4>
                        <CodeBlock code={endpoint.example} />
                      </div>
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
            Check out our REST API documentation and security guidelines for more information.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/rest-api"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              REST API Guide
            </Link>
            <Link
              href="/docs/security"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Security Guidelines
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 