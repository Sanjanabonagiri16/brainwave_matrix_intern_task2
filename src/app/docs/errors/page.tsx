'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const errorCategories = [
  {
    title: 'Authentication Errors',
    errors: [
      {
        code: 401,
        name: 'Unauthorized',
        message: 'Invalid or missing authentication token',
        example: {
          error: 'Unauthorized',
          message: 'Invalid authentication token provided',
          details: 'The provided token has expired or is invalid'
        }
      },
      {
        code: 403,
        name: 'Forbidden',
        message: 'Insufficient permissions to access resource',
        example: {
          error: 'Forbidden',
          message: 'You do not have permission to access this resource',
          details: 'Required role: admin'
        }
      }
    ]
  },
  {
    title: 'Request Errors',
    errors: [
      {
        code: 400,
        name: 'Bad Request',
        message: 'Invalid request parameters or body',
        example: {
          error: 'Bad Request',
          message: 'Invalid request parameters',
          details: {
            title: 'Title is required',
            content: 'Content must be at least 100 characters'
          }
        }
      },
      {
        code: 404,
        name: 'Not Found',
        message: 'Requested resource does not exist',
        example: {
          error: 'Not Found',
          message: 'Post not found',
          details: 'The requested post ID does not exist'
        }
      },
      {
        code: 409,
        name: 'Conflict',
        message: 'Resource conflict or already exists',
        example: {
          error: 'Conflict',
          message: 'Username already exists',
          details: 'Please choose a different username'
        }
      }
    ]
  },
  {
    title: 'Server Errors',
    errors: [
      {
        code: 500,
        name: 'Internal Server Error',
        message: 'Unexpected server error',
        example: {
          error: 'Internal Server Error',
          message: 'An unexpected error occurred',
          requestId: 'req_123abc'
        }
      },
      {
        code: 503,
        name: 'Service Unavailable',
        message: 'Service temporarily unavailable',
        example: {
          error: 'Service Unavailable',
          message: 'Service is undergoing maintenance',
          estimatedResolution: '2024-03-15T10:00:00Z'
        }
      }
    ]
  }
]

const errorHandlingExample = `try {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`
    },
    body: JSON.stringify(postData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  const data = await response.json();
  return data;
} catch (error) {
  // Handle specific error types
  if (error.status === 401) {
    // Handle authentication error
    refreshToken();
  } else if (error.status === 429) {
    // Handle rate limit error
    await delay(error.retryAfter);
    return retryRequest();
  }
  
  // Log error for debugging
  console.error('API Error:', error);
  throw error;
}`

const CodeBlock = ({ code }: { code: string }) => {
  return (
    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
      <code className="text-gray-300 text-sm font-mono">{code}</code>
    </pre>
  )
}

export default function ErrorsPage() {
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
            <span>Errors</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            Error Handling
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Understanding API errors and how to handle them
          </motion.p>
        </div>

        {/* Overview */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-gray-400 mb-4">
              Our API uses conventional HTTP response codes to indicate the success or failure of requests.
              Codes in the 2xx range indicate success, codes in the 4xx range indicate client errors,
              and codes in the 5xx range indicate server errors.
            </p>
            <div className="bg-blue-500/10 text-blue-500 p-4 rounded-lg">
              <strong className="block mb-2">Note:</strong>
              All error responses include a consistent JSON structure with error details to help you
              handle errors appropriately in your applications.
            </div>
          </div>
        </motion.section>

        {/* Error Categories */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Common Errors</h2>
          
          <div className="space-y-8">
            {errorCategories.map((category) => (
              <div key={category.title} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">{category.title}</h3>
                <div className="space-y-6">
                  {category.errors.map((error) => (
                    <div key={error.code} className="border-t border-gray-700 pt-6 first:border-0 first:pt-0">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold flex items-center gap-3">
                            <span className="text-red-500">{error.code}</span>
                            <span>{error.name}</span>
                          </h4>
                          <p className="text-gray-400 mt-1">{error.message}</p>
                        </div>
                      </div>
                      <CodeBlock code={JSON.stringify(error.example, null, 2)} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Error Handling Example */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Error Handling Example</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-6">
              Here's an example of how to properly handle API errors in your application:
            </p>
            <CodeBlock code={errorHandlingExample} />
          </div>
        </motion.section>

        {/* Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Always check the response status code before processing the response body</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Implement proper error handling for different error types (auth, validation, etc.)</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Log errors with sufficient context for debugging</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Display user-friendly error messages in your application UI</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
          <p className="text-gray-400 mb-6">
            Check out our implementation guides and rate limiting documentation.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/guides"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Implementation Guides
            </Link>
            <Link
              href="/docs/rate-limits"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Rate Limits
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 