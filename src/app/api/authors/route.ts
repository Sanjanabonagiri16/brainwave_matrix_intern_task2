import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // In a real app, this would query the database
    // For now, we'll return mock data
    const authors = [
      'John Doe',
      'Jane Smith',
      'Alex Johnson',
      'Maria Garcia',
      'David Chen',
      'Sarah Wilson',
      'Michael Brown',
      'Emma Davis',
    ]

    return NextResponse.json(authors)
  } catch (error) {
    console.error('Failed to fetch authors:', error)
    return NextResponse.json(
      { error: 'Failed to fetch authors' },
      { status: 500 }
    )
  }
} 