import { NextResponse } from 'next/server'
import { validateResetToken } from '../request/route'

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json()

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      )
    }

    const email = validateResetToken(token)
    
    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      )
    }

    // In a real app, this would update the user's password in the database
    console.log(`Updating password for user: ${email}`)

    return NextResponse.json({
      message: 'Password successfully reset'
    })
  } catch (error) {
    console.error('Password reset confirmation error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}