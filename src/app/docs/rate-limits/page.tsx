'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

const rateLimits = [
  {
    endpoint: 'Authentication',
    limits: [
      {
        route: '/api/auth/login',
        limit: '5 requests per minute',
        reason: 'Prevent brute force attacks'
      },
      {
        route: '/api/auth/register',
        limit: '3 requests per minute',
        reason: 'Prevent spam account creation'
      },
      {
        route: '/api/auth/reset-password',
        limit: '3 requests per 15 minutes',
        reason: 'Prevent password reset abuse'
      }
    ]
  },
  {
    endpoint: 'Posts',
    limits: [
      {
        route: '/api/posts',
        limit: '30 requests per minute',
        reason: 'General rate limiting for post listing'
      },
      {
        route: '/api/posts/create',
        limit: '10 posts per hour',
        reason: 'Prevent content spam'
      },
      {
        route: '/api/posts/:id/update',
        limit: '30 requests per hour',
        reason: 'Prevent excessive post updates'
      }
    ]
  },
  {
    endpoint: 'Comments',
    limits: [
      {
        route: '/api/comments',
        limit: '60 requests per hour',
        reason: 'General rate limiting for comments'
      },
      {
        route: '/api/comments/create',
        limit: '20 comments per hour',
        reason: 'Prevent comment spam'
      }
    ]
  },
  {
    endpoint: 'Media',
    limits: [
      {
        route: '/api/media/upload',
        limit: '50 MB per file, 500 MB per day',
        reason: 'Storage and bandwidth limits'
      }
    ]
  }
]

const headers = [
  {
    name: 'X-RateLimit-Limit',
    description: 'The maximum number of requests allowed in the current time window'
  },
  {
    name: 'X-RateLimit-Remaining',
    description: 'The number of requests remaining in the current time window'
  },
  {
    name: 'X-RateLimit-Reset',
    description: 'The time when the current rate limit window resets in UTC epoch seconds'
  },
  {
    name: 'Retry-After',
    description: 'The number of seconds to wait before retrying (only sent when rate limit is exceeded)'
  }
]

const rateLimitResponse = `{
  "error": "Too Many Requests",
  "message": "Rate limit exceeded. Please try again later.",
  "retryAfter": 120
}`

export default function RateLimitsPage() {
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
            <span>Rate Limits</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            API Rate Limits
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Understanding rate limits and quotas for API endpoints
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
              To ensure fair usage and maintain service stability, our API implements rate limiting on all endpoints.
              Rate limits are applied on a per-user basis, identified by the API key or authentication token.
            </p>
            <div className="bg-yellow-500/10 text-yellow-500 p-4 rounded-lg">
              <strong className="block mb-2">Note:</strong>
              Exceeding rate limits will result in HTTP 429 (Too Many Requests) responses.
              Please implement appropriate retry mechanisms with exponential backoff in your applications.
            </div>
          </div>
        </motion.section>

        {/* Rate Limits by Endpoint */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Rate Limits by Endpoint</h2>
          
          <div className="space-y-6">
            {rateLimits.map((category) => (
              <div key={category.endpoint} className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">{category.endpoint}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-400 border-b border-gray-700">
                        <th className="pb-2">Endpoint</th>
                        <th className="pb-2">Limit</th>
                        <th className="pb-2">Reason</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      {category.limits.map((limit) => (
                        <tr key={limit.route} className="border-b border-gray-700/50">
                          <td className="py-3 pr-4">
                            <code className="text-blue-400">{limit.route}</code>
                          </td>
                          <td className="py-3 pr-4">{limit.limit}</td>
                          <td className="py-3 text-gray-400">{limit.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Response Headers */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Rate Limit Headers</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-6">
              Rate limit information is included in the response headers of all API requests:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-700">
                    <th className="pb-2">Header</th>
                    <th className="pb-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  {headers.map((header) => (
                    <tr key={header.name} className="border-b border-gray-700/50">
                      <td className="py-3 pr-4">
                        <code className="text-blue-400">{header.name}</code>
                      </td>
                      <td className="py-3 text-gray-400">{header.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Rate Limit Response */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Rate Limit Response</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <p className="text-gray-400 mb-4">
              When a rate limit is exceeded, the API will respond with a 429 status code and the following JSON response:
            </p>
            <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-gray-300 text-sm font-mono">{rateLimitResponse}</code>
            </pre>
          </div>
        </motion.section>

        {/* Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
          
          <div className="bg-gray-800 rounded-xl p-6">
            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Implement exponential backoff when retrying rate-limited requests</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Cache responses when possible to reduce API calls</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Monitor rate limit headers to stay within limits</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span>Batch requests when possible to optimize usage</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
          <p className="text-gray-400 mb-6">
            Check out our error handling documentation and implementation guides.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/errors"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Error Handling
            </Link>
            <Link
              href="/docs/guides"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Implementation Guides
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 