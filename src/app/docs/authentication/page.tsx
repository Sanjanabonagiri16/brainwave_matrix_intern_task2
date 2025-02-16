'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const authFlows = [
  {
    title: 'User Registration',
    description: 'Create a new user account with email and password.',
    endpoint: '/api/auth/register',
    method: 'POST',
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
    title: 'User Login',
    description: 'Authenticate an existing user with email and password.',
    endpoint: '/api/auth/login',
    method: 'POST',
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
  },
  {
    title: 'Password Reset',
    description: 'Request a password reset link for a user.',
    endpoint: '/api/auth/reset-password',
    method: 'POST',
    request: `{
  "email": "user@example.com"
}`,
    response: `{
  "message": "Password reset link sent to email"
}`
  }
]

const implementationExamples = [
  {
    title: 'Client-Side Authentication',
    description: 'Example of implementing authentication in your React components.',
    code: `import { useAuth } from '@/contexts/AuthContext'

export default function ProtectedComponent() {
  const { user, login, logout } = useAuth()

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password)
      // Redirect or update UI
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  return (
    <div>
      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => handleLogin('user@example.com', 'password')}>
          Login
        </button>
      )}
    </div>
  )
}`
  },
  {
    title: 'Protected API Routes',
    description: 'Example of protecting API routes with authentication middleware.',
    code: `import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  // Get token from Authorization header
  const token = request.headers.get('Authorization')?.split(' ')[1]
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    // Verify JWT token
    const decoded = await verifyToken(token)
    
    // Add user to request
    request.user = decoded
    
    return NextResponse.next()
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    )
  }
}`
  },
  {
    title: 'Protected Pages',
    description: 'Example of protecting pages with authentication.',
    code: `'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ProtectedPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return <div>Protected Content</div>
}`
  }
]

const securityBestPractices = [
  {
    title: 'Password Security',
    practices: [
      'Use bcrypt for password hashing',
      'Enforce strong password requirements',
      'Implement rate limiting for login attempts',
      'Never store plain-text passwords'
    ]
  },
  {
    title: 'JWT Security',
    practices: [
      'Use short-lived tokens',
      'Implement token refresh mechanism',
      'Store tokens securely (httpOnly cookies)',
      'Include token expiration and user data validation'
    ]
  },
  {
    title: 'General Security',
    practices: [
      'Use HTTPS for all requests',
      'Implement CSRF protection',
      'Sanitize user inputs',
      'Regular security audits'
    ]
  }
]

const CodeBlock = ({ code, endpoint, method }: { code: string, endpoint?: string, method?: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="relative mt-4 mb-6">
      {endpoint && (
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2 py-1 rounded text-xs font-mono
            ${method === 'POST' ? 'bg-green-500/10 text-green-500' :
              method === 'GET' ? 'bg-blue-500/10 text-blue-500' :
              'bg-gray-500/10 text-gray-500'}`}
          >
            {method}
          </span>
          <span className="text-gray-400 font-mono text-sm">{endpoint}</span>
        </div>
      )}
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

export default function AuthenticationPage() {
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
            <span>Authentication</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-4"
          >
            Authentication
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Learn how to implement authentication in your blogging platform
          </motion.p>
        </div>

        {/* Authentication Flows */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Authentication Flows</h2>
          <div className="space-y-8">
            {authFlows.map((flow, index) => (
              <motion.div
                key={flow.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-3">{flow.title}</h3>
                <p className="text-gray-400 mb-4">{flow.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Request</h4>
                    <CodeBlock 
                      code={flow.request} 
                      endpoint={flow.endpoint}
                      method={flow.method}
                    />
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Response</h4>
                    <CodeBlock code={flow.response} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Implementation Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Implementation Examples</h2>
          <div className="space-y-8">
            {implementationExamples.map((example, index) => (
              <motion.div
                key={example.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-gray-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold mb-3">{example.title}</h3>
                <p className="text-gray-400 mb-4">{example.description}</p>
                <CodeBlock code={example.code} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Security Best Practices */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-12 bg-gray-800 rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Security Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {securityBestPractices.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">{section.title}</h3>
                <ul className="space-y-2">
                  {section.practices.map((practice) => (
                    <li key={practice} className="flex items-start gap-2 text-gray-400">
                      <svg className="w-5 h-5 mt-1 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          className="bg-gray-800 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Ready to Implement?</h2>
          <p className="text-gray-400 mb-6">
            Check out our API reference for detailed endpoint documentation and more examples.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/docs/api-reference"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              API Reference
            </Link>
            <Link
              href="/docs/security"
              className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Security Guide
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  )
} 