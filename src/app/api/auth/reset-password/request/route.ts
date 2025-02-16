import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendPasswordResetEmail } from '@/lib/email'

// In a real app, these would be stored in a database
const resetTokens = new Map<string, { email: string; expires: Date }>()

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Generate a secure random token
    const token = crypto.randomBytes(32).toString('hex')
    
    // Store the token with expiration (24 hours)
    const expires = new Date()
    expires.setHours(expires.getHours() + 24)
    resetTokens.set(token, { email, expires })

    // Generate reset link
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${token}`
    
    // Send password reset email
    const { success, error } = await sendPasswordResetEmail(email, resetLink)
    
    if (!success) {
      console.error('Failed to send password reset email:', error)
      return NextResponse.json(
        { error: 'Failed to send password reset email' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Password reset instructions sent'
    })
  } catch (error) {
    console.error('Password reset request error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

// Helper function to validate tokens (used by the confirmation endpoint)
export function validateResetToken(token: string) {
  const resetData = resetTokens.get(token)
  
  if (!resetData) {
    return null
  }

  if (new Date() > resetData.expires) {
    resetTokens.delete(token)
    return null
  }

  return resetData.email
} 