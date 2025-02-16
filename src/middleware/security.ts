import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import rateLimit from 'express-rate-limit'
import { getToken } from 'next-auth/jwt'

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})

// CSRF Token validation
const validateCSRFToken = async (request: NextRequest) => {
  const csrfToken = request.headers.get('X-CSRF-Token')
  const session = await getToken({ req: request as any })

  if (!session) return true // Skip CSRF check if not authenticated
  if (!csrfToken) return false

  // In a real app, validate the token against the session
  // For now, we'll just check if it exists
  return true
}

// Security headers
const securityHeaders = {
  'Content-Security-Policy': 
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: blob: https:; " +
    "font-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "block-all-mixed-content; " +
    "upgrade-insecure-requests;",
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
}

export async function securityMiddleware(
  request: NextRequest,
  response: NextResponse
) {
  // Apply rate limiting
  try {
    await new Promise((resolve, reject) => {
      limiter(request as any, response as any, (error: any) => {
        if (error) reject(error)
        resolve(true)
      })
    })
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Too many requests' }),
      { status: 429 }
    )
  }

  // Validate CSRF token for mutations
  if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
    const isValidCSRF = await validateCSRFToken(request)
    if (!isValidCSRF) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid CSRF token' }),
        { status: 403 }
      )
    }
  }

  // Add security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

// Generate CSRF token
export function generateCSRFToken() {
  return crypto.randomUUID()
}

// Validate password strength
export function validatePassword(password: string): boolean {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  )
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove < and >
    .trim() // Remove whitespace
    .slice(0, 1000) // Limit length
}

// Generate secure random token
export function generateSecureToken(length: number = 32): string {
  const buffer = new Uint8Array(length)
  crypto.getRandomValues(buffer)
  return Array.from(buffer)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('')
} 